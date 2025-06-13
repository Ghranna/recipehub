import fetch from 'node-fetch';
import fs from 'fs/promises';
import dotenv from 'dotenv';
dotenv.config();

const API_ENDPOINT = 'http://localhost:3000/api/recipes/bulk';

const importRecipes = async () => {
    try {
        const data = await fs.readFile(`./recipes.json`, `utf-8`);
        const recipesData = JSON.parse(data);

        if(!recipesData.recipes || !Array.isArray(recipesData.recipes)){
            throw new Error("Formato incorrecto. Se esperaba un campo 'recipes con un arreglo de recetas");
        }

        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(recipesData)
        });

        const result = await response.json();

        if(response.ok){
            console.log(`Se insertaron ${result.inserted} recetas con éxito.`);
        } else {
            console.error(`Error al insertar recetas:`, result);
        }
    } catch (error){
        console.error('Error en importanción:', error.message);
    }
};

importRecipes();