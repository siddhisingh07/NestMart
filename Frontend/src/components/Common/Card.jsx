import { product_1, product_1_back } from "../../Assets/Assets";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoHeart, IoStar, IoStarSharp } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { base_url } from "../../constant";
import { useNavigate } from "react-router-dom";

export const Card = ({ value }) => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const handleClick = (id, category) => {
    navigate(`/products/${category}/${id}`);
  };

const handleCart = async (productId, price, quantity) => {
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

    const res = await axios.post(`${base_url}/cart/add-cart`, data, {
      withCredentials: true,
    });

    toast.success(res.data.message || "Added to cart!");
    navigate("/cart");
  } catch (error) {
    // Safely handle errors
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        // Redirect only if not logged in
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } else {
      toast.error("Something went wrong, please try again.");
    }
  }
};


  const handleButtonClick = (e, productId, price, quantity = 1) => {
    e.stopPropagation();
    handleCart(productId, price, quantity);
  };
  return (
    <>
      <div
        key={value.idx}
        onClick={() => {
          handleClick(value.item._id, value.item.category);
        }}
        onMouseEnter={() => setHoveredIndex(value.idx)}
        onMouseLeave={() => setHoveredIndex(null)}
        className="w-[19rem] md:w-[18rem] lg:w-[19rem] xl:w-[19rem] 2xl:w-[20rem] bg-white border-gray-200 border rounded-2xl overflow-hidden shadow hover:border hover:border-green hover:shadow-md transition-all hover:scale-[1.01] duration-700 relative"
      >
        <div className="w-full flex items-center justify-start z-50">
          <span
            className="h-10 w-[5rem] inline bg-green overflow-hidden font-light text-center pt-2 text-white"
            style={{ borderBottomRightRadius: "25px" }}
          >
            {value.item.off}%
          </span>
        </div>

        {/* Image Container */}
        <div className="w-full flex items-center justify-center relative h-40 lg:h-56 overflow-hidden">
          {/* Front Image */}
          <img
            src={value.item?.front || product_1}
            alt={value.item?.productName || product_1_back}
            className={`h-28 lg:h-56 absolute top-50% left-50% w-full object-contain transition-all duration-700 ease-in-out ${
              hoveredIndex === value.idx
                ? "opacity-0 scale-105"
                : "opacity-100 scale-100"
            }`}
          />
          {/* Back Image */}
          <img
            src={value.item?.back || product_1_back}
            alt={value.item.productName}
            className={`h-28 lg:h-56 absolute top-50% left-50% w-full object-contain transition-all duration-700 ease-in-out ${
              hoveredIndex === value.idx
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          />

          {/* Hover Action Buttons */}
          <div
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex h-10 w-32 border rounded bg-white text-green overflow-hidden transition-all duration-500 ease-in-out ${
              hoveredIndex === value.idx
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            <div className="h-full w-1/3 border-r border-green flex items-center justify-center cursor-pointer hover:bg-green hover:text-white transition  ">
              <FaRegEye className="text-xl" />
            </div>
            <div className="h-full w-1/3 border-r border-green flex items-center justify-center cursor-pointer hover:bg-green hover:text-white transition">
              <IoHeart className="text-xl" />
            </div>
            <div className="h-full w-1/3 flex items-center justify-center cursor-pointer hover:bg-green hover:text-white transition">
              <IoStar className="text-xl" />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="px-5 pb-6">
          <h4 className="text-gray-400 font-light text-sm mb-1">
            {value.item.category}
          </h4>
          <h2 className="text-xl font-semibold leading-none text-navy">
            {value.item.productName}
          </h2>

          {/* Stars */}
          <div className="mb-2">
            {[...Array(5)].map((_, i) => (
              <IoStarSharp
                key={i}
                className="inline text-yellow-500 text-base"
              />
            ))}
          </div>

          {/* Price & Button */}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-green text-lg font-semibold underline mr-2">
                ${value.item.offerPrice}
              </span>
              <span className="text-gray-400 font-light text-base line-through">
                ${value.item.productPrice}
              </span>
            </div>
            <button
              onClick={(e) =>
                handleButtonClick(e, value.item._id, value.item.offerPrice)
              }
              className="bg-[#def9ec] text-green inline-block py-2 px-4 rounded-md text-base items-center gap-2"
            >
              <AiOutlineShoppingCart className="inline-block" /> Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
