import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';

export const authenticate = async (req, res, next) => {
  const token = req.cookies?.token ;//|| req.headers.authorization.split(' ')[1]
  console.log(token);
  if (!token) {
    throw new ErrorHandler(401, 'Unauthorized Access');
  }
  let decoded = jwt.verify(token, process.env.SECRET_KEY);
  console.log(decoded);
  let user = await User.findOne({ _id: decoded._id }).select("-password");
  if (!user) {
    throw new ErrorHandler(401, 'Unauthorized Access user not found');
  }
  req.user = user;
  next();
};
