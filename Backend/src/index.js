import dotenv from 'dotenv';

dotenv.config({path : "./.env"});
import app from './app.js';
import connectDb from '../DB/dbConnect.js';

connectDb();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
