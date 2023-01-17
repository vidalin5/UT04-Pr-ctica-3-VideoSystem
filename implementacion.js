//IMPLEMENTACIÓN

//CLASE PERSON
class Person {

    //Atributos privados
    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;

    //Constructor
    constructor(name, lastname1, lastname2, born, picture) {

        //Para invocar con el operador new
        if (!new.target) throw new InvalidAccessConstructorException();

        //Para comprobar que no haya valores vacíos
        if (!name) throw new EmptyValueException("name");
        if (!lastname1) throw new EmptyValueException("lastname1");
        if (!lastname2) throw new EmptyValueException("lastname2");
        if (!born) throw new EmptyValueException("born");
        if (!picture) throw new EmptyValueException("picture");

        //Validación de tipos
        if(typeof name != "string") throw new InvalidValueException("name", name);
        if(typeof lastname1 != "string") throw new InvalidValueException("lastname1", lastname1);
        if(typeof lastname2 != "string") throw new InvalidValueException("lastname2", lastname2);
        if (!(born instanceof Date)) throw new InvalidValueException("born", born);
        if(typeof picture != "string") throw new InvalidValueException("picture", picture);

        this.#name = name;
        this.#lastname1 = lastname1;
        this.lastname2 = lastname2;
        this.#born = born;
        this.#picture = picture;
    }

    //Getters y setters
    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get lastname1() {
        return this.#lastname1;
    }

    set lastname1(value) {
        this.#lastname1 = value;
    }

    get lastname2() {
        return this.#lastname2;
    }

    set lastname2(value) {
        this.#lastname2 = value;
    }

    get born() {
        return this.#born;
    }

    set born(value) {
        this.#born = value;
    }

    get picture() {
        return this.#picture;
    }

    set picture(value) {
        this.#picture = value;
    }

    //Métodos
    //toString
    toString () {
        return ` [PERSON] > Name: ${this.#name}, Lastname1: ${this.#lastname1}, Lastname2: ${this.#lastname2}, Born: ${this.#born}, Picture: ${this.#picture}`;
    }

}

//CLASE CATEGORY
class Category {

    //Atributos privados
    #name;
    #description;

    //Constructor
    constructor(name, description) {

        //Para invocar con el operador new
        if (!new.target) throw new InvalidAccessConstructorException();

        //Para comprobar que no haya valores vacíos
        if (!name) throw new EmptyValueException("name");
        if (!description) throw new EmptyValueException("description");

        //Validación de tipos
        if(typeof name != "string") throw new InvalidValueException("name", name);
        if(typeof description != "string") throw new InvalidValueException("description", description);

        this.#name = name;
        this.#description = description;
    }

    //Getters y setters
    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    //Métodos
    //toString
    toString () {
        return ` [CATEGORY] > Name: ${this.#name}, Description: ${this.#description}`;
    }

}

//CLASE RESOURCE
class Resource {

    //Atributos privados
    #duration;
    #link;

    //Constructor
    constructor(duration, link) {

        //Para invocar con el operador new
        if (!new.target) throw new InvalidAccessConstructorException();

        //Para comprobar que no haya valores vacíos
        if (!duration) throw new EmptyValueException("duration");
        if (!link) throw new EmptyValueException("link");

        //Validación de tipos
        if(typeof duration != "number") throw new InvalidValueException("duration", duration);
        if(typeof link != "string") throw new InvalidValueException("link", link);

        this.#duration = duration;
        this.#link = link;
    }

    //Getters y setters
    get duration() {
        return this.#duration;
    }

    set duration(value) {
        this.#duration = value;
    }

    get link() {
        return this.#link;
    }

    set link(value) {
        this.#link = value;
    }

    //Métodos
    //toString
    toString () {
        return ` [RESOURCE] > Duration: ${this.#duration}, Link: ${this.#link}`;
    }

}

//CLASE PRODUCTION
class Production {

    //Atributos privados
    #title;
    #nationality;
    #publication;
    #synopsis;
    #image;

    //Constructor
    constructor(title, nationality, publication, synopsis, image) {

        //Para invocar con el operador new
        if (!new.target) throw new InvalidAccessConstructorException();

        //Para comprobar que es abstracta y no dejar instanciar
        if (new.target === Production) throw new AbstractClassException("Production");

        //Para comprobar que no haya valores vacíos
        if (!title) throw new EmptyValueException("title");
        if (!nationality) throw new EmptyValueException("nationality");
        if (!publication) throw new EmptyValueException("publication");
        if (!synopsis) throw new EmptyValueException("synopsis");
        if (!image) throw new EmptyValueException("image");

        //Validación de tipos
        if(typeof title != "string") throw new InvalidValueException("title", title);
        if(typeof nationality != "string") throw new InvalidValueException("nationality", nationality);
        if (!(publication instanceof Date)) throw new InvalidValueException("publication", publication);
        if(typeof synopsis != "string") throw new InvalidValueException("synopsis", synopsis);
        if(typeof image != "string") throw new InvalidValueException("image", image);

        this.#title = title;
        this.#nationality = nationality;
        this.#publication = publication;
        this.#synopsis = synopsis;
        this.#image = image;
    }

    //Getters y setters
    get title() {
        return this.#title;
    }

    set title(value) {
        this.#title = value;
    }

    get nationality() {
        return this.#nationality;
    }

    set nationality(value) {
        this.#nationality = value;
    }

    get publication() {
        return this.#publication;
    }

    set publication(value) {
        this.#publication = value;
    }

