const helper = {};

const db = require('./../database/models');

const sha = require('sha1');

helper.sha = (value) => {
    const key = 'very-safe';
    return sha(sha(key) + '' + value);
};

helper.compare = (password, user) => {
    let secret = helper.sha(user.id + '-' + password);
    return (secret === user.password);
};

helper.goTo = (req, res) => {
    let user_role = req.user.auth_user_roles.find(a => a.is_default == 1);
    if (!user_role) {
        req.logOut();
        return res.redirect('/auth/login');
    }
    let role = user_role.auth_group.auth_roles.find(a => a.is_default == 1);
    if (!role) {
        req.logOut();
        return res.redirect('/auth/login');
    }
    return res.redirect(`/${role.permission.application.prefix}`);
}

function setActiveRole(user_roles, modul_name = "Index") {
    let role = user_roles.auth_group.auth_roles.find(a => a.permission.modul.name == modul_name);

    let classUser_roles = new (require('./../app/model/user/User_role'))(user_roles);
    classUser_roles.auth_group = user_roles.auth_group;
    classUser_roles.auth_group.auth_role = role;
    classUser_roles.auth_group.auth_role.permission = role.permission;
    classUser_roles.auth_group.auth_role.permission.application = role.permission.application;
    classUser_roles.auth_group.auth_role.permission.modul = role.permission.modul;
    
    // return classUser_roles;
    return {
        id: user_roles.id,
        is_default: user_roles.is_default,
        auth_group: {
            id : user_roles.auth_group.id,
            name : user_roles.auth_group.name,
            description : user_roles.auth_group.description,
            auth_role : role,
            auth_role : {
                id: role.id,
                is_default: role.is_default,
                permission: {
                    id: role.permission.id,
                    metode: role.permission.metode,
                    application: {
                        id: role.permission.application.id,
                        name: role.permission.application.name,
                        prefix: role.permission.application.prefix,
                        description: role.permission.application.description,
                    },
                    modul: {
                        id: role.permission.modul.id,
                        name: role.permission.modul.name,
                        prefix: role.permission.modul.prefix,
                        description: role.permission.modul.description,
                        sub_modul: role.permission.modul.sub_modul
                    },
                    menu: role.permission.menu
                }
            }
        }
    }
}

async function getMenu(menus) {
    let menu = [];
    for (let i = 0; i < menus.length; i++) {
        menu.push(menus[i]);
        let next = await db.auth_menu.findAll({
            where : {
                id : menus[i].parent_id
            }
        });
        if (next) {
            Array.prototype.push.apply(menu, await getMenu(next));
        }
    }
    return menu;
}

async function chekBaseUrl(req, res, next) {
    
    let user_roles = req.user.auth_user_roles;
    let role_index = null;

    for (let i = 0; i < user_roles.length; i++) {

        let role = user_roles[i].auth_group.auth_roles.find(a => 
            `/${a.permission.application.prefix}` == req.baseUrl && 
            req.path.includes(`/${a.permission.modul.prefix}`) &&
            req.method == a.permission.metode
        );
        if(role){
            if (role.permission.modul.name == "Index") {
                role_index = user_roles[i];
                role = user_roles[i].auth_group.auth_roles.find(a => 
                    `/${a.permission.application.prefix}` == req.baseUrl && 
                    a.permission.modul.name != "Index" ? req.path.includes(`/${a.permission.modul.prefix}`) : false && 
                    req.method == a.permission.metode
                );
                if (role) {
                    req.user.active_role = setActiveRole(user_roles[i], role.permission.modul.name);
                    await setMenus(req, user_roles);
                    return next();
                }
            }
        }
    }
    if (role_index) {
        req.user.active_role = setActiveRole(role_index);
        await setMenus(req, user_roles);
        return next();
    }
    return res.redirect('/unauthorized.htm');
}

async function setMenus(req, user_roles) {
    
    let id_permission = [];
    let menu = [];

    let user_role = user_roles.find(x => x.id == req.user.active_role.id);
    if (user_role) {
        for (let i = 0; i < user_role.auth_group.auth_roles.length; i++) {
            id_permission.push(user_role.auth_group.auth_roles[i].permission.id);
        }
    }
    
    let menus = await db.auth_menu.findAll({
        where : {
            permission : id_permission
        },
        include : [
            {
                model : db.auth_permission,
                include : [
                    db.auth_application,
                    db.auth_modul,
                ]
            }
        ]
    });

    Array.prototype.push.apply(menu, await getMenu(menus));
    console.log(menu);
    menu.sort((a, b) => a.sorter - b.sorter);
    console.log(menu);
    let tempMenu = [];
    for (let i = 0; i < menu.length; i++) {
        if (!tempMenu.find(x => x.id == menu[i].id)) {
            tempMenu.push(menu[i]);
        }
    }
    menu = tempMenu;
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].permission) {
            menu[i].is_active = false;
            if (menu[i].permission == req.user.active_role.auth_group.auth_role.permission.id) {
                menu[i].is_active = true;
            }
        }
    }
    await req.user.setMenu(menu);
}

helper.checkNotAuth = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            return helper.goTo(req, res);
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
};

helper.checkAuth = async (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            let split_url = req.originalUrl.split('/');
            if (split_url[split_url.length - 1] == '' || split_url[split_url.length - 1].split('')[0] == '?') {
                if (split_url[split_url.length - 1].split('')[0] == '?') {
                    let query = split_url[split_url.length - 1];
                    split_url.pop();
                    return res.redirect(`${split_url.join('/')}${query}`);
                }
                split_url.pop();
                return res.redirect(split_url.join('/'));
            }
            return await chekBaseUrl(req, res, next);
        }
        return res.redirect('/auth/login');
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
};

module.exports = helper;