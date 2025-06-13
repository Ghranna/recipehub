import express from 'express';
import {getAllRecipes, createRecipe} from '../controllers/recipeController.js'
import { createManyRecipes } from '../controllers/recipeController.js';

const router = express.Router();

//Get method for all recipes
router.get('/', getAllRecipes);

//Post method (create a new recipe)
router.post('/', createRecipe);

router.post(`/bulk`, createManyRecipes)

export default router;