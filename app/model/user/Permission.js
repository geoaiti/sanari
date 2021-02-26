class Permission {

    #permission = {};

    #id = null;
    #metode = null;
    #is_auth = null;

    #application = {};
    #modul = {};

    constructor(value){
        this.#id = value.id;
        this.#metode = value.metode;
        this.#is_auth = value.is_auth;
    }

    // getter
    get id(){
        return this.#id;
    }

    get metode(){
        return this.#metode;
    }

    get is_auth(){
        return this.#is_auth;
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