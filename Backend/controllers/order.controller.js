import { Order } from '../models/orderModel.js';
import { Cart } from '../models/cartmodel.js';
import { Product } from '../models/productModel.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';

const createOrder = asyncHandler(async (req, res) => {
  let { orderItems, totalAmount, shippingAddress } = req.body;
  let user = req.user._id;

  // check stock
  for (let elm of orderItems) {
    let product = await Product.findById(elm.product);
    if (!product) {
      throw new ErrorHandler(400, "Product does not exist");
    }
    if (product.stock < elm.quantity) {
      throw new ErrorHandler(
        400,
        `Not enough stock for product ${product.productName}`
      );
    }
  }

  // create order
  let order = await Order.create({
    user,
    orderItems,
    totalAmount,
    shippingAddress,
  });

  if (!order) {
    throw new ErrorHandler(400, "Order failed");
  }

  // decrease stock
  for (let elm of orderItems) {
    await Product.findByIdAndUpdate(elm.product, {
      $inc: { stock: -elm.quantity },
    });
  }

  // clear user's cart
  await Cart.deleteMany({ userId: req.user._id });

  res
    .status(200)
    .json(new ApiResponse(200, order, "Product is ordered and cart cleared!"));
});


const userOrders = asyncHandler(async (req, res) => {
    let  _id = req.user._id;
    let allOrders = await Order.find({ user: _id }).populate("orderItems.product");
    if (!allOrders) {
        throw new ErrorHandler(400, "failed to fetch all orders")
    }
    res.status(200).json(new ApiResponse(200, allOrders))
});

const  adminOrders  = asyncHandler(async(req,res)=>{
    const allOrders = await Order.find({}).populate("user").populate("orderItems.product");
    if (!allOrders) {
        throw new ErrorHandler(400, "Failed to fetch all user orders")
    }
    res.status(200).json(new ApiResponse(200, allOrders))
}) 

export { createOrder, userOrders, adminOrders };
