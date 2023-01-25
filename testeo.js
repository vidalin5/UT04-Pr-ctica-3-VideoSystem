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
import {Person, Category, Resource, Production, Movie, Serie, User, Coordinate} from './implementacion.js';
import VideoSystem from './implementacion.js';

//TESTEO
console.warn("TESTEO")

//COMPROBACIÓN DE OBJETOS, ESTRUCTURA Y HERENCIA -------------------
console.warn("COMPROBACIÓN DE OBJETOS Y ESTRUCTURA")
try {
    let p1 = new Person("Vidal", "De la Fuente", "", new Date("1994/05/11"), "LINK");
    console.log(p1.toString());
    let c1 = new Category("Categoria1", "Esta es la categoria 1");
    console.log(c1.toString());
    let r1 = new Resource(130, "LINK");
    console.log(r1.toString());
    let m1 = new Movie("El padrino", "Inglesa", new Date("1994/05/11"), "El padrino hace tal", "LINK", new Resource(34, "LINK"));
    console.log(m1.toString());
    let s1 = new Serie("The office", "Inglesa", new Date("1994/05/11"), "Una oficina", "LINK", "", "", 9);
    console.log(s1.toString());
    let u1 = new User("Paquito", "invent@gmail.com", "12345");
    console.log(u1.toString());
    let cd1 = new Coordinate(2521, 2536);
    console.log(cd1.toString());
} catch(error) {
    console.log(error)
}

//VIDEOSYSTEM, PARTE 1 --------------------------------------------
console.warn("VIDEOSYSTEM: 1ª PARTE")

//Instanciación
var vs = VideoSystem.getInstance("Vidalículas");
console.log("Nombre del sistema: " + vs.Name);


//[Categories] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.warn("CATEGORIAS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

//Creamos unas cuantas y las añadimos
try {
    var c1 = new Category("Ciencia Ficción", "Que utiliza la ciencia para fundamentar fenómenos imaginarios");
    var c2 = new Category("Comedia", "Con situaciones de humor que intentan provocar la risa");
    var c3 = new Category("Thriller", "De intriga y suspense");
    var c4 = new Category("Terror", "Que intenta provocar sensaciones de pavor, terror y miedo");
    var c5 = new Category("Aventura", "Que refleja un mundo heroico de combates y aventuras");
    var c6 = new Category("Drama", "Que trata situacones serias que pretenden inspirar tristeza y compasión");
    console.log("Número de categorías: " + vs.addCategory(c1));
    console.log("Número de categorías: " + vs.addCategory(c2));
    console.log("Número de categorías: " + vs.addCategory(c3));
    console.log("Número de categorías: " + vs.addCategory(c4));
    console.log("Número de categorías: " + vs.addCategory(c5));
    console.log("Número de categorías: " + vs.addCategory(c6));
} catch(error) {
    console.log(error);
}

console.warn("INTENTAMOS AÑADIR CATEGORÍA NULL");
//Intentamos añadir una categoría NULL. Da ERROR
try {
    vs.addCategory(null);
} catch(error) {
    console.log(error);
}

console.warn("INTENTAMOS AÑADIR ALGO QUE NO SEA CATEGORY");
//Intentamos añadir un objeto que no sea CATEGORY. Da ERROR
try {
    let p1 = new Person("Vidal", "De la Fuente", "", new Date("1994/05/11"), "LINK");
    vs.addCategory(p1);
} catch(error) {
    console.log(error);
}

console.warn("INTENTAMOS AÑADIR CATEGORY YA REGISTRADA");
//Intentamos añadir una category que YA EXISTE. Da ERROR
try {
    vs.addCategory(c1);
} catch(error) {
    console.log(error);
}

console.warn("TOTAL CATEGORÍAS:");
//Recorremos todas las categorías con el iterador
for (let category of vs.Categories){
    console.log (">>> " + category);
}

console.warn("INTENTAMOS ELIMINAR CATEGORÍA NO REGISTRADA");
//Intentamos borrar una categoría que no está registrada. Da ERROR
try {
    let c7 = new Category("Prueba", "Prueba");
    vs.removeCategory(c7);
} catch(error) {
    console.log(error);
}

