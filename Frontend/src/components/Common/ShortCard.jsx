import React from 'react'
import { product_1, product_1_back } from "../../Assets/Assets";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoHeart, IoStar, IoStarSharp } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
const ShortCard = ({value}) => {

    const navigate = useNavigate()

    const handleClick = (id, category) => {
    navigate(`/products/${category}/${id}`);
  };
  console.log(value)
  return (
     <div className=" flex justify-between items-center shadow-sm mb-2 hover:-translate-y-1 duration-500 transition-transform" onClick={()=>handleClick(value.product._id, value.product.category)}>
                <div className="w-1/3 ">
                  <img src={value.product.front} alt="" className="h-20 object-cover  " />
                </div>
                <div className="w-2/3  p-2 pt-4">
                  <h2 className="text-lg font-semibold leading-none text-navy ">
                    {value.product.productName}
                  </h2>
                  <div>
                    <IoStarSharp className="inline text-yellow-500 text-base" />
                    <IoStarSharp className="inline text-yellow-500 text-base" />
                    <IoStarSharp className="inline text-yellow-500 text-base" />
                    <IoStarSharp className="inline text-yellow-500 text-base" />
                    <IoStarSharp className="inline text-yellow-500 text-base" />
                  </div>
                  <div className="mt-2">
                    <span className="text-green text-base font-semibold underline mr-2">
                      ${value.product.offerPrice}
                    </span>
                    <span className="text-gray-400 font-light text-sm stroke-slate-800 line-through">
                      ${value.product.productPrice}
                    </span>
                  </div>
                </div>
              </div>
  )
}

export default ShortCard