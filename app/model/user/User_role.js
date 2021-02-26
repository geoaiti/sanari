class User_role {
    #user_role = {};

    #id = null;
    #is_default = null;

    #auth_group = {};

    constructor(value){
        this.#id = value.id;
        this.#is_default = value.is_default;
        this.#user_role = value;
    }

    // getter
    get id(){
        return this.#id;
    }

    get is_default(){
        return this.#is_default;
    }

    get auth_group(){
        return this.#auth_group;
    }

    // setter
    set auth_group(value){
        this.#auth_group = new (require('./Group'))(value);
    }


};

module.exports = User_role;