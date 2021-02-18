const helper = {};

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
    return {
        id: user_roles.id,
        is_default: user_roles.is_default,
        auth_group: {
            id : user_roles.auth_group.id,
            name : user_roles.auth_group.name,
            description : user_roles.auth_group.description,
            auth_role : role
            // auth_role : {
            //     id: role.id,
            //     is_default: role.is_default,
            //     permission: {
            //         id: role.permission.id,
            //         metode: role.permission.metode,
            //         application: {
            //             id: role.permission.application.id,
            //             name: role.permission.application.name,
            //             prefix: role.permission.application.prefix,
            //             description: role.permission.application.description,
            //         },
            //         modul: {
            //             id: role.permission.modul.id,
            //             name: role.permission.modul.name,
            //             prefix: role.permission.modul.prefix,
            //             description: role.permission.modul.description,
            //             sub_modul: role.permission.modul.sub_modul
            //         },
            //         menu: role.permission.menu
            //     }
            // }
        }
    }
}

function chekBaseUrl(req, res, next) {
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
                    return next();
                }
            }
        }
    }
    if (role_index) {
        req.user.active_role = setActiveRole(role_index);
        return next();
    }
    return res.redirect('/unauthorized.htm');
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

helper.checkAuth = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            return chekBaseUrl(req, res, next);
        }
        return res.redirect('/auth/login');
    } catch (err) {
        console.log(err);
        return res.status(500).send(err.message);
    }
};

module.exports = helper;