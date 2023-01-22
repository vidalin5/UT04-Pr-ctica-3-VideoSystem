"use strict";
import {BaseException,
	InvalidAccessConstructorException,
    AbstractClassException,
	EmptyValueException,
	InvalidValueException,
    VideoSystemException,
    CategoryAlreadyRegisteredException,
    CategoryDoesntExistException,
    UsernameAlreadyRegisteredException,
    EmailAlreadyRegisteredException,
    UserDoesntExistException,
    ProductionAlreadyRegisteredException,
    ProductionDoesntExistException,
    ActorAlreadyRegisteredException,
    ActorDoesntExistException,
    DirectorAlreadyRegisteredException,
    DirectorDoesntExistException} from './excepciones.js';

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
        if (!born) throw new EmptyValueException("born");

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
        if (!publication) throw new EmptyValueException("publication");

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
    #locations;

    //Constructor
    constructor(title, nationality, publication, synopsis, image, resource, locations = []) {

        //Para invocar con el operador new
        if (!new.target) throw new InvalidAccessConstructorException();

        //Validación de tipos
        if (!(resource instanceof Resource)) throw new InvalidValueException("resource", resource);

        super (title, nationality, publication, synopsis, image);
        this.#resource = resource;
        this.#locations = locations;

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
    constructor(title, nationality, publication, synopsis, image, resources = [], locations = [], seasons) {

        //Para invocar con el operador new
        if (!new.target) throw new InvalidAccessConstructorException();

        //Validación de tipos
        if(typeof seasons != "number") throw new InvalidValueException("seasons", seasons);

        super (title, nationality, publication, synopsis, image);
        this.#resources = resources;
        this.#locations = locations;
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
        if(typeof username != "string") throw new InvalidValueException("username", username);
        if(typeof email != "string") throw new InvalidValueException("email", email);
        if(typeof password != "string") throw new InvalidValueException("password", password);

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

//Variable VideoSystem para almacenar la instancia
let VideoSystem = (function () {
    let instantiated;
    
    //Inicializamos el Singleton
    function init(Name) {

        //Definimos la clase VideoSystem
        class VideoSystem {

            //Atributos privados
            #Name;
            #Categories = [];
            #Users = [];
            #Productions = [];
            #Actors = [];
            #Directors = [];

            //Constructor
            constructor(Name) {

                //La función se invoca con el operador new
                if (!new.target) throw new InvalidAccessConstructorException();
                if (!Name) throw new EmptyValueException("Name");

                this.#Name = Name;

            }

            //Getter y setters
            get Name() {
                return this.#Name;
            }
        
            set Name(value) {
                if (!value) throw new EmptyValueException("Name");
                this.#Name = value;
            }

            //Iterador de categorías
            get Categories() {

				//Asignamos la referencia
				let array = this.#Categories;

				//Devolvemos un objeto iterable con generador
				return {
				  * [Symbol.iterator](){

					//Recorremos todas las categorías
					for (let i = 0; i < array.length; i++){
					    yield array[i].category;
					}
				  }
				}			  
			}

            //Iterador de usuarios
            get Users() {

				//Asignamos la referencia
				let array = this.#Users;

				//Devolvemos un objeto iterable con generador
				return {
				  * [Symbol.iterator](){

					//Recorremos todos los usuarios
					for (let i = 0; i < array.length; i++){
					    yield array[i];
					}
				  }
				}			  
			}

            //Iterador de producciones
            get Productions() {

				//Asignamos la referencia
				let array = this.#Productions;

				//Devolvemos un objeto iterable con generador
				return {
				  * [Symbol.iterator](){

					//Recorremos todos las las producciones
					for (let i = 0; i < array.length; i++){
					    yield array[i];
					}
				  }
				}			  
			}

            //Iterador de actores
            get Actors() {

				//Asignamos la referencia
				let array = this.#Actors;

				//Devolvemos un objeto iterable con generador
				return {
				  * [Symbol.iterator](){

					//Recorremos todos los actores
					for (let i = 0; i < array.length; i++){
					    yield array[i].actor;
					}
				  }
				}			  
			}

            //Iterador de directores
            get Directors() {

				//Asignamos la referencia
				let array = this.#Directors;

				//Devolvemos un objeto iterable con generador
				return {
				  * [Symbol.iterator](){

					//Recorremos todos los directores
					for (let i = 0; i < array.length; i++){
					    yield array[i].director;
					}
				  }
				}			  
			}

            //Métodos
            //Método que añade una categoría nueva al sistema
            addCategory(category) {

                //Comprobamos el valor
                if(category === null) throw new InvalidValueException("category", category);
                if (!(category instanceof Category)) throw new InvalidValueException("category", category);

                //Comprobamos si se encuentra ya o no
                let index = -1;
                for (let cat of this.#Categories){
                    if (cat.category.name === category.name) {
                        index = 1;
                    }
                }

                //Si está, excepción. Si no está, la añade
                if (index != -1) {
                    throw new CategoryAlreadyRegisteredException("category", category);
                } else {
                    this.#Categories.push(
                        {
							category: category,
							productions: []
						}
                    );
                }

                return this.#Categories.length;

            }

            //Método que elimina una categoría, siempre que esté registrada
            removeCategory(category) {

                //Comprobaciones
                if(category === null) throw new InvalidValueException("category", category);
                if (!(category instanceof Category)) throw new InvalidValueException("category", category);

                //Comprobamos si se encuentra ya o no
                let index = -1;
                for (let cat of this.#Categories){
                    if (cat.category.name === category.name) {
                        index = 1;
                    }
                }

                //Si no está, excepción. Si está, la elimina
                if (index == -1) {
                    throw new CategoryDoesntExistException("category", category);
                } else {
                    for (let i = 0; i < this.#Categories.length; i++) {
                        if (this.#Categories[i].category.name === category.name) {
                            this.#Categories.splice(i, 1);
                            break;
                        }
                    }
                }

                return this.#Categories.length;

            }

            //Método que añade un nuevo usuario al sistema
            addUser(user) {

                //Comprobamos el valor
                if(user === null) throw new InvalidValueException("user", user);
                if (!(user instanceof User)) throw new InvalidValueException("user", user);

                //Comprobamos si está ya registrado
                for (let us of this.#Users){
                    if (us.username === user.username) {
                        throw new UsernameAlreadyRegisteredException("username", user);
                    }

                    if (us.email === user.email) {
                        throw new EmailAlreadyRegisteredException("email", user);
                    }
                }

                //Si no está, lo añadimos
                this.#Users.push(user);

                return this.#Users.length;

            }

            //Método que elimina un usuario, siempre que esté ya registrado
            removeUser(user) {

                //Comprobamos el valor
                if(user === null) throw new InvalidValueException("user", user);
                if (!(user instanceof User)) throw new InvalidValueException("user", user);

                //Comprobamos si se encuentra ya o no
                let index = -1;
                for (let us of this.#Users){
                    if (us.username === user.username) {
                        index = 1;
                    }
                }

                //Si no está, excepción. Si está, lo elimina
                if (index == -1) {
                    throw new UserDoesntExistException("user", user);
                } else {
                    for (let i = 0; i < this.#Users.length; i++) {
                        if (this.#Users[i].username === user.username) {
                            this.#Users.splice(i, 1);
                            break;
                        }
                    }
                }

                return this.#Users.length;

            }

            //Método que añade una nueva producción al sistema
            addProduction(production) {

                //Comprobamos el valor
                if(production === null) throw new InvalidValueException("production", production);
                if (!(production instanceof Production)) throw new InvalidValueException("production", production);

                //Comprobamos que no esté
                for (let pro of this.#Productions){
                    if (pro.title === production.title) {
                        throw new ProductionAlreadyRegisteredException("production", production);
                    }
                }

                //Si no está, la añade
                this.#Productions.push(production);

                return this.#Productions.length;

            }

            //Método que elimina una producción, siempre que esté ya registrada
            removeProduction(production) {

                //Comprobamos el valor
                if(production === null) throw new InvalidValueException("production", production);
                if (!(production instanceof Production)) throw new InvalidValueException("production", production);

                //Comprobamos si se encuentra ya o no
                let index = -1;
                for (let pro of this.#Productions){
                    if (pro.title === production.title) {
                        index = 1;
                    }
                }

                //Si no está, excepción. Si está, lo elimina
                if (index == -1) {
                    throw new ProductionDoesntExistException("production", production);
                } else {
                    for (let i = 0; i < this.#Productions.length; i++) {
                        if (this.#Productions[i].title === production.title) {
                            this.#Productions.splice(i, 1);
                            break;
                        }
                    }
                }

                return this.#Productions.length;

            }

            //Método que añade un nuevo actor al sistema
            addActor(actor) {

                //Comprobamos el valor
                if(actor === null) throw new InvalidValueException("actor", actor);
                if (!(actor instanceof Person)) throw new InvalidValueException("actor", actor);

                //Comprobamos si se encuentra ya o no
                let index = -1;
                for (let act of this.#Actors){
                    if (act.actor.name === actor.name) {
                        index = 1;
                    }
                }

                //Si está, excepción. Si no está, lo añade
                if (index != -1) {
                    throw new ActorAlreadyRegisteredException("actor", actor);
                } else {
                    this.#Actors.push(
                        {
							actor: actor,
							productions: []
						}
                    );
                }

                return this.#Actors.length;

            }

            //Método que elimina un actor, siempre que esté ya registrado
            removeActor(actor) {

                //Comprobaciones
                if(actor === null) throw new InvalidValueException("actor", actor);
                if (!(actor instanceof Person)) throw new InvalidValueException("actor", actor);

                //Comprobamos si se encuentra ya o no
                let index = -1;
                for (let act of this.#Actors){
                    if (act.actor.name === actor.name) {
                        index = 1;
                    }
                }

                //Si no está, excepción. Si está, lo elimina
                if (index == -1) {
                    throw new ActorDoesntExistException("actor", actor);
                } else {
                    for (let i = 0; i < this.#Actors.length; i++) {
                        if (this.#Actors[i].actor.name === actor.name) {
                            this.#Actors.splice(i, 1);
                            break;
                        }
                    }
                }

                return this.#Actors.length;

            }

            //Método que añade un nuevo director al sistema
            addDirector(director) {

                //Comprobamos el valor
                if(director === null) throw new InvalidValueException("director", director);
                if (!(director instanceof Person)) throw new InvalidValueException("director", director);

                //Comprobamos si se encuentra ya o no
                let index = -1;
                for (let dir of this.#Directors){
                    if (dir.director.name === director.name) {
                        index = 1;
                    }
                }

                //Si está, excepción. Si no está, lo añade
                if (index != -1) {
                    throw new DirectorAlreadyRegisteredException("director", director);
                } else {
                    this.#Directors.push(
                        {
							director: director,
							productions: []
						}
                    );
                }

                return this.#Directors.length;

            }

            //Método que elimina un director, siempre que esté ya registrado
            removeDirector(director) {

                //Comprobaciones
                if(director === null) throw new InvalidValueException("director", director);
                if (!(director instanceof Person)) throw new InvalidValueException("director", director);

                //Comprobamos si se encuentra ya o no
                let index = -1;
                for (let dir of this.#Directors){
                    if (dir.director.name === director.name) {
                        index = 1;
                    }
                }

                //Si no está, excepción. Si está, lo elimina
                if (index == -1) {
                    throw new DirectorDoesntExistException("director", director);
                } else {
                    for (let i = 0; i < this.#Directors.length; i++) {
                        if (this.#Directors[i].director.name === director.name) {
                            this.#Directors.splice(i, 1);
                            break;
                        }
                    }
                }

                return this.#Directors.length;

            }

            //Método que le asignará una producción a una categoría
            //Si la categoría no existe, la añade al sistema
            //Si la producción no existe, la añade al sistema
            assignCategory(category, production) {

                //Comprobaciones
                if(category === null) throw new InvalidValueException("category", category);
                if(production === null) throw new InvalidValueException("production", production);

                //Comprobamos si están registradas o no
				function compareElementsCat(element) {
					return (element.category.name === category.name)
				}

                function compareElementsPro(element) {
					return (element.title === production.title)
				}

				let indexCat = this.#Categories.findIndex(compareElementsCat);
                let indexPro = this.#Productions.findIndex(compareElementsPro);

                //Si el producto no está registrado, lo añade
                if (indexPro == -1) {
                    this.addProduction(production)
                }

                //Si la categoría no está registrada, la añade antes de asignarle el producto
                if (indexCat == -1) {
                    this.addCategory(category);
                    indexCat = this.#Categories.length - 1;
                    this.#Categories[indexCat].productions.push(production);
                } else {
                    this.#Categories[indexCat].productions.push(production);
                }

                return this.#Categories[indexCat].productions.length;

            }

            //Método que desasigna una producción a una categoría
            deassignCategory(category, production) {

                //Comprobaciones
                if(category === null) throw new InvalidValueException("category", category);
                if(production === null) throw new InvalidValueException("production", production);

                //Comprobamos si están o no
				function compareElementsCat(element) {
					return (element.category.name === category.name)
				}

                function compareElementsPro(element) {
					return (element.title === production.title)
				}

				let indexCat = this.#Categories.findIndex(compareElementsCat);

                //Si la categoría no está, excepción
                if (indexCat == -1) {
                    throw new CategoryDoesntExistException("category", category);
                }

                let indexPro = this.#Categories[indexCat].productions.findIndex(compareElementsPro);

                //Si la producción no está, excepción
                if (indexPro == -1) {
                    throw new ProductionDoesntExistException("production", production);
                }

                //La eliminamos
                this.#Categories[indexCat].productions.splice(indexPro, 1);

                return this.#Categories[indexCat].productions.length;

            }

            //Iterador para recorrer las producciones de una categoría
            * getProductionsCategory(category) {

                //Comprobaciones
                if(category === null) throw new InvalidValueException("category", category);

                //Comprobamos si la categoría existe
                function compareElements(element) {
					return (element.category.name === category.name)
				}

				let categoryPosition = this.#Categories.findIndex(compareElements);

                //Si no existe, excepción
                if (categoryPosition === -1) throw new CategoryDoesntExistException("category", category);

                //Devolvemos cada producción de esa categoría
                for (let pro of this.#Categories[categoryPosition].productions){
                    yield pro;
                }

			}

            //Método que le asignará una producción a un director
            //Si el director no existe, lo añade al sistema
            //Si la producción no existe, la añade al sistema
            assignDirector(director, production) {

                //Comprobaciones
                if(director === null) throw new InvalidValueException("director", director);
                if(production === null) throw new InvalidValueException("production", production);

                //Comprobamos si están registrados o no
                function compareElementsDir(element) {
                    return (element.director.name === director.name)
                }

                function compareElementsPro(element) {
                    return (element.title === production.title)
                }

                let indexDir = this.#Directors.findIndex(compareElementsDir);
                let indexPro = this.#Productions.findIndex(compareElementsPro);

                //Si la producción no está, la añade
                if (indexPro == -1) {
                    this.addProduction(production)
                }

                //Si el director no está, lo añade antes de asignarle la producción
                if (indexDir == -1) {
                    this.addDirector(director);
                    indexDir = this.#Directors.length - 1;
                    this.#Directors[indexDir].productions.push(production);
                } else {
                    this.#Directors[indexDir].productions.push(production);
                }

                return this.#Directors[indexDir].productions.length;

            }

            //Método que desasignará una producción a un director
            deassignDirector(director, production) {

                //Comprobaciones
                if(director === null) throw new InvalidValueException("director", director);
                if(production === null) throw new InvalidValueException("production", production);

                //Comprobamos si están registrados
                function compareElementsDir(element) {
                    return (element.director.name === director.name)
                }

                function compareElementsPro(element) {
                    return (element.title === production.title)
                }

                let indexDir = this.#Directors.findIndex(compareElementsDir);

                //Si el director no está registrado, excepción
                if (indexDir == -1) {
                    throw new DirectorDoesntExistException("director", director);
                }

                let indexPro = this.#Directors[indexDir].productions.findIndex(compareElementsPro);

                //Si la producción no está registrada, excepción
                if (indexPro == -1) {
                    throw new ProductionDoesntExistException("production", production);
                }

                //Desasignamos la producción
                this.#Directors[indexDir].productions.splice(indexPro, 1);

                return this.#Directors[indexDir].productions.length;

            }

            //Iterador para recorrer las producciones de un director
            * getProductionsDirector(director) {

                //Comprobaciones
                if(director === null) throw new InvalidValueException("director", director);

                //Comprobamos que ese director está registrado
                function compareElements(element) {
                    return (element.director.name === director.name)
                }

                let directorPosition = this.#Directors.findIndex(compareElements);

                //Si no lo está, excepción
                if (directorPosition === -1) throw new DirectorDoesntExistException("director", director);

                //Recorremos todas las producciones de ese director
                for (let pro of this.#Directors[directorPosition].productions){
                    yield pro;
                }

            }   

            //Método que le asignará una producción a un actor
            //Si el actor no existe, lo añade al sistema
            //Si la producción no existe, la añade al sistema
            assignActor(actor, production) {

                //Comprobaciones
                if(actor === null) throw new InvalidValueException("actor", actor);
                if(production === null) throw new InvalidValueException("production", production);

                //Comprobamos que se encuentran registrados
                function compareElementsAct(element) {
                    return (element.actor.name === actor.name)
                }

                function compareElementsPro(element) {
                    return (element.title === production.title)
                }

                let indexAct = this.#Actors.findIndex(compareElementsAct);
                let indexPro = this.#Productions.findIndex(compareElementsPro);

                //Si la producción no está registrada, la añade
                if (indexPro == -1) {
                    this.addProduction(production)
                }

                //Si el actor no está registrado, lo añade antes de asignarle la producción
                if (indexAct == -1) {
                    this.addActor(actor);
                    indexAct = this.#Actors.length - 1;
                    this.#Actors[indexAct].productions.push(production);
                } else {
                    this.#Actors[indexAct].productions.push(production);
                }

                return this.#Actors[indexAct].productions.length;

            }

            //Método que desasignará una producción a un actor
            deassignActor(actor, production) {

                //Comprobaciones
                if(actor === null) throw new InvalidValueException("actor", actor);
                if(production === null) throw new InvalidValueException("production", production);

                //Comprobamos que se encuentran registrados
				function compareElementsAct(element) {
					return (element.actor.name === actor.name)
				}

                function compareElementsPro(element) {
					return (element.title === production.title)
				}

				let indexAct = this.#Actors.findIndex(compareElementsAct);

                //Si el actor no está registrado, excepción
                if (indexAct == -1) {
                    throw new ActorDoesntExistException("actor", actor);
                }

                let indexPro = this.#Actors[indexAct].productions.findIndex(compareElementsPro);

                //Si la producción no está registrada, excepción
                if (indexPro == -1) {
                    throw new ProductionDoesntExistException("production", production);
                }

                //Desasignamos la producción
                this.#Actors[indexAct].productions.splice(indexPro, 1);

                return this.#Actors[indexAct].productions.length;

            }

            //Iterador para recorrer las producciones de un actor
            * getProductionsActor(actor) {

                //Comprobaciones
                if(actor === null) throw new InvalidValueException("actor", actor);

                //Comprobamos que se encuentra registrado
                function compareElements(element) {
                    return (element.actor.name === actor.name)
                }

                let actorPosition = this.#Actors.findIndex(compareElements);

                //Si no lo está, excepción
                if (actorPosition === -1) throw new ActorDoesntExistException("actor", actor);

                //Recorremos todas las producciones de ese actor
                for (let pro of this.#Actors[actorPosition].productions){
                    yield pro;
                }

            }   

        }

        //Instanciamos un objeto, lo congelamos y lo devolvemos
        let vs = new VideoSystem(Name);
        Object.freeze(vs)
        return vs;
           
    }

    return {

        //Devuelve un objeto con el método getInstance
        getInstance: function (Name) {

            //Si la variable no está definida, ejecutamos la función init
            if (!instantiated) {

                //Esta variable contendrá la instancia
                instantiated = init(Name);
            }

            //La devolvemos
            return instantiated;

        }
    };
})();


export {Person, Category, Resource, Production, Movie, Serie, User, Coordinate};

export default VideoSystem;