let array = [];
let production = "Cenicienta";
let arrayCasting = [];

array.push(
    {
        Actor: "Vidal",
        Produccion: ["Cenicienta", "Avatar"]
    }
    );
array.push(
    {
        Actor: "Antonio",
        Produccion: ["Avatar", "TLOTR"]
    }
    );
array.push(
    {
        Actor: "Paco",
        Produccion: ["TLOTR", "Random"]
    }
    );

console.log(array);

for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].Produccion.length; j++) {
        if (array[i].Produccion[j] === production) {
            arrayCasting.push(array[i].Actor);
        }
    }
}

console.log(arrayCasting);

