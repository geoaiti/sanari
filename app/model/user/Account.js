const db = require('./../../../database/models');

class Account {
    #account = null;

    #id = null;
    #username = null;
    #password = null;

    #user = {};
    #auth_user_roles = [];

    #active_role = {};
    #menus = [];

    constructor(value){
        this.#account = value;
        this.#id = value.id;
        this.#username = value.username;
        this.#password = value.password;
    }
    
    // getter
    get id() {
        return this.#id;
    }

    get username(){
        return this.#username;
    }

    get password(){
        return this.#password;
    }

    get user(){
        return this.#user;
    }

    get auth_user_roles(){
        return this.#auth_user_roles;
    }

    get active_role(){
        return this.#active_role;
    }

    get menus(){
        return this.#menus;
    }

    // setter
    set user(value){
        this.#user = new (require('./User'))(value);
    }

    set active_role(value){
        this.#active_role = value;
    }

    set auth_user_roles(values){
        for (let i = 0; i < values.length; i++) {
            let user_role = new (require('./User_role'))(values[i]);
            this.#auth_user_roles.push(user_role);
        }
    }

    set menus(value) {
        let menu = [];
        let root = value.filter(x => x.parent_id == 0);
        for (let i = 0; i < root.length; i++) {
            let m = new (require('./Menu'))(root[i]);
            if (root[i].auth_permission_action) {
                m.is_active = root[i].is_active;
                m.permission_action = root[i].auth_permission_action;
                m.permission_action.permission = root[i].auth_permission_action.auth_permission;
                m.permission_action.action = root[i].auth_permission_action.action;
                if (root[i].auth_permission_action.auth_permission.application) {
                    m.permission_action.permission.application = root[i].auth_permission_action.auth_permission.auth_application;
                }
                if (root[i].auth_permission_action.auth_permission.auth_modul) {
                    m.permission_action.permission.modul = root[i].auth_permission_action.auth_permission.auth_modul;
                }
            }
            let m_child = value.filter(x => x.parent_id == root[i].id);
            m.menus = this.getMenu(m_child, value);
            menu.push(m);
        }
        this.#menus = [];
        Array.prototype.push.apply(this.#menus, menu);
    }
    
    // function private
    getMenu(menus, all){
        let menu = [];
        for (let i = 0; i < menus.length; i++) {
            let m = new (require('./Menu'))(menus[i]);
            if (menus[i].auth_permission_action) {
                m.is_active = menus[i].is_active;
                m.permission_action = menus[i].auth_permission_action;
                m.permission_action.permission = menus[i].auth_permission_action.auth_permission;
                m.permission_action.action = menus[i].auth_permission_action.action;
                if (menus[i].auth_permission_action.auth_permission.application) {
                    m.permission_action.permission.application = menus[i].auth_permission_action.auth_permission.auth_application;
                }
                if (menus[i].auth_permission_action.auth_permission.auth_modul) {
                    m.permission_action.permission.modul = menus[i].auth_permission_action.auth_permission.auth_modul;
                }
            }
            let m_child = all.filter(x => x.parent_id == menus[i].id);
            m.menus = this.getMenu(m_child, all);
            menu.push(m);
        }
        return menu;
    }
};

module.exports = Account;