console.warn("ELIMINAMOS CATEGORÍA");
//Borramos unca categoría
try {
    console.log("Número de categorías: " + vs.removeCategory(c1));
} catch(error) {
    console.log(error);
}

for (let category of vs.Categories){
    console.log (">>> " + category);
}

console.warn("AÑADIMOS CATEGORÍA DE NUEVO");
//Volvemos a añadirla para pruebas futuras
console.log("Número de categorías: " + vs.addCategory(c1));

for (let category of vs.Categories){
    console.log (">>> " + category);
}


//[Users] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.warn("USUARIOS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

//Creamos algunos usuarios y los añadimos
try {
    var us1 = new User("Alejandro5", "alejandro@gmail.com", "alex555");
    var us2 = new User("Paco_Perez", "pacope@gmail.com", "pacope");
    var us3 = new User("Antonio_16", "antonio16@gmail.com", "533235");
    var us4 = new User("Fernando1", "fernan@gmail.com", "fer12345");
    var us5 = new User("Franlopez", "franlo@gmail.com", "fran111");
    console.log("Número de usuarios: " + vs.addUser(us1));
    console.log("Número de usuarios: " + vs.addUser(us2));
    console.log("Número de usuarios: " + vs.addUser(us3));
    console.log("Número de usuarios: " + vs.addUser(us4));
    console.log("Número de usuarios: " + vs.addUser(us5));
} catch(error) {
    console.log(error)
}

console.warn("TOTAL USUARIOS:");
//Los recorremos todos con el iterador
for (let user of vs.Users){
    console.log (">>> " + user);
}

console.warn("INTENTAMOS PASARLE ALGO QUE NO SEA USER");
//Le pasamos un objeto que no sea tipo USER. Da ERROR
try {
    vs.addUser(c1);
} catch(error) {
    console.log(error)
}

console.warn("INTENTAMOS PASARLE USER YA REGISTRADO");
//Le pasamos un USER con username ya registrado. Da ERROR
try {
    vs.addUser(us1);
} catch(error) {
    console.log(error)
}

//Le pasamos un USER con email ya registrado. Da ERROR
try {
    let us6 = new User("Alvaro6", "alejandro@gmail.com", "2533331");
    vs.addUser(us6);
} catch(error) {
    console.log(error)
}

console.warn("INTENTAMOS ELIMINAR USUARIO QUE NO ESTÁ REGISTRADO");
//Intentamos borrar un usuario que no existe. Da ERROR
try {
    let us6 = new User("Alvaro6", "aalvaro6@gmail.com", "33133");
    vs.removeUser(us6);
} catch(error) {
    console.log(error)
}

console.warn("ELIMINAMOS USUARIO");
//Eliminamos un usuario
try {
    console.log("Número de usuarios: " + vs.removeUser(us1));
} catch(error) {
    console.log(error)
}

//Los recorremos todos con el iterador
for (let user of vs.Users){
    console.log (">>> " + user);
}

console.warn("VOLVEMOS A AÑADIRLO");
//Volvemos a añadirlo
try {
    console.log("Número de usuarios: " + vs.addUser(us1));
} catch(error) {
    console.log(error)
}


//[Productions] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.warn("PRODUCCIONES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

