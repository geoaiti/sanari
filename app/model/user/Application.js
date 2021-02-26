class Application {

    #application = {};

    #id = null;
    #name = null;
    #prefix = null;
    #description = null;

    constructor(value){
        this.#id = value.id;
        this.#name = value.name;
        this.#prefix = value.prefix;
        this.#description = value.description;
        this.#application = value;
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
    get description(){
        return this.#description;
    }
};

module.exports = Application;