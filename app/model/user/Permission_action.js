class Permission_action {

    #permission_action = {};

    #id = null;
    #data_argument = null;
    #url_pattern = null;

    #permission = {};
    #action = {};

    constructor(value){
        this.#id = value.id;
        this.#data_argument = value.data_argument;
        this.#url_pattern = value.url_pattern;
        this.#permission_action = value;
    }

    // getter
    get id(){
        return this.#id;
    }
    get data_argument(){
        return this.#data_argument;
    }
    get url_pattern(){
        return this.#url_pattern;
    }
    get permission(){
        return this.#permission;
    }
    get action(){
        return this.#action;
    }

    // setter
    set permission(value){
        this.#permission = new (require('./Permission'))(value);
    }

    set action(value){
        this.#action = new (require('./Action'))(value);
    }
};

module.exports = Permission_action;