//Creamos algunas producciones y las añadimos
try {
    var m1 = new Movie("La momia", "Francia", new Date("1994/11/05"), "La momia ataca", "www.urlimagenmomia.com", new Resource(120, "link1"), [new Coordinate(2425, 2211), new Coordinate(1429, 2125)]);
    var m2 = new Movie("Star Wars", "EEUU", new Date("1998/05/12"), "En una galaxia muy lejana", "www.urlimagenstarwars.com", new Resource(155, "link1"), [new Coordinate(1242, 2261), new Coordinate(9463, 1231)]);
    var m3 = new Movie("Avatar", "EEUU", new Date("2022/07/22"), "Un nuevo planeta", "www.urlimagenavatar.com", new Resource(180, "link1"), [new Coordinate(8973, 1314)]);
    var m4 = new Movie("El Señor de los Anillos", "EEUU", new Date("2003/01/30"), "La Tierra Media", "www.urlimagenanillos.com", new Resource(175, "link1"), [new Coordinate(7422, 1261)]);
    var s1 = new Serie("Perdidos", "EEUU", new Date("1999/11/05"), "Perdidos en una isla", "www.urlimagenperdidos.com", [new Resource(50, "link1"), new Resource(50, "link2"), new Resource(50, "link3")], [new Coordinate(7777, 3231), new Coordinate(4342, 1221)], 9);
    var s2 = new Serie("Los Soprano", "EEUU", new Date("1998/04/04"), "Peleas entre mafias", "www.urlimagensoprano.com", [new Resource(52, "link1"), new Resource(52, "link2"), new Resource(52, "link3")], [new Coordinate(5675, 5555)], 7);
    var s3 = new Serie("The Simpson", "EEUU", new Date("1988/05/12"), "Dibujos animados", "www.urlimagensimpson.com", [new Resource(20, "link1"), new Resource(20, "link2"), new Resource(20, "link3")], [new Coordinate(4290, 7753)], 30);
    var s4 = new Serie("Breaking Bad", "EEUU", new Date("2008/12/01"), "Cocinar metanfetamina", "www.urlimagenbreaking.com", [new Resource(55, "link1"), new Resource(55, "link2"), new Resource(55, "link3")], [new Coordinate(2111, 2199), new Coordinate(8003, 8343)], 5);
    console.log("Número de producciones: " + vs.addProduction(m1));
    console.log("Número de producciones: " + vs.addProduction(m2));
    console.log("Número de producciones: " + vs.addProduction(m3));
    console.log("Número de producciones: " + vs.addProduction(m4));
    console.log("Número de producciones: " + vs.addProduction(s1));
    console.log("Número de producciones: " + vs.addProduction(s2));
    console.log("Número de producciones: " + vs.addProduction(s3));
    console.log("Número de producciones: " + vs.addProduction(s4));
} catch(error) {
    console.log(error);
}

console.warn("TOTAL PRODUCCIONES:");
//Las recorremos todas con el iterador
for (let pro of vs.Productions){
    console.log (">>> " + pro);
}

console.warn("INTENTAMOS AÑADIR ALGO QUE NO SEA PRODUCTION");
//Intentamos añadirle algo que no sea tipo PRODUCTION. Da ERROR
try {
    vs.addProduction(c1);
} catch (error) {
    console.log(error);
}

console.warn("INTENTAMOS AÑADIR PRODUCTION YA REGISTRADA");
//Intentamos añadir una PRODUCTION repetida. Da ERROR
try {
    vs.addProduction(m1);
} catch (error) {
    console.log(error);
}

console.warn("INTENTAMOS ELIMINAR PRODUCTION NO REGISTRADA");
//Intentamos borrar una PRODUCTION que no está registrada. Da ERROR
try {
    let m5 = new Movie("Peter Pan", "Francia", new Date("1994/11/05"), "Aventuras en el mundo de nunca jamas", "www.urlimagenpeter.com", new Resource(120, "link1"), [new Coordinate(3631, 5631)]);
    vs.removeProduction(m5);
} catch (error) {
    console.log(error);
}

console.warn("ELIMINAMOS PRODUCTION");
//Borramos una PRODUCTION
try {
    console.log("Número de producciones: " + vs.removeProduction(m1));
} catch (error) {
    console.log(error);
}

//Las recorremos todas con el iterador
for (let pro of vs.Productions){
    console.log (">>> " + pro);
}

console.warn("VOLVEMOS A AÑADIRLA");
//Volvemos a añadirla
try {
    console.log("Número de producciones: " + vs.addProduction(m1));
} catch(error) {
    console.log(error)
}


//[Actors] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.warn("ACTORES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

