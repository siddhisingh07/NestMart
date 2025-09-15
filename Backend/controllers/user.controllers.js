import User from '../models/userModel.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Product } from '../models/productModel.js';
import { Order } from '../models/orderModel.js';

const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ErrorHandler(400, 'Validation Error ', [errors.array()]);
  }

  let { name, email, password, userType } = req.body;

  const isExist = await User.findOne({ email });
  if (isExist) {
    throw new ErrorHandler(400, 'Email  already exist');
  }

  const hashedPass = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPass,
    userType: userType || 'user',
  });
  return res
    .status(200)
    .json(new ApiResponse(200, user, 'User created successfully'));
});

const login = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ErrorHandler(400, 'Valiadation Error', [errors.array()]);
  }

  let { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    throw new ErrorHandler(400, 'Email or password is incorrect');
  }

  let isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    throw new ErrorHandler(400, 'Email or password is incorrect');
  }

  let token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '6h',
  });

  res.cookie('token', token, { httpOnly: true, secure: false });

  let userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    userType: user.userType,
  };
  let data = { userData, token };
  res.status(200).json(new ApiResponse(200, data, 'Successfully login!'));
};

const dashboard = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.user));
});

let productList = asyncHandler(async (req, res) => {
  let productList = await Product.find({}).sort({ createdAt: -1 });
  return res
    .status(200)
    .json(new ApiResponse(200, productList, 'Product fetched successfully!'));
});

let bestSellers = asyncHandler(async (req, res) => {
  let productList = await Product.find({}).limit(7);
  return res
    .status(200)
    .json(new ApiResponse(200, productList, 'Product fetched successfully!'));
});

//Categories List

let categoryList = asyncHandler(async (req, res) => {
  let data = [];
  let categoryList = await Product.schema.path('category').enumValues;

  for (const category of categoryList) {
    let items = await Product.countDocuments({ category });
    data.push({ items, category });
  }
  return res
    .status(200)
    .json(new ApiResponse(200, data, 'Categories fetched successfully'));
});

let categorizedProductList = asyncHandler(async (req, res) => {
  let { categoryName } = req.params;
  let data = await Product.find({ category: categoryName });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        data,
        'Categorized product list is fetched successfully'
      )
    );
});

const productDetails = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let data = await Product.findById({ _id: id });
  return res
    .status(200)
    .json(new ApiResponse(200, data, 'Data fetched successfully'));
});

const topSelling = asyncHandler(async (req, res) => {
  let orders = await Order.find().populate('orderItems.product');

  console.log(orders)
  let salesCount = {};
  orders.forEach((order) => {
    order.orderItems.forEach((item) => {
      const productId = item.product._id.toString();
      if (salesCount[productId]) {
        salesCount[productId] += item.quantity;
      } else {
        salesCount[productId] = item.quantity;
      }
    });
  });
  const salesArray = Object.entries(salesCount);
  salesArray.sort((a, b) => b[1] - a[1]);

  let topProducts = salesArray.slice(0, 3);
  const topSelling = [];
  for (const [productId] of topProducts) {
    const product = await Product.findById(productId);
    topSelling.push(product);
  }
  res.status(200).json(new ApiResponse(200, topSelling, 'Done'));
});

const recentlyAdded = asyncHandler(async (req, res) => {
  let products = await Product.find().sort({ _id: -1 }).limit(3);
  res.status(200).json(new ApiResponse(200, products, 'Data fetched'));
});

const bestdeals = asyncHandler(async (req, res) => {
  let offerProduct = await Product.find();
  let arr = [];
  offerProduct.forEach((elm) => {
    const discount = elm.productPrice - elm.offerPrice;
    arr.push({ productId: elm._id.toString(), discount: discount });
  });
  arr.sort((a, b) => b.discount - a.discount);
  let finalProduct = arr.slice(0, 3);
  let newArr = [];
  for (const item of finalProduct) {
    const product = await Product.findById({ _id: item.productId });
    newArr.push({ product });
  }
  res.status(200).json(new ApiResponse(200, newArr, 'Product fetched'));
});

const me = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.user, 'Done'));
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

const search = asyncHandler(async (req, res) => {
  const query = req.query.q || '';

  const data = await Product.find({
    productName: { $regex: query, $options: 'i' },
  }).limit(5);
  res.status(200).json(new ApiResponse(200, data));
});

export {
  register,
  login,
  dashboard,
  productList,
  categoryList,
  categorizedProductList,
  productDetails,
  topSelling,
  recentlyAdded,
  bestdeals,
  me,
  logout,
  search,
  bestSellers,
};
