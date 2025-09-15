import axios from "axios";
import Heading from "../Common/Heading";
import { HeadingClass } from "../PropsClass";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { base_url } from "../../constant";

const MyOrders = () => {
  const [data, setData] = useState([]);

  const showData = async () => {
    try {
      let res = await axios.get(`${base_url}/order/my-orders`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setData(res.data.data);
        console.log(res.data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    showData();
  }, []);

  return (
    <div className="px-4 md:px-10 lg:px-28 py-4">
      <Heading value={new HeadingClass("My Orders", "start")} />

      <div className="w-2/3 flex gap-5 flex-col mt-5">
        {data.length === 0 ? (
          <h1 className="text-gray-500">You haven't ordered yet</h1>
        ) : (
          data.map((order) => (
            <div
              key={order._id}
              className="border px-4 py-3 rounded text-gray-600"
            >
              {/* Order Info */}
              <div className="flex justify-between mb-3 text-sm">
                <span>OrderId : {order._id}</span>
                <span>
                  Payment : {order.paymentStatus ? "Paid" : "Unpaid"}
                </span>
                <span>Total Amount : ${order.totalAmount}</span>
              </div>

              {/* Products in this order */}
              {order?.orderItems?.map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-t py-2"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={p?.product?.front || "https://via.placeholder.com/100"}
                      className="h-24 w-24 object-cover shadow"
                      alt={p?.product?.productName}
                    />
                    <div>
                      <h1 className="text-lg font-semibold text-navy">
                        {p?.product?.productName}
                      </h1>
                      <h1>Category: {p?.product?.category}</h1>
                    </div>
                  </div>

                  <div className="text-sm">
                    <h1>Status : {order?.orderStatus || "Pending"}</h1>
                    <h1>Quantity : {p?.quantity}</h1>
                    <h1>
                      Date:{" "}
                      {new Date(order?.createdAt || Date.now()).toLocaleDateString()}
                    </h1>
                  </div>
                </div>
              ))}

              {/* Shipping Address */}
              <div className="mt-2 text-sm">
                <h1>Shipping: {order?.shippingAddress}</h1>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
