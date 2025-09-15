import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { base_url } from "../../constant";
import toast from "react-hot-toast";
import { useState } from "react";

const schema = yup.object().shape({
  productFrontImg: yup.mixed().required("Product front img is required"),
  productBackImg: yup.mixed().required("Product back img is required"),
  productName: yup.string().required("Product name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  productPrice: yup
    .number()
    .typeError("Product price must be a number")
    .positive("Price must be greater than 0")
    .required("Product price is required"),
  offerPrice: yup
    .number()
    .typeError("Offer price must be a number")
    .min(0, "Offer price cannot be negative")
    .required("Offer price is required"),
  stock: yup
    .number()
    .required("Stock is required")
    .typeError("Product price must be a number")
    .positive("Price must be greater than 0"),
});

const Add_Products = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("productPrice", data.productPrice);
    formData.append("offerPrice", data.offerPrice);
    formData.append("stock", data.stock);
    formData.append("front", data.productFrontImg[0]);
    formData.append("back", data.productBackImg[0]);

    try {
      let res = await axios.post(
        `http://localhost:3000/api/admin/add-product`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res) {
        toast.success(res.data.message);
        reset();
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Server error");
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        toast.error("Request failed: " + error.message);
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full p-6 bg-gray-50 rounded-lg relative h-full overflow-y-auto ${loading  ?  "backdrop-blur-2xl" : "backdrop-blur-none"}`}>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add Product</h1>
      {/* {loading && (
        <div className="h-12 w-12 rounded-full border-4 border-white"></div>
      )} */}
      {loading ? (
        //  <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-green-600 animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-100 backdrop-blur-sm z-50">
      <div className="h-14 w-14 rounded-full border-4 border-gray-200 border-t-green-500 animate-spin shadow-[0_0_20px_rgba(34,197,94,0.7)]"></div>
    </div>

      )  :  <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 `}>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Product Front Image
          </label>
          <input
            type="file"
            {...register("productFrontImg")}
            accept="image/*"
            placeholder="Upload here"
            className="w-1/2 border p-2 rounded focus:outline-none focus:border-green-500"
          />
          {errors.productFrontImg && (
            <p className="text-red-500 text-sm mt-1">
              {errors.productFrontImg.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Product Back Image
          </label>
          <input
            type="file"
            {...register("productBackImg")}
            accept="image/*"
            placeholder="Upload here"
            className="w-1/2 border p-2 rounded focus:outline-none focus:border-green-500"
          />
          {errors.productBackImg && (
            <p className="text-red-500 text-sm mt-1">
              {errors.productBackImg.message}
            </p>
          )}
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            {...register("productName")}
            placeholder="Type here"
            className="w-1/2 border p-2 rounded focus:outline-none focus:border-green-500"
          />
          {errors.productName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.productName.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Product Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Type here"
            className="w-1/2 border p-2 rounded focus:outline-none focus:border-green-500"
            rows={2}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            {...register("category")}
            className="w-1/2 border p-2 rounded bg-white focus:outline-none focus:border-green-500"
          >
            <option value="">Select Category</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">Dairy</option>
            <option value="Snacks">Snacks</option>
            <option value="Beverages">Beverages</option>
            <option value="Bakery">Bakery</option>
            <option value="Meat">Meat</option>
            <option value="Seafood">Seafood</option>
            <option value="Frozen">Frozen</option>
            <option value="Instant">Instatnt</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Price & Offer Price */}
        <div className="flex gap-4 w-full">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">
              Product Price
            </label>
            <input
              type="number"
              {...register("productPrice")}
              className="w-full border p-2 rounded focus:outline-none focus:border-green-500"
            />
            {errors.productPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productPrice.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">
              Offer Price
            </label>
            <input
              type="number"
              {...register("offerPrice")}
              className="w-full border p-2 rounded focus:outline-none focus:border-green-500"
            />
            {errors.offerPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.offerPrice.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Stock</label>
          <input
            type="text"
            {...register("stock")}
            placeholder="Type here"
            className="w-1/2 border p-2 rounded focus:outline-none focus:border-green-500"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-green text-white px-16 py-2 rounded hover:bg-green-600 transition mb-6"
        >
          ADD
        </button>
      </form>}

      
    </div>
  );
};

export default Add_Products;
