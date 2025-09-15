import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    front : {
      type :String,
      required : true
    },
    back : {
      type : String,
      required : true
    },
    category: {
      type: String,
      required: true,
     enum: [
        "Fruits",
        "Vegetables",
        "Dairy",
        "Snacks",
        "Beverages",
        "Bakery",
        "Meat",
        "Seafood",
        "Frozen",
      ],
    },
    productPrice: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
      required: true,
    },
    description : {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 1,
    },

  },
  {
    timestamps: true,
  }
);



export const Product = mongoose.model('Product', productSchema);
