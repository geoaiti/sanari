class Role {
    #role = {};

    #id = null;
    #is_default = null;

    #permission = {};

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

    get permission(){
        return this.#permission;
    }

    // setter
    set permission(value){
        this.#permission = new (require('./Permission'))(value);
    }

};

module.exports = Role;