//Creamos unos cuantos y los añadimos
try {
    var a1 = new Person("Natalia", "Muñoz", "Pérez", new Date("1990/02/04"), "rutaimagen");
    var a2 = new Person("Alba", "García", "García", new Date("1980/12/24"), "rutaimagen");
    var a3 = new Person("Lucas", "Gómez", "Álvarez", new Date("1995/02/23"), "rutaimagen");
    var a4 = new Person("Alberto", "Ibáñez", "López", new Date("2000/09/12"), "rutaimagen");
    var a5 = new Person("Tomás", "Núñez", "Pérez", new Date("1973/12/12"), "rutaimagen");
    console.log("Número de actores: " + vs.addActor(a1));
    console.log("Número de actores: " + vs.addActor(a2));
    console.log("Número de actores: " + vs.addActor(a3));
    console.log("Número de actores: " + vs.addActor(a4));
    console.log("Número de actores: " + vs.addActor(a5));
} catch(error) {
    console.log(error);
}

console.warn("TOTAL ACTORES:");
//Los recorremos todos con el iterador
for (let act of vs.Actors){
    console.log (">>> " + act);
}

console.warn("INTENTAMOS AÑADIR ALGO QUE NO SEA PERSON");
//Intentamos añadir algo que no sea tipo PERSON. Da ERROR
try {
    vs.addActor(c1);
} catch(error) {
    console.log(error);
}

console.warn("INTENTAMOS AÑADIR ACTOR YA REGISTRADO");
//Intentamos añadir un actor ya registrado. Da ERROR
try {
    vs.addActor(a1);
} catch(error) {
    console.log(error);
}

console.warn("INTENTAMOS ELIMINAR ACTOR NO REGISTRADO");
//Intentamos eliminar un actor que no esté registrado. Da ERROR
try {
    let a6 = new Person("Antonio", "Garrido", "Fernández", new Date("1995/12/31"), "rutaimagen");
    vs.removeActor(a6);
} catch(error) {
    console.log(error);
}

console.warn("ELIMINAMOS ACTOR");
//Eliminamos un actor
try {
    console.log("Número de actores: " + vs.removeActor(a1));
} catch(error) {
    console.log(error);
}

//Los recorremos todos con el iterador
for (let act of vs.Actors){
    console.log (">>> " + act);
}

console.warn("VOLVEMOS A AÑADIRLO");
//Lo volvemos a añadir
try {
    console.log("Número de actores: " + vs.addActor(a1));
} catch(error) {
    console.log(error);
}


//[Directors] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.warn("DIRECTORES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

//Creamos unos cuantos y los añadimos
try {
    var d1 = new Person("Luis", "López", "Pérez", new Date("1960/01/04"), "rutaimagen");
    var d2 = new Person("Marta", "Fonseca", "García", new Date("1956/11/22"), "rutaimagen");
    var d3 = new Person("Sergio", "Gómez", "Vázquez", new Date("1976/07/17"), "rutaimagen");
    var d4 = new Person("Lola", "Márquez", "Jiménez", new Date("2000/09/11"), "rutaimagen");
    var d5 = new Person("Ernesto", "Robles", "Pérez", new Date("1963/08/03"), "rutaimagen");
    console.log("Número de directores: " + vs.addDirector(d1));
    console.log("Número de directores: " + vs.addDirector(d2));
    console.log("Número de directores: " + vs.addDirector(d3));
    console.log("Número de directores: " + vs.addDirector(d4));
    console.log("Número de directores: " + vs.addDirector(d5));
} catch(error) {
    console.log(error);
}

console.warn("TOTAL DIRECTORES:");
//Los recorremos todos con el iterador
for (let dir of vs.Directors){
    console.log (">>> " + dir);
}

console.warn("INTENTAMOS AÑADIR ALGO QUE NO SEA PERSON");
//Intentamos añadir algo que no sea tipo PERSON. Da ERROR
try {
    vs.addDirector(c1);
} catch(error) {
    console.log(error);
}

