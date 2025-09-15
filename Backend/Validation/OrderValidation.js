import { body } from "express-validator";

export const orderValidation = [
    body("user")
    .notEmpty()
    .withMessage("User id is required")
    .isLength({ min: 2 })
    .withMessage("Product name must be at least 2 characters"),
  body("product")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["Fruits", "Vegetables", "Dairy"])
    .withMessage("Invalid category"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a positive integer"),
]