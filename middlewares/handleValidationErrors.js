import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return req.res.status(400).json({ errores: errors.array()});
    }

    next();
};