const model = {};

const db = require('./../../../database/models');

model.getUserId = async (req, id) => {
  let account = await get_account(req, id);
  account.active_role = await get_active_role(req, account);
  account.menus = await get_menu(req, account);
  return account;
}

async function get_account(req, id) {
  let data_account = req.session.model.data_account;
  if (!data_account || (data_account ? data_account.id != id : true)) {
    data_account = await db.auth_account.findOne({
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
    req.session.model.data_account = data_account;
  }
  
  let permission_actions = req.session.model.permission_actions;
  if (!permission_actions) {
    permission_actions = await db.auth_permission_action.findAll({
      include : [
        {
          model : db.auth_permission,
          include : [
            db.auth_application,
            db.auth_modul,
          ],
        },
        db.auth_action
      ]
    });
    req.session.model.permission_actions = permission_actions;
  }

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
          let permission_action = permission_actions.find(x => x.id == auth_role.permission);
          if (permission_action) {
            account.auth_user_roles[i].auth_group.auth_roles[j].permission_action = permission_action;
            account.auth_user_roles[i].auth_group.auth_roles[j].permission_action.permission = permission_action.auth_permission;
            account.auth_user_roles[i].auth_group.auth_roles[j].permission_action.action = permission_action.auth_action;
            account.auth_user_roles[i].auth_group.auth_roles[j].permission_action.permission.application = permission_action.auth_permission.auth_application;
            account.auth_user_roles[i].auth_group.auth_roles[j].permission_action.permission.modul = permission_action.auth_permission.auth_modul;
          }
        }
      }
    }
  }
  return account;
}

async function get_active_role(req, account) {
  
  let group_application = req.session.model.auth_group_applications;
  if (!group_application) {
    let auth_group_applications_temp = await db.auth_group.findAll({
      include : [
        {
          model : db.auth_role,
          include : [
            {
              model : db.auth_permission_action,
              include : [
                db.auth_action
              ]
            }
          ]
        }
      ]
    });
    let permissions = await db.auth_permission.findAll({
      include : [
        db.auth_application,
        db.auth_modul
      ]
    });
    req.session.model.auth_group_applications = {
      ori : auth_group_applications_temp,
      permissions
    };
    group_application = req.session.model.auth_group_applications;
  }

  let moduls = req.session.model.moduls;
  if (!req.session.model.moduls) {
    moduls = await db.auth_modul.findAll();
    req.session.model.moduls = moduls;
  }

  let application_prefix = [];
  for (let i = 0; i < group_application.ori.length; i++) {
    for (let j = 0; j < group_application.ori[i].auth_roles.length; j++) {
          let permission = group_application.permissions.find(x => x.id == group_application.ori[i].auth_roles[j].auth_permission_action.permission);
          if (!application_prefix.find(x => x == permission.auth_application.prefix)) {
            application_prefix.push(permission.auth_application.prefix);
          }
    }
  }
  
  let url_pattern = req.originalUrl.split('?')[0];
  if (url_pattern.split('/')[url_pattern.split('/').length - 1] == '') {
    let url_pattern_split = url_pattern.split('/');
    url_pattern_split.pop();
    url_pattern = url_pattern_split.join('/');
  }
  
  let user_role_active = {};
  if (application_prefix.find(x => x == req.originalUrl.split('/')[1])) { 
    let user_roles = account.auth_user_roles;
    for (let i = 0; i < user_roles.length; i++) {
      for (let j = 0; j < user_roles[i].auth_group.auth_roles.length; j++) {
        let permission_action = user_roles[i].auth_group.auth_roles[j].permission_action;
        if (permission_action.url_pattern == url_pattern) {
          user_role_active = new (require('./User_role'))(user_roles[i]);
          user_role_active.auth_group = user_roles[i].auth_group;
          user_role_active.auth_group.auth_role = user_roles[i].auth_group.auth_roles[j];
          user_role_active.auth_group.auth_role.permission_action = user_roles[i].auth_group.auth_roles[j].permission_action;
          user_role_active.auth_group.auth_role.permission_action.permission = user_roles[i].auth_group.auth_roles[j].permission_action.permission;
          user_role_active.auth_group.auth_role.permission_action.permission.application = user_roles[i].auth_group.auth_roles[j].permission_action.permission.application;
          user_role_active.auth_group.auth_role.permission_action.permission.modul = user_roles[i].auth_group.auth_roles[j].permission_action.permission.modul;
        }
      }
    }
  }
  return user_role_active;
}

async function get_menu(req, account) {
  
  let menus = req.session.model.menu;
  if (!req.session.model.menu) {
    menus = await db.auth_menu.findAll({
      include : [
        {
          model : db.auth_permission_action,
          include : [
            {
              model : db.auth_permission,
              include : [
                db.auth_application,
                db.auth_modul,
              ],
            },
          db.auth_action
          ]
        }
      ]
    });
    req.session.model.menu = menus;
  }

  let id_permission = [];
  let menu = [];
  
  let user_role = account.auth_user_roles.find(x => x.id == account.active_role.id);
  if (user_role) {
    for (let i = 0; i < user_role.auth_group.auth_roles.length; i++) {
      id_permission.push(user_role.auth_group.auth_roles[i].permission_action.permission.id)
    }
  }
  let menu_role = []
  if (menus) {
    menu_role = menus.filter(
      function(e) {
        return this.indexOf(e.permission) >= 0;
      },
      id_permission
    );
  }

  Array.prototype.push.apply(menu, getMenu(menu_role, menus));
  menu.sort((a, b) => a.sorter - b.sorter);
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
          if (menu[i].permission == account.active_role.auth_group.auth_role.permission_action.id) {
              menu[i].is_active = true;
          }
      }
  }
  return menu;
}

function getMenu(menus, all_menu = []) {
  let menu = [];
  for (let i = 0; i < menus.length; i++) {
      menu.push(menus[i]);
      let next = all_menu.filter(x => x.id == menus[i].parent_id);
      if (next) {
          Array.prototype.push.apply(menu, getMenu(next, all_menu));
      }
  }
  return menu;
}

module.exports = model;