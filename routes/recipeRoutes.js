import express from 'express';
import { getAllRecipes, createRecipe, createManyRecipes, getRecipeById,
         updateRecipe, deleteRecipe, deleteRecipeByTitle } from '../controllers/recipeController.js';
import { validateRecipe, validateBulkRecipes } from '../controllers/recipeValidator.js';
import { handleValidationErrors } from '../middlewares/handleValidationErrors.js';

const router = express.Router();

// GET todas las recetas
router.get('/', getAllRecipes);

// POST una receta
router.post('/', validateRecipe, handleValidationErrors, createRecipe);

// POST varias recetas (bulk)
router.post('/bulk', validateBulkRecipes, handleValidationErrors, createManyRecipes);

// GET receta por id
router.get('/:id', getRecipeById);

// PUT Actualizar una receta por id
router.put('/:id', validateRecipe, handleValidationErrors, updateRecipe);

//DELETE eliminar receta por nombre flexible caption
router.delete('/by-title/:title', deleteRecipeByTitle);

// DELETE eliminar receta por id
router.delete('/:id', deleteRecipe);


export default router;