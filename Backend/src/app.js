import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from '../routes/userRoute.js';
import cartRouter from '../routes/cartRoutes.js'
import adminRouter from '../routes/adminRoute.js';
import orderRouter from '../routes/orderRoutes.js'
import { ErrorHandler } from '../utils/ErrorHandler.js';

const app = express();

app.use(express());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
// app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);


app.use((req, res, next) => {
  next(new ErrorHandler(404, 'Route not found'));
});

app.use((err, req, res, next) => {
  let status = err.statusCode || 500;
  res
    .status(status)
    .json(
      err.toJSON
        ? err.toJSON()
        : {
            success: false,
            message: err.message || 'Something went wrong',
            errors: [],
            data: null,
          }
    );
});

export default app;
