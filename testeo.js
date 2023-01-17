//TESTEO

//Comprobación de objetos y estructura
let estu = "Hola";
let estu2 = 5;
console.log(typeof estu);
console.log(typeof estu2);
console.log(typeof estu != "string");
console.log(typeof estu2 == "number");
let p1 = new Person("Vidal", "De la Fuente", "Muñoz", new Date("1994/05/11"), "LINK");
console.log(p1.toString());
let c1 = new Category("Categoria1", "Esta es la categoria 1");
console.log(c1.toString());
let r1 = new Resource(130, "LINK");
console.log(r1.toString());
let m1 = new Movie("El padrino", "Inglesa", new Date("1994/05/11"), "El padrino hace tal", "LINK", "AQUI");
console.log(m1.toString());
let s1 = new Serie("The office", "Inglesa", new Date("1994/05/11"), "Una oficina", "LINK", 9)
console.log(s1.toString());
let u1 = new User("Paquito", "invent@gmail.com", "12345");
console.log(u1.toString());
let cd1 = new Coordinate(2521, 2536);
console.log(cd1.toString());
console.log("HOLAA");