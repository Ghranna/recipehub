import Recipe from '../models/Recipe.js'

// Get All recipes
export const getAllRecipes = async (req, res) => {
    const { title, ingredient, ingredients, mustHave, sort, limit } = req.query;
    
    const orfilters = [];
    const andFilters = [];

    // OR Filters
    if(title){
        orfilters.push({ title: { $regex: title, $options: 'i' } });
    }

    if(ingredient){
        orfilters.push({ ingredients: { $regex: ingredient, $options: 'i' } });
    }

    if(ingredients){
        const terms = ingredients.split(',').map(term => term.trim());
        for (const ing of terms){
            orfilters.push({ ingredients: { $regex: ing, $options: 'i' } });
        }
    }

    // AND Filters

    if( mustHave){
        const terms = mustHave.split(',').map(term => term.trim());
        for (const ing of terms){
            andFilters.push({ ingredients: {$regex: ing, $options: 'i' } });
        }
    }

    let filter = {};

    if(andFilters.length > 0 && orfilters.length > 0){
        filter = { $and: [{ $or: orfilters}, {$and: andFilters}] };
    } else if (andFilters.length > 0){
        filter = { $and: andFilters };
    } else if (orfilters.length > 0){
        filter = { $or: orfilters };
    }

    // Sort Options

    let sortOption = {};
    if (sort === 'title_asc'){
        sortOption = { title: 1 };
    } else if (sort === 'title_desc'){
        sortOption = { title: -1 };
    }

    // Quantity of records

    const max = !isNaN(parseInt(limit)) ? parseInt(limit) : 0;

    try {
        const recipes = await Recipe.find(filter)
        .sort(sortOption)
        .limit(max);
        res.json(recipes);
    }catch (err) {
        console.error('[Error en QUERY]', err.message);
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
};

export const getRecipeById = async (req, res) => {
    const {id} = req.params;

    try{
        const recipe = await Recipe.findById(id);

        if(!recipe){
            return res.status(404).json({ error: 'Receta no encontrada.'});
        }
        res.json(recipe);
    } catch (err){
        res.status(400).json({ error: 'ID inválido o error al buscar la receta'});
    }
};

export const updateRecipe = async (req, res) => {
    const {id} = req.params;
    const {title, ingredients, instructions} = req.body;

    try{
        const updated = await Recipe.findByIdAndUpdate(
            id,
            {title, ingredients, instructions},
            {new: true, runValidators: true}
        );
        if(!updated){
            return res.status(404).json({ error: 'Receta no encontrada.'});
        }

        res.json(updated);
    } catch (err) {
        if(err.name === 'CastError'){
            return res.status(400).json({ error: 'ID inválido.'});
        }
        res.status(500).json({ error: 'Error al actualizar la receta.'});
    }
};

export const deleteRecipe = async (req, res) => {
    const {id} = req.params;

    try{
        const deleted = await Recipe.findByIdAndDelete(id);
        
        if(!deleted){
            return res.status(404).json({ error: 'Receta no encontrada'});
        }

        res.json({ message: 'Receta eliminada correctamente.', deleted});
    } catch (err){
        if( err.name === 'CastError'){
            return res.status(400).json({ error: 'ID inválido.'});
        }
        res.status(500).json({ error: 'Error interno al eliminar la receta.'});
    }
};


const normalize = (text) => 
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export const deleteRecipeByTitle = async (req, res) => {
    const { title } = req.params;
    const normalizedTitle = normalize(title);

    try {
        const allRecipes = await Recipe.find();
        const match = allRecipes.find(r => normalize(r.title) === normalizedTitle);
        if(!match){
            return res.status(404).json({ error: 'Receta no encontrada con ese título.'});
        }
        const deleted = await Recipe.findByIdAndDelete(match._id);
        res.json({ message: 'Receta eliminada con éxito', deleted});

    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la receta.'});
    }
};