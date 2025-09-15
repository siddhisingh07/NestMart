import { useState, useEffect, useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { product_1, product_1_back } from "../../../Assets/Assets";
import { authContext } from "../../../Context/AuthContext";

const AddToCart = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const {setCartSize} = useContext(authContext);

  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    setCartSize(cart.length)
  }, [cart])

  // Fetch cart from backend
  const handleCart = async () => {
    try {
      let res = await axios.get("http://localhost:3000/api/cart/", {
        withCredentials: true,
      });
      if (res.data?.data) {
        setCart(res.data.data.items || []);
      }
    } catch (error) {
       setCart([]);
      return toast.error(error.response?.data?.message || "Failed to fetch cart");
     
    }
  };

  useEffect(() => {
    handleCart();
  }, []);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const total = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotalAmount(total);
    } else {
      setTotalAmount(0);
    }
  }, [cart]);

  const handleBuy = async (cart, shippingAddress = address) => {
    if (!cart || cart.length === 0) {
      return toast.error("Cart is empty");
    }

    if (!shippingAddress) {
      return toast.error("Shipping Address is required")
    }

    try {
      const orderItems = cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
      }));

      const tax = (totalAmount * 2) / 100;
      const finalAmount = totalAmount + tax;

      const order = {
        orderItems,
        totalAmount: finalAmount,
        shippingAddress,
      };

      const res = await axios.post("http://localhost:3000/api/order", order, {
        withCredentials: true,
      });

       toast.success(res.data.message || "Order placed successfully!");
       navigate("/my-orders");

      if (res) {
        setCart([]);
      }

      // Refresh cart from backend (backend will be cleared after order)
      await handleCart();
    } catch (error) {
     return toast.error(error.message)
      // toast.error(error.response?.data?.message || "Failed to place order");
    }
  };

  const quantityChange = async (productId, newQuantity) => {
    try {
      const updatedCart = cart.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: parseInt(newQuantity) }
          : item
      );

      setCart(updatedCart);
      setCartSize(cart.length)
      console.log(cart)


      const total = updatedCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotalAmount(total);

      await axios.put(
        `http://localhost:3000/api/cart/${productId}`,
        { quantity: parseInt(newQuantity) },
        { withCredentials: true }
      );

      toast.success("Quantity updated!");
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/remove/${productId}`, {
        withCredentials: true,
      });
      toast.success("Item removed from cart");
      handleCart();
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  // Handle address form submission
  const handleAddressSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Add address-saving logic here (e.g., send it to the backend or update local state)
    toast.success("Address added successfully!");
    setIsOpen(false); // Close the form after submission
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 md:p-10 lg:px-28 gap-10 lg:gap-20 py-12">
      {/* Cart Section */}
      <div className="w-full lg:w-2/3">
        <h1 className="text-3xl text-navy font-semibold inline-block mr-2">
          Shopping Cart
        </h1>
        <span className="inline-block text-lg text-green font-semibold">
          {cart ? cart.length : 0} items
        </span>

        <div className="max-h-80 overflow-y-auto mt-6">
          <table className="w-full border-separate border-spacing-y-4">
            <thead>
              <tr>
                <th className="text-left text-gray-500 font-semibold lg:w-2/3 py-2">
                  Product Details
                </th>
                <th className="text-left text-gray-500 font-semibold lg:w-1/6">
                  Subtotal
                </th>
                <th className="text-left text-gray-500 font-semibold lg:w-1/6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {!cart || cart.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-gray-500 py-4">
                    Cart is empty
                  </td>
                </tr>
              ) : (
                cart.map((item, idx) => (
                  <tr className="shadow" key={idx}>
                    <td className="flex items-center gap-3">
                      <img
                        src={item.product?.front || product_1}
                        alt={item.product?.productName || "product"}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h2 className="text-navy font-medium">
                          {item.product?.productName}
                        </h2>
                        <p className="text-gray-500 text-sm">
                          {item.product?.category}
                        </p>

                        <select
                          name="quantity"
                          id="quantity"
                          value={item.quantity}
                          onChange={(e) =>
                            quantityChange(item.product._id, e.target.value)
                          }
                        >
                          {Array.from(
                            { length: item.product.stock },
                            (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </td>

                    <td>${item.price * item.quantity}</td>

                    <td>
                      <div
                        onClick={() => removeItem(item.product._id)}
                        className="text-red-600 h-7 w-7 border-2 border-red-700 rounded-full flex items-center justify-center cursor-pointer"
                      >
                        <FaTimes className="text-base font-light hover:scale-110 transition" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Link to="/products" className="text-green mt-3 flex">
          Continue Shopping{" "}
          <MdOutlineArrowRightAlt className="text-3xl inline-block font-semibold" />
        </Link>
      </div>

      {/* Order Summary */}
      <div className="pt-4 w-full lg:w-[30%]">
        <div className="w-full bg-gray-100 py-6 px-6 rounded text-gray-600 max-h-fit">
          <h1 className="text-navy text-2xl font-semibold">Order Summary</h1>
          <hr className="border-gray-300 mt-2" />

          {/* Delivery Address */}
          <h1 className="text-lg text-navy font-normal mt-3 mb-1">Delivery Address</h1>
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-gray-500 font-normal">{address || "No address added"}</h1>
            <button
              onClick={() => setIsOpen(true)}
              className="px-3 py-1 text-sm text-white bg-gray-700 font-light rounded"
            >
              Add Address
            </button>
          </div>

          {/* Conditional rendering of address input */}
          {isOpen && (
            <form onSubmit={handleAddressSubmit} className="flex flex-col gap-2 mt-3">
              <label htmlFor="address" className="text-sm font-medium text-gray-700">
                Enter Address:
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green"
              />
              <button
                type="submit"
                className="mt-3 px-4 py-2 bg-light_green border rounded text-gray-700 border-gray-100"
              >
                Add Address
              </button>
            </form>
          )}

          {/* Payment */}
          <h1 className="text-lg text-navy font-normal mt-4 mb-1">Payment Method</h1>
          <select className="w-full p-2 bg-white border text-gray-600 focus:outline-none rounded">
            <option value="COD">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </select>

          <hr className="border-gray-300 my-6" />

          {/* Price Details */}
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-gray-600 font-normal">Price</h1>
            <h1 className="text-base font-light text-gray-500">${totalAmount}</h1>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-gray-600 font-normal">Shipping Charge</h1>
            <h1 className="text-base text-gray-600 font-light">Free</h1>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-gray-600 font-normal">Tax</h1>
            <h1 className="text-base text-gray-600 font-light">2%</h1>
          </div>

          <div className="flex items-center justify-between my-4">
            <h1 className="text-lg text-gray-600 font-semibold">Total amount</h1>
            <h1 className="text-base text-gray-600 font-light">
              ${totalAmount + (totalAmount * 2) / 100}
            </h1>
          </div>

          <button
            onClick={() => handleBuy(cart, address)}
            className="text-white bg-green rounded-sm py-2 w-full hover:bg-green/90 transition"
          >
            Place order
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
