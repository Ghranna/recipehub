import {body} from 'express-validator';

export const validateRecipe = [
    body('title').notEmpty().withMessage('El título es obligatorio.').isLength({min: 3}).withMessage("El título debe tener al menos tres carácteres."),
    body('ingredients').isArray({min: 1}).withMessage('Debes proporcionar al menos un ingrediente.'),
    body('instructions').notEmpty().withMessage('Las instrucciones son obligatorias.')

];

export const validateBulkRecipes = [
  body('recipes')
    .isArray({ min: 1 }).withMessage('Se requiere un arreglo de recetas con al menos una entrada.'),
  body('recipes.*.title')
    .notEmpty().withMessage('Cada receta debe tener un título.')
    .isLength({ min: 3 }).withMessage('Cada título debe tener al menos 3 caracteres.'),
  body('recipes.*.ingredients')
    .isArray({ min: 1 }).withMessage('Cada receta debe tener al menos un ingrediente.'),
  body('recipes.*.instructions')
    .notEmpty().withMessage('Cada receta debe tener instrucciones.')
];