    get synopsis() {
        return this.#synopsis;
    }

    set synopsis(value) {
        this.#synopsis = value;
    }

    get image() {
        return this.#image;
    }

    set image(value) {
        this.#image = value;
    }

    //Métodos
    //toString
    toString () {
        return ` Title: ${this.#title}, Nationality: ${this.#nationality}, Publication: ${this.#publication}, Synopsis: ${this.#synopsis}, Image: ${this.#image}`;
    }

}

//CLASE MOVIE
class Movie extends Production {

    //Atributos privados
    #resource;
    #locations = [];

    //Constructor
    constructor(title, nationality, publication, synopsis, image, resource) {

        //Para invocar con el operador new
        if (!new.target) throw new InvalidAccessConstructorException();

        //Para comprobar que no haya valores vacíos
        if (!resource) throw new EmptyValueException("resource");

        //Validación de tipos
        if (!(resource instanceof Resource)) throw new InvalidValueException("resource", resource);

        super (title, nationality, publication, synopsis, image);
        this.#resource = resource;

    }

    //Getters y setters
    get resource() {
        return this.#resource;
    }

    set resource(value) {
        this.#resource = value;
    }

    get locations() {

        //Asignamos la referencia
        let array = this.#locations;

        //devolvemos un objeto iterable con generador.
        return {
            * [Symbol.iterator](){
            
                //Recorremos todos los estudiantes admitidos
                for (let i = 0; i < array.length; i++){
                    yield array[i];
                }
            }
        }	
    }

    //Métodos
    //toString
    toString () {
        return ` [MOVIE] >` + super.toString() + ` Resource: ${this.#resource}, Locations: ${this.#locations}`;
    }

}

//CLASE SERIE
class Serie extends Production {

    //Atributos privados
    #resources = [];
    #locations = [];
    #seasons;

    //Constructor
    constructor(title, nationality, publication, synopsis, image, seasons) {

        //Para invocar con el operador new
        if (!new.target) throw new InvalidAccessConstructorException();

        //Para comprobar que no haya valores vacíos
        if (!seasons) throw new EmptyValueException("seasons");

        //Validación de tipos
        if(typeof seasons != "number") throw new InvalidValueException("seasons", seasons);

        super (title, nationality, publication, synopsis, image);
        this.#seasons = seasons;

    }

    //Getters y setters
    get resources() {

        //Asignamos la referencia
        let array = this.#resources;

        //devolvemos un objeto iterable con generador.
        return {
            * [Symbol.iterator](){
            
                //Recorremos todos los estudiantes admitidos
                for (let i = 0; i < array.length; i++){
                    yield array[i];
                }
            }
        }	
    }

    get locations() {

        //Asignamos la referencia
        let array = this.#locations;

        //devolvemos un objeto iterable con generador.
        return {
            * [Symbol.iterator](){
            
                //Recorremos todos los estudiantes admitidos
                for (let i = 0; i < array.length; i++){
                    yield array[i];
                }
            }
        }	
    }

    get seasons() {
        return this.#seasons;
    }

    set seasons(value) {
        this.#seasons = value;
    }

    //Métodos
    //toString
    toString () {
        return ` [SERIE] >` + super.toString() + ` Resources: ${this.#resources}, Locations: ${this.#locations}, Seasons: ${this.#seasons}`;
    }

}

//CLASE USER
class User {

    //Atributos privados
    #username;
    #email;
    #password;

    //Constructor
    constructor(username, email, password) {

        //Para invocar con el operador new
        if (!new.target) throw new InvalidAccessConstructorException();

        //Para comprobar que no haya valores vacíos
        if (!username) throw new EmptyValueException("username");
        if (!email) throw new EmptyValueException("email");
        if (!password) throw new EmptyValueException("password");

        //Validación de tipos
        if(typeof username != "number") throw new InvalidValueException("username", username);
        if(typeof email != "number") throw new InvalidValueException("email", email);
        if(typeof password != "number") throw new InvalidValueException("password", password);

        this.#username = username;
        this.#email = email;
        this.#password = password;
    }

    //Getters y setters
    get username() {
        return this.#username;
    }

    set username(value) {
        this.#username = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    get password() {
        return this.#password;
    }

    set password(value) {
        this.#password = value;
    }

    //Métodos
    //toString
    toString () {
        return ` [USER] > Username: ${this.#username}, Email: ${this.#email}, Password: ${this.#password}`;
    }

}

//CLASE COORDINATE
class Coordinate {

    //Atributos privados
    #latitude;
    #longitude;

    //Constructor
    constructor(latitude, longitude) {

        //Para invocar con el operador new
        if (!new.target) throw new InvalidAccessConstructorException();

        //Para comprobar que no haya valores vacíos
        if (!latitude) throw new EmptyValueException("latitude");
        if (!longitude) throw new EmptyValueException("longitude");

        //Validación de tipos
        if(typeof latitude != "number") throw new InvalidValueException("latitude", latitude);
        if(typeof longitude != "number") throw new InvalidValueException("longitude", longitude);

        this.#latitude = latitude;
        this.#longitude = longitude;

    }

    //Getters y setters
    get latitude() {
        return this.#latitude;
    }

    set latitude(value) {
        this.#latitude = value;
    }

    get longitude() {
        return this.#longitude;
    }

    set longitude(value) {
        this.#longitude = value;
    }

    //Métodos
    //toString
    toString () {
        return ` [COORDINATE] > Latitude: ${this.#latitude}, Longitude: ${this.#longitude}`;
    }

}

