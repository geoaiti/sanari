class User {
    #user = null;

    #id = null;
    #name = null;
    #tanggal_lahir = null;
    #gender = null;
    #image = null;

    constructor(user){
        this.#id = user.id;
        this.#name = user.name;
        this.#tanggal_lahir = user.tanggal_lahir;
        this.#gender = user.gender;
        this.#image = user.image;
    }

    get id(){
        return this.#id;
    }

    get name(){
        return this.#name;
    }

    get tanggal_lahir(){
        return this.#tanggal_lahir;
    }

    get gender(){
        return this.#gender;
    }

    get image(){
        return this.#image;
    }
};

module.exports = User;