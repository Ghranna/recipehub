import {body} from 'express-validator';

export const validateRecipe = [
    body('title').notEmpty().withMessage('El título es obligatorio.').isLength({min: 3}).withMessage("El título debe tener al menos tres carácteres."),
    body('ingredients').isArray({min: 1}).withMessage('Debes proporcionar al menos un ingrediente.'),
    body('instructions').notEmpty().withMessage('Las instrucciones son obligatorias.')

];