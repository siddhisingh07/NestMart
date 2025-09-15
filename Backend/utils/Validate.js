import { validationResult } from "express-validator";
import { ErrorHandler } from "./ErrorHandler.js";

export const validateResult = async(req, res, next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors)
        return next(new ErrorHandler(400, "Validation Err", errors.array()))
    }
    next()
}