console.warn("INTENTAMOS AÑADIR DIRECTOR YA REGISTRADO");
//Intentamos añadir un director ya registrado. Da ERROR
try {
    vs.addDirector(d1);
} catch(error) {
    console.log(error);
}

console.warn("INTENTAMOS ELIMINAR DIRECTOR NO REGISTRADO");
//Intentamos eliminar un director que no está registrado. Da ERROR
try {
    let d6 = new Person("Fulgencio", "Pérez", "Pérez", new Date("1953/01/14"), "rutaimagen");
    vs.removeDirector(d6);
} catch(error) {
    console.log(error);
}

console.warn("ELIMINAMOS UN DIRECTOR");
//Eliminamos un director
try {
    console.log("Número de directores: " + vs.removeDirector(d1));
} catch(error) {
    console.log(error);
}

//Los recorremos todos con el iterador
for (let dir of vs.Directors){
    console.log (">>> " + dir);
}

console.warn("VOLVEMOS A AÑADIRLO");
//Lo volvemos a añadir
try {
    console.log("Número de directores: " + vs.addDirector(d1));
} catch(error) {
    console.log(error);
}


//[Asignar/Desasignar Producciones a Categorías] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.warn("ASIGNAR/DESASIGNAR PRODUCCIONES A CATEGORÍAS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

//Le asignamos las producciones m1, m2 (EXISTEN) y m5 (NO EXISTE) a la categoría c1. m5 Debería registrarla
try {
    let m5 = new Movie("El pianista", "EEUU", new Date("1994/11/05"), "Pianista", "www.urlimagenpiano.com", new Resource(140, "link1"), [new Coordinate(3301, 9779)]);
    console.log("Número de producciones asignadas a " + c1.name + ": " + vs.assignCategory(c1, m1, m2, m5));
} catch(error) {
    console.log(error);
}

console.warn("PRODUCCIONES DE: " + c1.name + " (categoría)")
let generator = vs.getProductionsCategory(c1);

let next;
while (!(next = generator.next()).done) {
   let pro = next.value;
   console.log(pro.toString());
}

console.warn("TOTAL PRODUCCIONES");
//Comprobamos que ha añadido la producción al total del sistema
for (let pro of vs.Productions){
    console.log (">>> " + pro);
}

console.warn("ASIGNAMOS A CATEGORÍA QUE NO EXISTE (LA AÑADE AL SISTEMA)");
//Intentamos asignarle una categoría que no existe. La añade al sistema
try {
    var c7 = new Category("Musical", "Que trata situaciones de la vida en forma de musical");
    console.log("Número de producciones asignadas a " + c7.name + ": " + vs.assignCategory(c7, s4, s1, m4));
} catch(error) {
    console.log(error);
}

//Comprobamos que ha añadido la categoría
for (let cat of vs.Categories){
    console.log (">>> " + cat);
}

console.warn("PRODUCCIONES DE: " + c7.name + " (categoría)")
let generator2 = vs.getProductionsCategory(c7);

let next2;
while (!(next2 = generator2.next()).done) {
   let pro = next2.value;
   console.log(pro.toString());
}

console.warn("DESASIGNAMOS UNA PRODUCCIÓN");
//Desasignamos una producción a una categoría
try {
    console.log("Número de producciones asignadas a " + c1.name + ": " + vs.deassignCategory(c1, m1, m2));
} catch(error) {
    console.log(error);
}

console.warn("PRODUCCIONES DE: " + c1.name + " (categoría)")
let generator18 = vs.getProductionsCategory(c1);

let next18;
while (!(next18 = generator18.next()).done) {
   let pro = next18.value;
   console.log(pro.toString());
}

console.warn("INTENTAMOS DESASIGNAR PRODUCCIÓN QUE NO EXISTE");
//Intentamos desasignar una producción que no existe a una categoría. Da ERROR
try {
    let m5 = new Movie("Viernes 13", "EEUU", new Date("2006/12/05"), "Película de terror", "www.urlimagenviernes.com", new Resource(140, "link1"), [new Coordinate(8644, 1555)]);
    console.log("Número de producciones asignadas a " + c1.name + ": " + vs.deassignCategory(c1, m5));
} catch(error) {
    console.log(error);
}

