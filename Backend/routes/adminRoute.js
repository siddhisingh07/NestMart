import { Router } from 'express';
import { addProduct, logout, productList, removeProduct, updateProductDetails } from '../controllers/admin.controller.js';
import { authenticate } from '../middlewares/Authenticate.js';
import { AuthorizeAdmin } from '../middlewares/AuthorizeAdmin.js';
import { ProductValidation } from '../Validation/ProductValidation.js';
import { validateResult } from '../utils/Validate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

//Add product
router.post(
  '/add-product',
  authenticate,
  AuthorizeAdmin,
  upload.fields(
  [  {name : "front", maxCount : 1},{name : "back", maxCount : 1}]
  ), 
  ProductValidation,
  validateResult,
  addProduct
);

//Get all product list
router.get("/product-list", productList)

//Delete Product
router.delete("/:_id", removeProduct )

//Update Product details
router.put("/:_id", updateProductDetails)

router.get("/logout", logout)

export default router;
