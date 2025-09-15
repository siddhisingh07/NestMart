import React, { useEffect, useState } from "react";
import { product_1 } from "../../Assets/Assets";
import { base_url } from "../../constant";
import toast from "react-hot-toast";
import axios from "axios";

const Product_list = () => {
  const [productList, setProductList] = useState(null);

  const handleData = async () => {
    try {
      let res = await axios.get(`${base_url}/admin/product-list`);

      if (res) {
        setProductList(res.data.data);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="w-full mx-auto p-6 bg-white  rounded-lg ">
      <h2 className="text-lg font-semibold mb-4">All Product</h2>
      <div className="overflow-y-auto max-h-[80vh]">
        <table className="w-full overflow-y-auto overflow-x-hidden">
          <thead>
            <tr className="text-left border-b">
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Selling Price</th>
              <th className="py-3 px-4">In Stock</th>
            </tr>
          </thead>
          <tbody>
            {productList == null ? (
              <tr>
                <td>Empty</td>
              </tr>
            ) : (
              productList.map((product) => (
                <tr key={product?.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={product?.front}
                      alt={product?.productName}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <span>{product.productName}</span>
                  </td>
                  <td className="py-3 px-4">{product?.category}</td>
                  <td className="py-3 px-4">${product?.offerPrice}</td>
                  <td className="py-3 px-4">
                    <button
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                        product.inStock ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                          product.inStock ? "translate-x-6" : "translate-x-0"
                        }`}
                      ></span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Product_list;
