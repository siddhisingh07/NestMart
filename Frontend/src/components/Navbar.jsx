import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCart2, BsSearch } from "react-icons/bs";
import { logo, profile } from "../Assets/Assets";
import toast from "react-hot-toast";
import { authContext } from "../Context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, role, setRole, cartSize } = useContext(authContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [resultData, setResultData] = useState([]);
  const logout = async () => {
    try {
      let res = await axios.get("http://localhost:3000/api/users/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(res.data.message);
      setUser(null);
    }
  };

  console.log(user, role);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/search-list?search=${query}`);
  };

  return (
    <nav className="flex items-center justify-between px-4 md:px-10 lg:px-28 py-2 lg:py-3 border-b border-gray-300 bg-white relative transition-all">
      <Link to="/">
        <img src={logo} className="h-12" alt="" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-6">
        <Link
          to="/admin-dashboard"
          className="px-3 border-light_green text-green inline-block text-sm border-2 rounded-xl"
        >
          Admin
        </Link>
        <Link to="/">Home</Link>
        <Link to="/products">All Products</Link>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <form action="" className="flex items-center" onSubmit={handleSearch}>
            <input
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <BsSearch className="text-gray-800" />
          </form>
        </div>

        {user && (
          <>
            <Link to="/cart">
              <div className="relative cursor-pointer">
                <BsCart2 />
                <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
                  {cartSize == 0 ? "0" : cartSize}
                </button>
              </div>
            </Link>

            <div ref={dropdownRef} className="relative ml-2 ">
              {/* Profile Image */}
              <img
                src={profile}
                alt="profile"
                className="h-9 w-9 cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
              />

              {/* Dropdown */}
              {isOpen && (
                <div className="bg-gray-50 border text-gray-800 rounded mt-5 absolute top-7 right-0 shadow z-50">
                  <Link to="/my-orders">
                    <div
                      className="w-24 hover:bg-light_green cursor-pointer py-1 px-2 text-sm font-normal"
                      onClick={() => setIsOpen(false)}
                    >
                      My Orders
                    </div>
                  </Link>
                  <div
                    className="w-24 hover:bg-light_green cursor-pointer py-1 px-2 text-sm font-normal"
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                  >
                    Logout
                  </div>
                  <div
                    className="w-24 hover:bg-light_green cursor-pointer py-1 px-2 text-sm font-normal"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {!user && (
          <Link
            to="/login"
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </Link>
        )}

        {role == "user" && (
          <>
            <Link to="/cart">
              <div className="relative cursor-pointer">
                <BsCart2 />
                <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full"></button>
              </div>
            </Link>
          </>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link to="/">Home</Link>
        <Link to="/products">All Products</Link>
        <Link to="/cart">
          <div className="relative cursor-pointer">
            <BsCart2 />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
              3
            </button>
          </div>
        </Link>
        {role == "admin" && (
          <Link to="/dashboard">
            <span className="py-2 bg-light_green text-green rounded">
              Dashboard
            </span>
          </Link>
        )}

        {role == "user" && <Link to="/admin-dashboard">Dashboard</Link>}
        {role == "user" && <Link to="/my-orders">My orders</Link>}
        {role == "user" && <Link to="/userprofile">Profile</Link>}
        {!user ? (
          <Link
            to="/login"
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={logout}
            className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
