import { product_1 } from "../../../Assets/Assets";
import { IoStarSharp } from "react-icons/io5";
import RelatedProducts from "./RelatedProducts";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { base_url } from "../../../constant";

const Product = () => {
  const { id, category } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const handleData = async () => {
    let res = await axios.get(
      `http://localhost:3000/api/users/category/${category}/${id}`
    );
    setProduct(res.data.data);
  };

  const handleCart = async (productId, price, quantity = 1) => {
    try {
      const data = {
        items: [
          {
            product: productId,
            quantity: quantity,
            price: price,
          },
        ],
      };
      console.log(productId, price, quantity);
      const res = await axios.post(`${base_url}/cart/add-cart`, data, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      navigate("/cart");
    } catch (error) {
      if (!error.response.data.success) {
        toast.error("Please Login First");
        navigate("/login");
      }
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleData();
  }, [id, category]);

  return (
    <>
      {product == null ? (
        <h1>Deatils can't fetched</h1>
      ) : (
        <div className="flex px-4 md:px-10 lg:px-28 py-16 gap-8 sm:flex-col lg:flex-row">
          <div className="w-1/3 sm:w-full border flex pt-10 justify-center lg:w-1/3">
            <img src={product.front} alt="" className="h-96 w-96 sm:w-80 sm:h-80" />
          </div>
          <div className="w-2/3 sm:w-full lg:w-2/3 py-3">
            <span className="px-4 py-1 bg-light_green text-green rounded">
              Sale!
            </span>
            <h1 className="text-navy text-4xl font-semibold w-2/3 mt-4">
              {product.productName}
            </h1>
            <div className="my-3">
              {[...Array(5)].map((_, idx) => (
                <IoStarSharp
                  key={idx}
                  className="inline text-yellow-500 text-base"
                />
              ))}
            </div>
            <h1 className="text-base line-through text-gray-400 font-light ">
              MRP: ${product.productPrice}
            </h1>
            <h1 className="text-xl ">
              MRP: $<span className="underline">{product.offerPrice}</span>
            </h1>
            <span className="text-gray-400 text-base font-light">
              (inclusive of all taxes)
            </span>

            <p className="w-2/3 sm:w-full text-gray-500  font-normal">
              {product.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione laboriosam iure consequatur reiciendis earum necessitatibus, dolorem deserunt tempora enim animi culpa consequuntur quidem molestiae esse repellendus expedita sunt ipsa officiis.
            </p>
            <span className="text-yellow-500 font-light">
              {product.stock} in stock
            </span>
            <div className="w-full flex gap-2 ">
              <button
                className="text-green flex items-center justify-center bg-light_green py-4 w-1/4  lg:py-3  rounded-sm text-base mt-5"
                onClick={() => {
                  handleCart(product._id, product.offerPrice, product.quantity);
                }}
              >
                Add to cart
              </button>
              <button
                className="text-gray-50 flex items-center justify-center bg-green py-4 w-1/4 lg:py-3  rounded-sm text-base mt-5"
                onClick={() => {
                  handleCart(product._id, product.offerPrice, product.quantity);
                }}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      )}
      <RelatedProducts value={category} />
    </>
  );
};

export default Product;
