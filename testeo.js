//TESTEO

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
    let s1 = new Serie("The office", "Inglesa", new Date("1994/05/11"), "Una oficina", "LINK", 9)
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
console.warn("CATEGORIES");

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

//Intentamos añadir una categoría NULL. Da ERROR
try {
    vs.addCategory(null);
} catch(error) {
    console.log(error);
}

//Intentamos añadir un objeto que no sea CATEGORY. Da ERROR
try {
    let p1 = new Person("Vidal", "De la Fuente", "", new Date("1994/05/11"), "LINK");
    vs.addCategory(p1);
} catch(error) {
    console.log(error);
}

//Intentamos añadir una category que YA EXISTE. Da ERROR
try {
    vs.addCategory(c1);
} catch(error) {
    console.log(error);
}

//Recorremos todas las categorías con el iterador
for (let category of vs.Categories){
    console.log (">>> " + category);
}

//Intentamos borrar una categoría que no está registrada. Da ERROR
try {
    let c7 = new Category("Prueba", "Prueba");
    vs.removeCategory(c7);
} catch(error) {
    console.log(error);
}

//Borramos unca categoría
try {
    console.log("Número de categorías: " + vs.removeCategory(c1));
} catch(error) {
    console.log(error);
}

for (let category of vs.Categories){
    console.log (">>> " + category);
}

//Volvemos a añadirla para pruebas futuras
console.log("Número de categorías: " + vs.addCategory(c1));

for (let category of vs.Categories){
    console.log (">>> " + category);
}


//[Users] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.warn("USERS");

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

//Los recorremos todos con el iterador
for (let user of vs.Users){
    console.log (">>> " + user);
}

//Le pasamos un objeto que no sea tipo USER. Da ERROR
try {
    vs.addUser(c1);
} catch(error) {
    console.log(error)
}

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

//Intentamos borrar un usuario que no existe. Da ERROR
try {
    let us6 = new User("Alvaro6", "aalvaro6@gmail.com", "33133");
    vs.removeUser(us6);
} catch(error) {
    console.log(error)
}

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

//Volvemos a añadirlo
try {
    console.log("Número de usuarios: " + vs.addUser(us1));
} catch(error) {
    console.log(error)
}


//[Productions] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.warn("PRODUCTIONS");

//Creamos algunas producciones y las añadimos
try {
    var m1 = new Movie("La momia", "Francia", new Date("1994/11/05"), "La momia ataca", "www.urlimagenmomia.com", new Resource(120, "link1"), ["Sevilla, Barcelona, Paris, Londres"]);
    var m2 = new Movie("Star Wars", "EEUU", new Date("1998/05/12"), "En una galaxia muy lejana", "www.urlimagenstarwars.com", new Resource(155, "link1"), ["Sevilla, Nueva York, Berlin"]);
    var m3 = new Movie("Avatar", "EEUU", new Date("2022/07/22"), "Un nuevo planeta", "www.urlimagenavatar.com", new Resource(180, "link1"), ["Sidney"]);
    var m4 = new Movie("El Señor de los Anillos", "EEUU", new Date("2003/01/30"), "La Tierra Media", "www.urlimagenanillos.com", new Resource(175, "link1"), ["Varsovia, Monaco, Berlin"]);
    var s1 = new Serie("Perdidos", "EEUU", new Date("1999/11/05"), "Perdidos en una isla", "www.urlimagenperdidos.com", [new Resource(50, "link1"), new Resource(50, "link2"), new Resource(50, "link3")], ["Sidney"], 9);
    var s2 = new Serie("Los Soprano", "EEUU", new Date("1998/04/04"), "Peleas entre mafias", "www.urlimagensoprano.com", [new Resource(52, "link1"), new Resource(52, "link2"), new Resource(52, "link3")], ["Nueva York"], 7);
    var s3 = new Serie("The Simpson", "EEUU", new Date("1988/05/12"), "Dibujos animados", "www.urlimagensimpson.com", [new Resource(20, "link1"), new Resource(20, "link2"), new Resource(20, "link3")], ["Nueva York"], 30);
    var s4 = new Serie("Breaking Bad", "EEUU", new Date("2008/12/01"), "Cocinar metanfetamina", "www.urlimagenbreaking.com", [new Resource(55, "link1"), new Resource(55, "link2"), new Resource(55, "link3")], ["Nueva York", "Nuevo Mexico"], 5);
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

//Las recorremos todas con el iterador
for (let pro of vs.Productions){
    console.log (">>> " + pro);
}

//Intentamos añadirle algo que no sea tipo PRODUCTION. Da ERROR
try {
    vs.addProduction(c1);
} catch (error) {
    console.log(error);
}

//Intentamos añadir una PRODUCTION repetida. Da ERROR
try {
    vs.addProduction(m1);
} catch (error) {
    console.log(error);
}

//Intentamos borrar una PRODUCTION que no está registrada. Da ERROR
try {
    let m5 = new Movie("Peter Pan", "Francia", new Date("1994/11/05"), "Aventuras en el mundo de nunca jamas", "www.urlimagenpeter.com", new Resource(120, "link1"), ["Londres"]);
    vs.removeProduction(m5);
} catch (error) {
    console.log(error);
}

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

//Volvemos a añadirla
try {
    console.log("Número de producciones: " + vs.addProduction(m1));
} catch(error) {
    console.log(error)
}


//[Actors] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.warn("ACTORS");

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

//Los recorremos todos con el iterador
for (let act of vs.Actors){
    console.log (">>> " + act);
}

//Intentamos añadir algo que no sea tipo PERSON. Da ERROR
try {
    vs.addActor(c1);
} catch(error) {
    console.log(error);
}

//Intentamos añadir un actor ya registrado. Da ERROR
try {
    vs.addActor(a1);
} catch(error) {
    console.log(error);
}

//Intentamos eliminar un actor que no esté registrado. Da ERROR
try {
    let a6 = new Person("Antonio", "Garrido", "Fernández", new Date("1995/12/31"), "rutaimagen");
    vs.removeActor(a6);
} catch(error) {
    console.log(error);
}

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

//Lo volvemos a añadir
try {
    console.log("Número de actores: " + vs.addActor(a1));
} catch(error) {
    console.log(error);
}


//[Directors] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
console.warn("DIRECTORS");

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

//Los recorremos todos con el iterador
for (let dir of vs.Directors){
    console.log (">>> " + dir);
}

//Intentamos añadir algo que no sea tipo PERSON. Da ERROR
try {
    vs.addDirector(c1);
} catch(error) {
    console.log(error);
}

//Intentamos añadir un director ya registrado. Da ERROR
try {
    vs.addDirector(d1);
} catch(error) {
    console.log(error);
}

//Intentamos eliminar un director que no está registrado. Da ERROR
try {
    let d6 = new Person("Fulgencio", "Pérez", "Pérez", new Date("1953/01/14"), "rutaimagen");
    vs.removeDirector(d6);
} catch(error) {
    console.log(error);
}

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

//Lo volvemos a añadir
try {
    console.log("Número de directores: " + vs.addDirector(d1));
} catch(error) {
    console.log(error);
}