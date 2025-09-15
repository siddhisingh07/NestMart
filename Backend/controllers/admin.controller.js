import { Product } from '../models/productModel.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/Cloudinary.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';
import path from 'path';

const addProduct = asyncHandler(async (req, res) => {
  let {
    productName,
    category,
    description,
    productPrice,
    offerPrice,
    stock,
    outOfStock,
  } = req.body;

  if (!req.files || !req.files.front || !req.files.back) {
    return res.status(400).json(400, null, "Fields are required")
  }

  let existProduct = await Product.findOne({ productName });
  if (existProduct) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Product already exists"));
  }

  const front = await uploadOnCloudinary(req.files.front[0].path);
  const back = await uploadOnCloudinary(req.files.back[0].path);

  let product = await Product.create({
    productName,
    category,
    productPrice,
    offerPrice,
    stock,
    outOfStock,
    description,
    front: front.secure_url,
    back: back.secure_url,
  });

  res
    .status(200)
    .json(new ApiResponse(200, product, 'Product added successfully!'));
});

let productList = asyncHandler(async (req, res) => {
  let productList = await Product.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, productList, 'Product fetched successfully!'));
});

let removeProduct = asyncHandler(async (req, res) => {
  let { _id } = req.params;
  let removedProduct = await Product.findByIdAndDelete({ _id: _id });

  if (!removedProduct) {
    throw new ErrorHandler(400, 'Product not exist');
  }

  res.status(200).json(new ApiResponse(200, null, 'Product removed!'));
});

const updateProductDetails = asyncHandler(async (req, res) => {
  let { _id } = req.params;
  let product = await Product.findByIdAndUpdate(
    _id,
    { $set: req.body },
    { new: true }
  );
  if (!product) {
    throw new ErrorHandler(400, 'PRODUCT NOT FOUND!!');
  }
  res.status(200).json(new ApiResponse(200, 'Product data updated'));
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token');
  res.json(200, null, 'Logged out');
});

export { addProduct, productList, removeProduct, updateProductDetails, logout };
