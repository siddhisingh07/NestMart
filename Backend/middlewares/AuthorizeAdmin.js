import { asyncHandler } from "../utils/asyncHandler.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export const AuthorizeAdmin=asyncHandler(async(req, res, next)=>{
    if (req.user.userType !== "admin") {
        return next(new ErrorHandler(401, "Access denied: Admins only"))
    }
    next();
})