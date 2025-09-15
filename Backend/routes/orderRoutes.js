import express from 'express'
import { adminOrders, createOrder, userOrders } from '../controllers/order.controller.js';
import { authenticate } from '../middlewares/Authenticate.js';
import { AuthorizeAdmin } from '../middlewares/AuthorizeAdmin.js';

const router = express.Router();

//for user
router.post("/", authenticate, createOrder)
router.get("/my-orders", authenticate, userOrders )

//for admin
router.get("/all-order", authenticate, AuthorizeAdmin, adminOrders)




export default router