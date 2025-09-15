import { Cart } from '../models/cartmodel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';
import mongoose from 'mongoose';

const addCart = asyncHandler(async (req, res) => {
  const { items } = req.body;

  let cart = await Cart.findOne({ userId: req.user._id });
  console.log(cart);

  if (!cart) {
    cart = new Cart({
      userId: req.user._id,
      items,
      totalPrice: items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    });
  } else {
    for (const item of items) {
      const index = cart.items.findIndex(
        (i) => i.product.toString() === item.product
      );
      if (index > -1) {
        cart.items[index].quantity += parseInt(item.quantity);
      } else {
        cart.items.push(item);
      }
    }
    cart.totalPrice = cart.items.reduce(
      (acc, i) => acc + i.price * i.quantity,
      0
    );
  }

  await cart.save();

  res.status(200).json({ message: 'Cart updated!', cart });
});

const cart_list = asyncHandler(async (req, res) => {
  let userId = req.user.id;
  let cart = await Cart.findOne({ userId }).populate('items.product');
  res.status(200).json(new ApiResponse(200, cart, 'Cart data fetched'));
});

const quantityUpdate = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  let cart = await Cart.findOne({ userId: req.user._id });

  let idx = cart.items.findIndex((item) => item.product == productId);
  if (idx > -1) {
    cart.items[idx].quantity = quantity;
    await cart.save();
    res.status(200).json(new ApiResponse(200, cart, 'Cart Updated'));
  } else {
    res
      .status(200)
      .json(new ApiResponse(200, cart, 'Product is not found in cart'));
  }
});

const remove = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;
  console.log(productId)

 let cart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { product: new mongoose.Types.ObjectId(productId) } } },
    { new: true }
  );

  if (!cart) {
    throw new ErrorHandler(404, 'Cart not found for this user');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cart, 'Product removed successfully'));
});


export { addCart, cart_list, quantityUpdate, remove };
