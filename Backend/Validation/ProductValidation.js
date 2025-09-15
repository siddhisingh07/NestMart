import { body } from 'express-validator';

export const ProductValidation = [
  body('productName')
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2 })
    .withMessage('Product name must be at least 2 characters'),
  body('description')
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ min: 10 })
    .withMessage('Product description must be at least 10 characters'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn([  "Fruits",
        "Vegetables",
        "Dairy",
        "Snacks",
        "Beverages",
        "Bakery",
        "Meat",
        "Seafood",
        "Frozen",])
    .withMessage('Invalid category'),
  body('productPrice')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number'),
  body('productPrice')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number'),
  body('stock')
    .notEmpty()
    .withMessage('Stock is required')
    .isInt({ min: 0 })
    .withMessage('Stock must be a positive integer'),
];