console.warn("INTENTAMOS DESASIGNAR A UNA CATEGORÍA QUE NO EXISTE");
//Intentamos desasignar a una categoría que no existe. Da ERROR
try {
    var f1 = new Category("Fantasía", "Que trata situaciones fantásticas");
    console.log("Número de producciones asignadas a " + c1.name + ": " + vs.deassignCategory(f1, m2));
} catch(error) {
    console.log(error);
}


//[Asignar/Desasignar Producciones a Directores] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.warn("ASIGNAR/DESASIGNAR PRODUCCIONES A DIRECTORES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

//Le asignamos las producciones m3 y s2 al director d1
try {
    let m15 = new Movie("Viernes 13", "EEUU", new Date("2006/12/05"), "Película de terror", "www.urlimagenviernes.com", new Resource(140, "link1"), [new Coordinate(8644, 1555)]);
    console.log("Número de producciones asignadas a " + d1.name + ": " + vs.assignDirector(d1, m3, s2));
} catch(error) {
    console.log(error);
}

console.warn("PRODUCCIONES DE: " + d1.name + " (director)")
let generator3 = vs.getProductionsDirector(d1);

let next3;
while (!(next3 = generator3.next()).done) {
   let pro = next3.value;
   console.log(pro.toString());
}

console.warn("ASIGNACIÓN DE PRODUCCIÓN QUE NO ESTABA REGISTRADA:");
//Intentamos asignarle una producción que no existe. La añade al sistema
try {
    var m5 = new Movie("Titanic", "EEUU", new Date("1994/11/05"), "El barco que se hundió", "www.urlimagenbarco.com", new Resource(145, "link1"), [new Coordinate(2415, 4309)]);
    console.log("Número de producciones asignadas a " + d1.name + ": " + vs.assignDirector(d1, m5));
} catch(error) {
    console.log(error);
}

console.warn("TOTAL PRODUCCIONES:");
//Comprobamos que ha añadido la producción al total del sistema
for (let pro of vs.Productions){
    console.log (">>> " + pro);
}

console.warn("ASIGNACIÓN DE DIRECTOR QUE NO ESTABA REGISTRADO:");
//Intentamos asignar a un director que no existe. Lo añade al sistema
try {
    let d6 = new Person("Francisca", "Muñoz", "Jiménez", new Date("1980/05/16"), "rutaimagen");
    console.log("Número de producciones asignadas a " + d6.name + ": " + vs.assignDirector(d6, s1));
} catch(error) {
    console.log(error);
}

console.warn("TOTAL DIRECTORES:");
//Comprobamos que ha añadido el director
for (let dir of vs.Directors){
    console.log (">>> " + dir);
}

console.warn("DESASIGNACIÓN DE UNA PRODUCCIÓN");
//Desasignamos una producción a u director
try {
    console.log("Número de producciones asignadas a " + d1.name + ": " + vs.deassignDirector(d1, m3, s2));
} catch(error) {
    console.log(error);
}

console.warn("PRODUCCIONES DE: " + d1.name + " (director)")
let generator4 = vs.getProductionsDirector(d1);

let next4;
while (!(next4 = generator4.next()).done) {
   let pro = next4.value;
   console.log(pro.toString());
}

console.warn("INTENTAMOS DESASIGNAR PRODUCCIÓN QUE NO EXISTE");
//Intentamos desasignar una producción que no existe. Da ERROR
try {
    let m5 = new Movie("Viernes 13", "EEUU", new Date("2006/12/05"), "Película de terror", "www.urlimagenviernes.com", new Resource(140, "link1"), [new Coordinate(1120, 6731)]);
    console.log("Número de producciones asignadas a " + d1.name + ": " + vs.deassignDirector(d1, m5));
} catch(error) {
    console.log(error);
}

