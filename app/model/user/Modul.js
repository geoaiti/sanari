class Modul {
    
    #modul = {};

    #id = null;
    #name = null;
    #prefix = null;
    #description = null;
    #generation = null;
    #parent_id = null;

    constructor(value){
        this.#id = value.id;
        this.#name = value.name;
        this.#prefix = value.prefix;
        this.#description = value.description;
        this.#generation = value.generation;
        this.#parent_id = value.parent_id;
        this.#modul = value;
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
    get generation(){
        return this.#generation;
    }
    get parent_id(){
        return this.#parent_id;
    }
}

module.exports = Modul;