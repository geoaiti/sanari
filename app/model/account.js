const model = {};

const db = require('./../../database/models');

model.getById = async (id) => {
    let account = await db.auth_account.findOne({
        attributes : [
            'id',
            'username'
        ],
        where : {
            id
        },
        include : [
            {
                model : db.user,
                attributes : ['id', 'name', 'tanggal_lahir', 'gender', 'image']
            },
            {
                model : db.auth_user_role,
                attributes : ['id', 'is_default'],
                include : [
                    {
                        model : db.auth_group,
                        attributes : ['id', 'name', 'description'],
                        include : [
                            {
                                model : db.auth_role,
                                attributes : ['id', 'is_default', 'permission']
                            }
                        ]
                    }
                ]
            }
        ]
    });

    return (await set(account));
};

model.getAll = async (options) => {
    return (await db.auth_account.findAll(options));
};

async function set(account) {
    let data = {
        id : account.id,
        username : account.username,
        user : account.user,
        auth_user_roles : [],
    };

    let permissions = await db.auth_permission.findAll({
        attributes : ['id', 'metode', 'application', 'modul']
    });

    let applications = await db.auth_application.findAll({
        attributes : ['id', 'name', 'prefix', 'description']
    });

    let moduls = await db.auth_modul.findAll({
        attributes : ['id', 'name', 'prefix', 'description', 'parent_id']
    });
    
    for (let i = 0; i < account.auth_user_roles.length; i++) {
        data.auth_user_roles[i] = {
            id : account.auth_user_roles[i].id,
            is_default : account.auth_user_roles[i].is_default,
            auth_group : {
                id : account.auth_user_roles[i].auth_group.id,
                name : account.auth_user_roles[i].auth_group.name,
                description : account.auth_user_roles[i].auth_group.description,
                auth_roles : []
            },
        };
        for (let j = 0; j < account.auth_user_roles[i].auth_group.auth_roles.length; j++) {
            
            let id_permission = account.auth_user_roles[i].auth_group.auth_roles[j].permission;
            let permission = permissions.find(a => a.id == id_permission);
            let application = applications.find(a => a.id == permission.application);
            let modul = moduls.find(a => a.id == permission.modul);
            
            data.auth_user_roles[i].auth_group.auth_roles[j] = {
                id : account.auth_user_roles[i].auth_group.auth_roles[j].id,
                is_default : account.auth_user_roles[i].auth_group.auth_roles[j].is_default,
                permission : {
                    id : permission.id,
                    metode : permission.metode,
                    application,
                    modul : {
                        id : modul.id,
                        name : modul.name,
                        prefix : modul.prefix,
                        description : modul.description,
                        sub_modul : []
                    },
                    menu : []
                }
            };

            data.auth_user_roles[i].auth_group.auth_roles.push(data.auth_user_roles[i].auth_group.auth_roles[j]);    
        }
        data.auth_user_roles.push(data.auth_user_roles[i]);
    }
    return data;
}

module.exports = model;