import {Category, Movie, Serie, Person, User, Resource, Coordinate} from "./videoSystemModel.js"

//MVC - CONTROLADOR
class VideoSystemController {

    //Los campos privados
    #videoSystemModel;
    #videoSystemView;

    #loadVideoSystemObjects() {

        //Categorías
        let c1 = new Category("Ciencia Ficción", "Que utiliza la ciencia para fundamentar fenómenos imaginarios", "img/cienciaficcion.jpg");
        let c2 = new Category("Comedia", "Con situaciones de humor que intentan provocar la risa", "img/comedia.jpg");
        let c3 = new Category("Thriller", "De intriga y suspense", "img/thriller.jpg");

        //Producciones
        let m1 = new Movie("La momia", "Francia", new Date("1994/11/05"), "La momia ataca", "img/lamomia.jpg", new Resource(120, "link1"), [new Coordinate(2425, 2211), new Coordinate(1429, 2125)]);
        let m2 = new Movie("Star Wars", "EEUU", new Date("1998/05/12"), "En una galaxia muy lejana", "img/starwars.jpg", new Resource(155, "link1"), [new Coordinate(1242, 2261), new Coordinate(9463, 1231)]);
        let m3 = new Movie("Avatar", "EEUU", new Date("2022/07/22"), "Un nuevo planeta", "img/avatar.jpg", new Resource(180, "link1"), [new Coordinate(8973, 1314)]);
        let m4 = new Movie("El Señor de los Anillos", "EEUU", new Date("2003/01/30"), "La Tierra Media", "img/elseñordelosanillos.jpg", new Resource(175, "link1"), [new Coordinate(7422, 1261)]);
        let s1 = new Serie("Perdidos", "EEUU", new Date("1999/11/05"), "Perdidos en una isla", "img/perdidos.jpg", [new Resource(50, "link1"), new Resource(50, "link2"), new Resource(50, "link3")], [new Coordinate(7777, 3231), new Coordinate(4342, 1221)], 9);
        let s2 = new Serie("Los Soprano", "EEUU", new Date("1998/04/04"), "Peleas entre mafias", "img/lossoprano.jpg", [new Resource(52, "link1"), new Resource(52, "link2"), new Resource(52, "link3")], [new Coordinate(5675, 5555)], 7);
        let s3 = new Serie("The Wire", "EEUU", new Date("1988/05/12"), "Policiaca", "img/thewire.jpg", [new Resource(20, "link1"), new Resource(20, "link2"), new Resource(20, "link3")], [new Coordinate(4290, 7753)], 30);
        let s4 = new Serie("Breaking Bad", "EEUU", new Date("2008/12/01"), "Cocinar metanfetamina", "img/breakingbad.jpg", [new Resource(55, "link1"), new Resource(55, "link2"), new Resource(55, "link3")], [new Coordinate(2111, 2199), new Coordinate(8003, 8343)], 5);
        let m5 = new Movie("El Dictador", "EEUU", new Date("2003/01/30"), "La Tierra Media", "img/eldictador.jpg", new Resource(175, "link1"), [new Coordinate(4132, 5124)]);
        let m6 = new Movie("Scary Movie", "EEUU", new Date("2003/01/30"), "La Tierra Media", "img/scarymovie.jpg", new Resource(155, "link1"), [new Coordinate(2421, 1252)]);
        let m7 = new Movie("Borat", "EEUU", new Date("2003/01/30"), "La Tierra Media", "img/borat.jpg", new Resource(200, "link1"), [new Coordinate(2212, 5122)]);
        let m8 = new Movie("Ted", "EEUU", new Date("2003/01/30"), "La Tierra Media", "img/ted.jpg", new Resource(125, "link1"), [new Coordinate(4212, 3212)]);
    
        //Actores
        let a1 = new Person("Natalia", "Muñoz", "Pérez", new Date("1990/02/04"), "img/actor4.jpg");
        let a2 = new Person("Alba", "García", "García", new Date("1980/12/24"), "img/actor5.jpg");
        let a3 = new Person("Lucas", "Gómez", "Álvarez", new Date("1995/02/23"), "img/actor1.jpg");
        let a4 = new Person("Alberto", "Ibáñez", "López", new Date("2000/09/12"), "img/actor2.jpg");
        let a5 = new Person("Tomás", "Núñez", "Pérez", new Date("1973/12/12"), "img/actor3.jpg");
        let a6 = new Person("Lucía", "Hervás", "Rodríguez", new Date("1960/12/24"), "img/actor6.jpg");
        let a7 = new Person("Ana", "Muñoz", "Muñoz", new Date("1992/02/23"), "img/actor7.jpg");
        let a8 = new Person("Ernesto", "Sevilla", "Egea", new Date("2000/09/12"), "img/actor8.jpg");
        let a9 = new Person("Paco", "Martínez", "Pérez", new Date("1953/12/12"), "img/actor9.jpg");

        //Directores
        let d1 = new Person("Luis", "López", "Pérez", new Date("1960/01/04"), "img/director1.jpg");
        let d2 = new Person("Marta", "Fonseca", "García", new Date("1956/11/22"), "img/director3.jpg");
        let d3 = new Person("Sergio", "Gómez", "Vázquez", new Date("1976/07/17"), "img/director2.jpg");
        let d4 = new Person("Lola", "Márquez", "Jiménez", new Date("2000/09/11"), "img/director4.jpg");

