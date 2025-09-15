import User from '../models/userModel.js';
import { ErrorHandler } from '../utils/ErrorHandler.js';

export const SingleAdmin = async (req, res, next) => {
  let { userType } = req.body;
  if (userType == 'admin') {
    const existAdmin = await User.findOne({ userType: 'admin' });
    if (existAdmin) {
      return next( new ErrorHandler(400, 'Admin already exist'))
    }
  }
  next();
};
