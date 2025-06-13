import fetch from 'node-fetch';

const recipes = [
    {
        title: "Sopa de lentejas",
        ingredients: ["lentejas", "zanahoría", "cebolla", "ajo", "aceite"],
        instructions: "Remoje las lentejas, cocina con verduras por 30 minutos y sirve caliente."
    },
    {
        title: "Ensalada de quinoa",
        ingredients: ["quinoa", "pimiento", "pepino", "limón", "sal", "aceite de oliva"],
        instructions: "Cocina la quinoa, enfría y mezcla con el resto de los ingredientes picados."
    },
    {
        title: "Tortilla de espinaca",
        ingredients: ["huevo", "espinaca", "sal", "pimienta", "queso rallado"],
        instructions: "Bate los huevos, mezcla todo y cocina en sartén."
    }
];

const insertarRecetas = async () => {
    for (let receta of recipes){
        try{
            const response = await fetch('http://localhost:3000/api/recipes',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(receta)
            });

            const data = await response.json();
            console.log('Receta insertada exitosamente: ${receta.title}');
        }
        catch (err){
            console.error('Error al insertar receta: ${receta.title}', err.message)
        }
    };
}


    insertarRecetas();