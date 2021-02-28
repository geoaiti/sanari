class Menu {
    
    #menu = {};

    #id = null;
    #name = null;
    #icon = null;
    #parent_id = null;
    #permission = null;

    #menus = [];
    #permission_action = {};
    #is_active = false;

    constructor(value){
        this.#id = value.id;
        this.#name = value.name;
        this.#icon = value.icon;
        this.#parent_id = value.parent_id;
        this.#permission = value.permission;
        this.#is_active = false;
        this.#menu = value;
    }

    // getter
    get id(){
        return this.#id;
    }
    get name(){
        return this.#name;
    }
    get icon(){
        return this.#icon;
    }
    get parent_id(){
        return this.#parent_id;
    }
    get permission(){
        return this.#permission;
    }
    get menus(){
        return this.#menus;
    }
    get permission_action(){
        return this.#permission_action;
    }
    get is_active(){
        return this.#is_active;
    }

    // setter
    set menus(values){
        this.#menus = values;
    }
    set permission_action(value){
        this.#permission_action = new (require('./Permission_action'))(value);
    }
    set is_active(value){
        this.#is_active = value ? value : false;
    }
}

module.exports = Menu;