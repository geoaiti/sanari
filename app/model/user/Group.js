class Group {
    #group = {};

    #id = null;
    #name = null;
    #description = null;
    
    #auth_role = {};
    #auth_roles = [];
    
    constructor(value){
        this.#id = value.id;
        this.#name = value.name;
        this.#description = value.description;
        this.#group = value;
    }

    // getter
    get id(){
        return this.#id;
    }

    get name(){
        return this.#name;
    }

    get description(){
        this.#description;
    }

    get auth_role(){
        return this.#auth_role;
    }

    get auth_roles(){
        return this.#auth_roles;
    }

    // setter
    set auth_role(value){
        this.#auth_role = new (require('./Role'))(value);
    }

    set auth_roles(values){
        values.forEach((value, i, array) => {
            let role = new (require('./Role'))(value);
            this.#auth_roles.push(role);
        });
    }
};

module.exports = Group;