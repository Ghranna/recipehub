import express from 'express';
import { getAllRecipes, createRecipe, createManyRecipes } from '../controllers/recipeController.js';
import { validateRecipe } from '../controllers/recipeValidator.js';
import { validationResult } from 'express-validator';

const router = express.Router();

// GET todas las recetas
router.get('/', getAllRecipes);

// POST una receta (con validación)
router.post(
  '/',
  validateRecipe,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next(); // si todo está OK, continúa con createRecipe
  },
  createRecipe
);

// POST muchas recetas (por ahora sin validación individual)
router.post('/bulk', createManyRecipes);

export default router;