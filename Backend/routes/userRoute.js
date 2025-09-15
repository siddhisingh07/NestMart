import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import {
  bestdeals,
  bestSellers,
  categorizedProductList,
  categoryList,
  dashboard,
  login,
  logout,
  me,
  productDetails,
  productList,
  recentlyAdded,
  register,
  search,
  topSelling,
} from '../controllers/user.controllers.js';
import { authenticate } from '../middlewares/Authenticate.js';
import { SingleAdmin } from '../middlewares/AllowSingleAdmin.js';

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email should be valid'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be at least 6 character'),
  ],
  SingleAdmin,
  register
);

router.post(
  '/login',
  [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email should be valid'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

router.get('/dashboard', authenticate, dashboard);

router.get('/products', productList);

router.get('/best-sellers', bestSellers);

router.get('/category', categoryList);

router.get('/category/:categoryName', categorizedProductList);

router.get('/category/:categoryName/:id', productDetails);

router.get('/top-selling', topSelling);

router.get('/recently-added', recentlyAdded);

router.get('/best-deals', bestdeals);

router.get("/me", authenticate,  me)

router.get("/logout", authenticate, logout)

router.get("/search", search)

export default router;
