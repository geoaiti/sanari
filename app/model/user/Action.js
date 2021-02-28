class Action {
    
    #action = {};

    #id = null;
    #name = null;
    #prefix = null;
    #data_argument = null;

    constructor(value){
        this.#id = value.id;
        this.#name = value.name;
        this.#prefix = value.prefix;
        this.#data_argument = value.data_argument;
        this.#action = value;
    }

    // getter
    get id(){
        return this.#id;
    }
    get name(){
        return this.#name;
    }
    get prefix(){
        return this.#prefix;
    }
    get data_argument(){
        return this.#data_argument;
    }
}

module.exports = Action;