const model = {};

const db = require('./../../../database/models');

model.getUserId = async (id) => {
  let data_account = await db.auth_account.findOne({
    where : {
        id
    },
    include : [
      db.user,
      {
        model : db.auth_user_role,
        include : [
          {
            model : db.auth_group,
            include : [
              db.auth_role
            ]
          }
        ]
      }
    ]
  });
  let account = new (require('./Account'))(data_account);
  account.user = data_account.user;
  account.auth_user_roles = data_account.auth_user_roles;
  for (let i = 0; i < account.auth_user_roles.length; i++) {
    let auth_user_role = data_account.auth_user_roles.find(x => x.id == account.auth_user_roles[i].id);
    if (auth_user_role) {
      account.auth_user_roles[i].auth_group = auth_user_role.auth_group;
      account.auth_user_roles[i].auth_group.auth_roles = auth_user_role.auth_group.auth_roles;
      for (let j = 0; j < account.auth_user_roles[i].auth_group.auth_roles.length; j++) {
        let auth_role = auth_user_role.auth_group.auth_roles.find(x => x.id == account.auth_user_roles[i].auth_group.auth_roles[j].id);
        if (auth_role) {
          let permission = await db.auth_permission.findByPk(auth_role.permission, {
            include : [
              db.auth_application,
              db.auth_modul
            ]
          });
          if (permission) {
            account.auth_user_roles[i].auth_group.auth_roles[j].permission = permission;
            account.auth_user_roles[i].auth_group.auth_roles[j].permission.application = permission.auth_application;
            account.auth_user_roles[i].auth_group.auth_roles[j].permission.modul = permission.auth_modul;
          }
        }
      }
    }
  }
  return account;
}
module.exports = model;