        //Usuario
        let us1 = new User("Alejandro5", "alejandro@gmail.com", "alex555");

        //Asignación de producciones a las categorías
        this.#videoSystemModel.assignCategory(c1, m1, m2, m3, m4);
        this.#videoSystemModel.assignCategory(c2, m5, m6, m7, m8);
        this.#videoSystemModel.assignCategory(c3, s1, s2, s3, s4);

        //Asignación de directores a las producciones
        this.#videoSystemModel.assignDirector(d1, m1, s1, m5);
        this.#videoSystemModel.assignDirector(d2, m2, s2, m6);
        this.#videoSystemModel.assignDirector(d3, m3, s3, m7);
        this.#videoSystemModel.assignDirector(d4, m4, s4, m8);

        //Asignación de actores a las producciones
        this.#videoSystemModel.assignActor(a1, s1, m5);
        this.#videoSystemModel.assignActor(a2, m1, s1, m6);
        this.#videoSystemModel.assignActor(a3, m2, m7);
        this.#videoSystemModel.assignActor(a4, s2, m8, s1);
        this.#videoSystemModel.assignActor(a5, m3, m1, m8);
        this.#videoSystemModel.assignActor(a1, m3, s3, m7);
        this.#videoSystemModel.assignActor(a2, s2, m5);
        this.#videoSystemModel.assignActor(a3, s4, m7, m6);
        this.#videoSystemModel.assignActor(a6, m2, s2);
        this.#videoSystemModel.assignActor(a7, m4, s3, m1);
        this.#videoSystemModel.assignActor(a8, m4, s4);
        this.#videoSystemModel.assignActor(a9, s4, s3, m6);

    }

    //Constructor con la vista y el modelo
    constructor (videoSystemModel, videoSystemView) {
        this.#videoSystemModel = videoSystemModel;
        this.#videoSystemView = videoSystemView;

        //Eventos iniciales del Controlador
		this.onLoad();
        this.onInit();


        //Enlazamos handlers con la vista
		this.#videoSystemView.bindInit(this.handleInit);
    }

    //Función onload
    onLoad = () => {
		this.#loadVideoSystemObjects();
        this.onAddActor();
        this.onAddDirector();
        this.onAddCategory();
	}

    //Función de inicio
    onInit = () => {
		this.#videoSystemView.init(this.#videoSystemModel.Categories, this.#videoSystemModel.ProduccionesAleatorias);
        this.#videoSystemView.bindProductionsCategoryList(
            this.handleProductionsCategoryList
        );

        //PARA VER LA INFO DE CADA PRODUCCIÓN
        //NO ESTOY SEGURO DE SI VA AQUÍ
        this.#videoSystemView.bindProductionInfo(
            this.handleProductionInfo
        );
	}

    //Handle para la función de inicio
    handleInit = () => {
		this.onInit();
	}

    //Función para actores
    onAddActor = () => {
        this.#videoSystemView.showActorsInMenu(this.#videoSystemModel.Actors);
        this.#videoSystemView.bindProductionsActorListInMenu(
            this.handleProductionsActorList
        );
    }

    //Función para directores
    onAddDirector = () => {
        this.#videoSystemView.showDirectorsInMenu(this.#videoSystemModel.Directors);
        this.#videoSystemView.bindProductionsDirectorListInMenu(
            this.handleProductionsDirectorList
        );
    }

    //Función para categorías
    onAddCategory = () => {
        this.#videoSystemView.showCategoriesInMenu(this.#videoSystemModel.Categories);
        this.#videoSystemView.bindProductionsCategoryListInMenu(
            this.handleProductionsCategoryList
        );
    }

    //Handle para la navegación en categorías y sus producciones
    handleProductionsCategoryList = (title) => {
        let category = this.#videoSystemModel.getCategory(title);
        this.#videoSystemView.listProductions(this.#videoSystemModel.getProductionsCategory(category), category);
        this.#videoSystemView.bindProductionInfo(
            this.handleProductionInfo
        );
    }

    //Handle para la navegación de actores y sus producciones
    handleProductionsActorList = (title) => {
        let actor = this.#videoSystemModel.getActor(title);
        this.#videoSystemView.actorInfo(this.#videoSystemModel.getProductionsActor(actor), actor);
        this.#videoSystemView.bindProductionInfo(
            this.handleProductionInfo
        );
    }

    //Handle para la navegación de directores y sus producciones
    handleProductionsDirectorList = (title) => {
        let director = this.#videoSystemModel.getDirector(title);
        this.#videoSystemView.directorInfo(this.#videoSystemModel.getProductionsDirector(director), director);
        this.#videoSystemView.bindProductionInfo(
            this.handleProductionInfo
        );
    }

    //Handle para la navegación de producciones
    handleProductionInfo = (title) => {
        let production = this.#videoSystemModel.getProduction(title);
        this.#videoSystemView.productionInfo(production, this.#videoSystemModel.getCastingActors(production), this.#videoSystemModel.getCastingDirectors(production));
        this.#videoSystemView.bindProductionsActorListOutsideMenu(
            this.handleProductionsActorList
        );
        this.#videoSystemView.bindProductionsDirectorListOutsideMenu(
            this.handleProductionsDirectorList
        );
    }



}

export default VideoSystemController;