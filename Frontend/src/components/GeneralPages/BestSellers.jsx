import { useEffect, useState } from "react";
import Heading from "../Common/Heading";
import { HeadingClass } from "../PropsClass";
import axios from "axios";
import toast from "react-hot-toast";
import { Card } from "../Common/Card";
import { CardSkeleton } from "../Sample/CardSkeleton";

const BestSellers = () => {
  const [productList, setProductList] = useState(null);

  // Card-specific hover state

  const handleProductList = async () => {
    try {
      let res = await axios.get("http://localhost:3000/api/users/best-sellers");
      setProductList(res.data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleProductList();
  }, []);

  return (
    <div className="w-full px-3 md:px-10 lg:px-28 bg-gray-50 py-8">
      <Heading value={new HeadingClass("Best Sellers", "start", 80, 20)} />

      <div className="flex gap-4 flex-wrap">
        {productList == null ? (
          [...Array(4)].map((_, i)=> <CardSkeleton key={i}/> )
        ) : (
          productList.map((item, idx) => {
            let off =
              ((item.productPrice - item.offerPrice) / item.productPrice) * 100;
            off = Math.abs(Math.round(off));

            item.off = off;

            return (
              <Card value={{ item, idx }} />
            );
          })
        )}
      </div>
    </div>
  );
};

export default BestSellers;
