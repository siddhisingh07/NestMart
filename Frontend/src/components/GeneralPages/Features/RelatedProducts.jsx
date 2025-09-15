import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoHeart, IoStar, IoStarSharp } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa6";
import { product_1, product_1_back } from "../../../Assets/Assets";
import Heading from "../../Common/Heading";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "../../Common/Card";
import { HeadingClass } from "../../PropsClass";

const RelatedProducts = (value) => {
  const [productData, setProductData] = useState(null);
  const [product, setProduct] = useState(null);
  const [onHover, setOnHover] = useState(false);
  const { id, category } = useParams();
  const navigate = useNavigate();

  //Product details
  const handleData = async () => {
    let res = await axios.get(
      `http://localhost:3000/api/users/category/${value.value}`
    );
    console.log(`http://localhost:3000/api/users/category/${value.value}`);
    setProductData(res.data.data);
    console.log(value.value);
  };

  useEffect(() => {
    handleData();
  }, [value]);

  //related product data
  const handleProductData = async () => {
    let res = await axios.get(
      `http://localhost:3000/api/users/category/${category}/${id}`
    );
    setProduct(res.data.data);
  };

  useEffect(() => {
    handleData();
    handleProductData();
  }, [id, category]);

  //navigate to product details of related products
  const handleClick = (id) => {
    navigate(`/products/${category}/${id}`);
  };

  return (
    <div className="w-full px-3 md:px-10 lg:px-28 py-4">
      <Heading
        value = {new HeadingClass("Related Products", "start")}  
      />

      <div className="flex gap-4 flex-wrap py-3">
        {productData == null ? (
          <h1>Empty</h1>
        ) : (
          productData.map((item, idx) => {
              let off =
              ((item.productPrice - item.offerPrice) / item.productPrice) * 100;
            off = Math.abs(Math.round(off));

            item.off = off;
            return (
              <Card value={{item, idx}}/>
            );
          })
        )
        }
      </div>
    </div>
    // <div
    //   key={idx}
    //   onMouseEnter={() => setOnHover(true)}
    //   onMouseLeave={() => setOnHover(false)}
    //   onClick={() => handleClick(item._id)}
    //   className="w-[19rem] bg-white border-gray-200 border rounded-2xl overflow-hidden shadow hover:border hover:border-green hover:shadow-md transition-all hover:scale-[1.01] duration-700 relative mb-4"
    // >
    //   {/* Discount Badge */}
    //   <div className="w-full flex items-center justify-start z-50">
    //     <span
    //       className="h-10 w-[5rem] inline bg-green overflow-hidden font-light text-center pt-2 text-white"
    //       style={{ borderBottomRightRadius: "25px" }}
    //     >
    //       {item.off}%
    //     </span>
    //   </div>

    //   {/* Image Container */}
    //   <div className="w-full flex items-center justify-center relative h-40 lg:h-56 overflow-hidden">
    //     {/* Front Image */}
    //     <img
    //       src={item.front_img || product_1}
    //       alt={item.productName}
    //       className={`h-28 lg:h-56 absolute top-50% left-50% w-full object-contain transition-all duration-700 ease-in-out ${
    //         onHover ? "opacity-0 scale-105" : "opacity-100 scale-100"
    //       }`}
    //     />
    //     {/* Back Image */}
    //     <img
    //       src={item.back_img || product_1_back}
    //       alt={item.productName}
    //       className={` h-28 lg:h-56 absolute top-50% left-50% w-full object-contain transition-all duration-700 ease-in-out ${
    //         onHover ? "opacity-100 scale-100" : "opacity-0 scale-95"
    //       }`}
    //     />

    //     {/* Hover Action Buttons */}
    //     <div
    //       className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex h-10 w-32 border rounded bg-white text-green overflow-hidden transition-all duration-500 ease-in-out ${
    //         onHover ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    //       }`}
    //     >
    //       <div className="h-full w-1/3 border-r border-green flex items-center justify-center cursor-pointer hover:bg-green hover:text-white transition">
    //         <FaRegEye className="text-xl" />
    //       </div>
    //       <div className="h-full w-1/3 border-r border-green flex items-center justify-center cursor-pointer hover:bg-green hover:text-white transition">
    //         <IoHeart className="text-xl" />
    //       </div>
    //       <div className="h-full w-1/3 flex items-center justify-center cursor-pointer hover:bg-green hover:text-white transition">
    //         <IoStar className="text-xl" />
    //       </div>
    //     </div>
    //   </div>

    //   {/* Product Info */}
    //   <div className="px-5 pb-6">
    //     <h4 className="text-gray-400 font-light text-sm mb-1">
    //       {item.category}
    //     </h4>
    //     <h2 className="text-xl font-semibold leading-none text-navy">
    //       {item.productName}
    //     </h2>

    //     {/* Stars */}
    //     <div className="mb-2">
    //       {[...Array(5)].map((_, i) => (
    //         <IoStarSharp key={i} className="inline text-yellow-500 text-base" />
    //       ))}
    //     </div>

    //     {/* Price & Button */}
    //     <div className="flex justify-between items-center">
    //       <div>
    //         <span className="text-green text-lg font-semibold underline mr-2">
    //           ${item.offerPrice}
    //         </span>
    //         <span className="text-gray-400 font-light text-base line-through">
    //           ${item.productPrice}
    //         </span>
    //       </div>
    //       <button className="bg-[#def9ec] text-green inline-block py-3 px-8 lg:py-2 lg:px-2 rounded-md text-base">
    //         <AiOutlineShoppingCart className="text-lg inline font-semibold mr-1" />
    //         Add
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default RelatedProducts;
