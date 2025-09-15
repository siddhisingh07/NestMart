import axios from "axios";
import { product_1 } from "../../Assets/Assets";
import Heading from "../Common/Heading";
import { HeadingClass } from "../PropsClass";
import { base_url } from "../../constant";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const OrdersList = () => {
  const [productList, setProductList] = useState([]);

  const orders_List = async () => {
    try {
      let res = await axios.get(`${base_url}/order/all-order`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setProductList(res.data.data);
      console.log(productList)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    orders_List();
  }, []);

  return (
    <>
      <div className=" p-6">
        <Heading value={new HeadingClass("Orders List", "start")} />
        <div className=" flex gap-5 flex-col mt-5">
          {productList.length == 0 ? (
            <h1>Loading...</h1>
          ) : (
            productList.map((item) => (
              <div className=" w-full border px-4 py-3 rounded text-gray-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-5">
                    <div>
                      {item.orderItems
                          .map((elm, index) => (
                           <img
                        src={elm.product?.front }
                        className="h-24 w-24 object-cover"
                        alt=""
                      />
                          ))
                          .reduce((prev, curr) => [prev, ", ", curr])}
                      
                    </div>
                    <div className="pt-3">
                      <h1 className="text font-semibold text-navy">
                        {item.orderItems
                          .map((elm, index) => (
                            <span key={index}>
                              {elm.productName}{" "}
                              <span className="text-green">
                                x {elm.quantity}
                              </span>
                            </span>
                          ))
                          .reduce((prev, curr) => [prev, ", ", curr])}
                      </h1>

                      <h1>
                        Category:{" "}
                        {item.orderItems
                          .map((elm) => ` ${elm.product.category}`)
                          .join(", ")}
                      </h1>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-navy font-semibold">
                      {item.user.name}
                    </h1>
                    <h1>{item.shippingAddress}</h1>
                    <h1>Delhi, 277401,</h1>
                    <h1>India</h1>
                  </div>
                  <div className="text-navy font-semibold">
                    ${item.totalAmount}
                  </div>
                  <div className="flex justify-between flex-col mb-3">
                    <span>Method: {item.paymentStatus}</span>
                    <span>
                      Date: {new Date(item.user.createdAt).toLocaleDateString()}
                    </span>
                    <span>Payment: Pending</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default OrdersList;
