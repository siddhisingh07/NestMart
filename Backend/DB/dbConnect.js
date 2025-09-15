import mongoose from 'mongoose';
import { database_url } from '../src/constant.js';

const connectDb = async () => {
  try {
    //Local
    // const connection = await mongoose.connect(
    //   `mongodb://localhost:27017/${databaseName}`
    // );
    //PRODUCTION 

    const connection = await mongoose.connect(process.env.DATABASE_URI);
    console.log(database_url)
    if (connection) {
      console.log('Database connected successfully');
    } else {
      console.log('Database connection failed!');
    }
  } catch (error) {
    console.error(error, 'Database connection failed!');
  }
};

export default connectDb;
