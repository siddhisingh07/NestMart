import express, {Router} from 'express'
import { addCart, cart_list, quantityUpdate, remove } from '../controllers/cart.controllers.js';
import { authenticate } from '../middlewares/Authenticate.js';

const router = Router();

router.post("/add-cart", authenticate, addCart)
router.get("/", authenticate, cart_list)

router.put("/:productId", authenticate, quantityUpdate )

router.delete("/remove/:productId", authenticate, remove);


export default router