console.warn("INTENTAMOS DESASIGNAR A DIRECTOR QUE NO EXISTE");
//Intentamos desasignar a un director que no existe. Da ERROR
try {
    let d6 = new Person("Alba", "Pajares", "Jiménez", new Date("1986/05/16"), "rutaimagen");
    console.log("Número de producciones asignadas a " + d1.name + ": " + vs.deassignDirector(d6, m5));
} catch(error) {
    console.log(error);
}



//[Asignar/Desasignar Producciones a Actores] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.warn("ASIGNAR/DESASIGNAR PRODUCCIONES A ACTORES >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

//Le asignamos las producciones m2 y s1 al actor a3
try {
    console.log("Número de producciones asignadas a " + a3.name + ": " + vs.assignActor(a3, m2, s1));
} catch(error) {
    console.log(error);
}

console.warn("PRODUCCIONES DE: " + a3.name + " (actor)")
let generator5 = vs.getProductionsActor(a3);

let next5;
while (!(next5 = generator5.next()).done) {
   let pro = next5.value;
   console.log(pro.toString());
}

console.warn("ASIGNANDO PRODUCCIÓN NO REGISTRADA")
//Intentamos asignarle una producción que no existe. La añade al sistema
try {
    var m5 = new Movie("El Rey Leon", "EEUU", new Date("1992/05/13"), "Pelicula de animación de Disney", "www.urlimagenleon.com", new Resource(145, "link1"), [new Coordinate(1125, 2052)]);
    console.log("Número de producciones asignadas a " + a3.name + ": " + vs.assignActor(a3, m5));
} catch(error) {
    console.log(error);
}

console.warn("TOTAL PRODUCCIONES:")
//Comprobamos que ha añadido la producción al total del sistema
for (let pro of vs.Productions){
    console.log (">>> " + pro);
}

console.warn("PRODUCCIONES DE: " + a3.name + " (actor)")
let generator6 = vs.getProductionsActor(a3);

let next6;
while (!(next6 = generator6.next()).done) {
   let pro = next6.value;
   console.log(pro.toString());
}

console.warn("ASIGNANDO A ACTOR NO REGISTRADO")
//Intentamos asignar a un actor que no existe. Lo añade al sistema
try {
    let a6 = new Person("Pepe", "Garate", "López", new Date("1956/12/16"), "rutaimagen");
    console.log("Número de producciones asignadas a " + a6.name + ": " + vs.assignActor(a6, m1));
} catch(error) {
    console.log(error);
}

console.warn("TOTAL ACTORES")
//Comprobamos que ha añadido el actor
for (let act of vs.Actors){
    console.log (">>> " + act);
}

console.warn("DESASIGNACIÓN DE UNA PRODUCCIÓN A ACTOR");
//Desasignamos una producción a un actor
try {
    console.log("Número de producciones asignadas a " + a3.name + ": " + vs.deassignActor(a3, s1, m2));
} catch(error) {
    console.log(error);
}

console.warn("PRODUCCIONES DE: " + a3.name + " (actor)")
let generator7 = vs.getProductionsActor(a3);

let next7;
while (!(next7 = generator7.next()).done) {
   let pro = next7.value;
   console.log(pro.toString());
}

console.warn("INTENTAMOS DESASIGNAR PRODUCCIÓN QUE NO EXISTE");
//Intentamos desasignar una producción que no existe. Da ERROR
try {
    let m5 = new Movie("Viernes 13", "EEUU", new Date("2006/12/05"), "Película de terror", "www.urlimagenviernes.com", new Resource(140, "link1"), [new Coordinate(2425, 2211)]);
    console.log("Número de producciones asignadas a " + a3.name + ": " + vs.deassignActor(a3, m5));
} catch(error) {
    console.log(error);
}

console.warn("INTENTAMOS DESASIGNAR A UN ACTOR QUE NO EXISTE");
//Intentamos desasignar a un actor que no existe. Da ERROR
try {
    let a6 = new Person("Alba", "Pajares", "Jiménez", new Date("1986/05/16"), "rutaimagen");
    console.log("Número de producciones asignadas a " + a6.name + ": " + vs.deassignDirector(a6, m5));
} catch(error) {
    console.log(error);
}
