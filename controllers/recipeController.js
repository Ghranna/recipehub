import Recipe from '../models/Recipe.js'

// Get All recipes
export const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    }catch (err) {
        res.status(500).json({ error: 'Error al obtener recetas.'});
    }
};

export const createRecipe = async (req, res) => {
    try{
        const {title, ingredients, instructions} = req.body;
        const newRecipe = new Recipe({ title, ingredients, instructions });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (err){
        res.status(400).json({error: 'Error al crear la recerta'});
    }
};

export const createManyRecipes = async (req, res) => {
    const { recipes } = req.body;

    if(!Array.isArray(recipes) || recipes.length == 0){
        return res.status(400).json({error: "Debe enviar un arreglo de recetas."});
    }

    try{
        const result = await Recipe.insertMany(recipes, {ordered: false});
        res.status(201).json({inserted: result.length, data: result});
    } catch(error){
        res.status(400).json({error: "Algunas recetas fallaron", detalles: error.writeErrors});
    }
}