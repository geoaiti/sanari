class Permission {

    #permission = {};

    #id = null;
    #metode = null;
    #title = null;

    #application = {};
    #modul = {};

    constructor(value){
        this.#id = value.id;
        this.#metode = value.metode;
        this.#title = value.title;
    }

    // getter
    get id(){
        return this.#id;
    }

    get metode(){
        return this.#metode;
    }

    get title(){
        return this.#title;
    }

    get application(){
        return this.#application;
    }

    get modul(){
        return this.#modul;
    }

    // setter
    set application(value){
        this.#application = new (require('./Application'))(value);
    }

    set modul(value){
        this.#modul = new (require('./Modul'))(value);
    }
};

module.exports = Permission;