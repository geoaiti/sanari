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
            // await user_role.init();
            this.#auth_user_roles.push(user_role);
        }
    }

    async setMenu(value) {
        // console.log(value);
        let menu = [];
        let root = value.filter(x => x.parent_id == 0);
        for (let i = 0; i < root.length; i++) {
            let m = new (require('./Menu'))(root[i]);
            if (root[i].auth_permission) {
                m.is_active = root[i].is_active;
                m.auth_permission = root[i].auth_permission;
                if (root[i].auth_permission.auth_application) {
                    m.auth_permission.application = root[i].auth_permission.auth_application;
                }
                if (root[i].auth_permission.auth_modul) {
                    m.auth_permission.modul = root[i].auth_permission.auth_modul;
                }
            }
            let m_child = value.filter(x => x.parent_id == root[i].id);
            m.menus = await this.getMenu(m_child, value);
            menu.push(m);
        }
        this.#menus = [];
        Array.prototype.push.apply(this.#menus, menu);
    }
    
    // function private
    async getMenu(menus, all){
        let menu = [];
        for (let i = 0; i < menus.length; i++) {
            let m = new (require('./Menu'))(menus[i]);
            if (menus[i].auth_permission) {
                m.is_active = menus[i].is_active;
                m.auth_permission = menus[i].auth_permission;
                if (menus[i].auth_permission.auth_application) {
                    m.auth_permission.application = menus[i].auth_permission.auth_application;
                }
                if (menus[i].auth_permission.auth_modul) {
                    m.auth_permission.modul = menus[i].auth_permission.auth_modul;
                }
            }
            let m_child = all.filter(x => x.parent_id == menus[i].id);
            m.menus = await this.getMenu(m_child, all);
            menu.push(m);
        }
        return menu;
    }
};

module.exports = Account;