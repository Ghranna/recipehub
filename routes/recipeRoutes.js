import express from 'express';
import { getAllRecipes, createRecipe, createManyRecipes } from '../controllers/recipeController.js';
import { validateSingleRecipe, validateBulkRecipes } from '../validators/recipeValidator.js';
import { validationResult } from 'express-validator';

const router = express.Router();

// Middleware para validar y manejar errores de validación
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errores: errors.array() });
  }
  next();
};

// Obtener todas las recetas
router.get('/', getAllRecipes);

// Crear una receta individual con validación
router.post('/', validateSingleRecipe, handleValidation, createRecipe);

// Crear recetas en lote con validación
router.post('/bulk', validateBulkRecipes, handleValidation, createManyRecipes);

export default router;