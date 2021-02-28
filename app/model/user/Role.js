class Role {
    #role = {};

    #id = null;
    #is_default = null;

    #permission_action = {};

    constructor(value){
        this.#id = value.id;
        this.#is_default = value.is_default;
        this.#role = value;
    }

    // getter
    get id(){
        return this.#id;
    }

    get is_default(){
        return this.#is_default;
    }

    get permission_action(){
        return this.#permission_action;
    }

    // setter
    set permission_action(value){
        this.#permission_action = new (require('./Permission_action'))(value);
    }

};

module.exports = Role;