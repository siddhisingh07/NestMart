import { cat_1, product_1 } from "../../Assets/Assets";
import { IoStarSharp } from "react-icons/io5";
import Heading from "../Common/Heading";
import { HeadingClass } from "../PropsClass";
import axios from "axios";
import { useEffect, useState } from "react";
import {base_url} from '../../constant'
import { useNavigate } from "react-router-dom";
import ShortCard from "../Common/ShortCard";
import ShortCardSkelton from "../Sample/ShortCardSkelton";

const Analysis = () => {
  const navigate = useNavigate()
  const [topSelling, setTopSelling] = useState(null);
  const [recentlyAdded, setRecentlyAdded] = useState(null);
  const [bestDeals, setBestDeals] = useState(null);

  const topSellingFunction = async () => {
    const res = await axios.get(`${base_url}/users/top-selling`);
    if (res) {
      setTopSelling(res.data.data);
    }
    console.log(res)
  };

  const recentlyAddedFunction = async () => {
    const res = await axios.get(`${base_url}/users/recently-added`);
    if (res) {
      setRecentlyAdded(res.data.data);
    }
  };

  const bestDealsFunction = async () => {
    const res = await axios.get(`${base_url}/users/best-deals`);
    if (res) {
      setBestDeals(res.data.data);
    }
  };

  useEffect(() => {
    topSellingFunction();
    recentlyAddedFunction();
    bestDealsFunction();
  }, []);


 const handleClick = (id, category) => {
    navigate(`/products/${category}/${id}`);
  };

  return (
    <div className="px-4 md:px-10 lg:px-28 py-2 ">
      <div className=" h-full  flex flex-col lg:flex-row gap-5 lg:gap-3">
        <div className=" h-full w-full lg:w-1/3">
          <Heading value={new HeadingClass("Top Selling", "start")} />
          {topSelling == null ?  ( [...Array(3)].map((_, i)=><ShortCardSkelton key={i}/>)) : (topSelling.length == 0  ? (<h1>No product is sold yet</h1>)  : (
            topSelling.map((item) => (
              <div className=" flex justify-between  shadow-sm mb-2 hover:-translate-y-1 duration-500 transition-transform" onClick={()=>handleClick(item._id, item.category)}>
                <div className="w-1/3 ">
                  <img src={item.front} alt="" className="h-20 object-cover  " />
                </div>
                <div className="w-2/3  p-2 pt-4  ">
                  <h2 className="text-lg font-semibold leading-none text-navy ">
                    {item.productName}
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
                      ${item.offerPrice}
                    </span>
                    <span className="text-gray-400 font-light text-sm stroke-slate-800 line-through">
                      ${item.productPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ))}
        </div>
        <div className=" h-full w-full lg:w-1/3">
          <Heading value={new HeadingClass("Recently Added", "start")} />
          {recentlyAdded == null || recentlyAdded.length == 0 ? (
            [...Array(3)].map((_, i)=><ShortCardSkelton key={i}/>)
          ) : (
            recentlyAdded.map((item) => (
              <div className=" flex justify-between  shadow-sm mb-2 hover:-translate-y-1 duration-500 transition-transform" onClick={()=>handleClick(item._id, item.category)}>
                <div className="w-1/3 ">
                  <img src={item?.front} alt="" className="h-20 object-cover  " />
                </div>
                <div className="w-2/3  p-2 pt-4">
                  <h2 className="text-lg font-semibold leading-none text-navy ">
                    {item.productName}
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
                      ${item.offerPrice}
                    </span>
                    <span className="text-gray-400 font-light text-sm stroke-slate-800 line-through">
                      ${item.productPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className=" h-full w-full lg:w-1/3">
          <Heading value={new HeadingClass("Best Deals", "start")} />
          {bestDeals == null || bestDeals.length == 0 ? (
            [...Array(3)].map((_, i)=><ShortCardSkelton key={i}/>)
          ) : (
            bestDeals.map((item) => (
             <ShortCard value={item}/>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
