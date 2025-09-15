import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Heading from "../../Common/Heading";
import { HeadingClass } from "../../PropsClass";
import { Card } from "../../Common/Card";
import { CardSkeleton } from "../../Sample/CardSkeleton";
import toast from "react-hot-toast";

export const SearchList = () => {
  const [productList, setProductList] = useState(null);
  const location = useLocation();

  let query = new URLSearchParams(location.search).get("search");
  console.log("Query:", query);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        let res = await axios.get(
          `http://localhost:3000/api/users/search?q=${query}`
        );
        console.log("API response:", res.data);

        setProductList(res.data.data );
      } catch (error) {
        toast.error(error.message)
      }
    };

    if (query) handleSearch();
  }, [query]);

  

  return (
    <div className="w-full px-3 md:px-10 lg:px-28 bg-gray-50 py-8">
      <Heading value={new HeadingClass("Your daily choice", "start", 80, 20)} />

      <div className="flex gap-4 flex-wrap">
       {productList === null ? (
    [...Array(4)].map((_, i) => <CardSkeleton key={i} />)
  ) : productList.length === 0 ? (
    <h1>No product is found</h1>
  ) : (
    productList.map((item, idx) => {
      let off =
        ((item.productPrice - item.offerPrice) / item.productPrice) * 100;
      off = Math.abs(Math.round(off));
      item.off = off;
      return <Card key={idx} value={{ item, idx }} />;
    })
  )}
      </div>
    </div>
  );
};
