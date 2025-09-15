import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import UserDashboard from "./components/UserPages/UserDashboard";
import ProductList from "./components/GeneralPages/ProductList";
import MyOrders from "./components/UserPages/MyOrders";
import "./index.css";
import AdminProtectedWrapper from "./components/ProtectedRoutes/AdminProtectedWrapper";
import { Toaster } from "react-hot-toast";
import Add_Products from "./components/Admin Pages/Add_Products";
import AdminDashboard from "./components/Admin Pages/AdminDashboard";
import { Start } from "./components/Start";
import TopNavbar from "./components/TopNavbar";
import AddToCart from "./components/GeneralPages/Features/AddToCart";
import Product from "./components/GeneralPages/Features/Product";
import CategorizedProduct from "./components/GeneralPages/Features/CategorizedProduct";
import Footer from "./components/GeneralPages/Footer";
import OrdersList from "./components/Admin Pages/OrdersList";
import Product_list from "./components/Admin Pages/Product_list";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import { SearchList } from "./components/GeneralPages/Features/SearchList";
import NotFound from "./components/GeneralPages/NotFound";

const App = () => {
  return (
    <>
      <TopNavbar />
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* General Routes */}
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product-list" element={<Product_list />} />
        <Route path="/search-list" element={<SearchList />} />

        {/* Categorized / Product Routes */}
        <Route path="/products/:category/:id" element={<Product />} />
        <Route path="/products/:category" element={<CategorizedProduct />} />
        <Route path="product/:id" element={<Product />} /> 

        {/* User Protected Routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <AddToCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userprofile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/orders-list"
          element={
            <AdminProtectedWrapper>
              <OrdersList />
            </AdminProtectedWrapper>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedWrapper>
              <AdminDashboard />
            </AdminProtectedWrapper>
          }
        />
        <Route
          path="/add-products"
          element={
            <AdminProtectedWrapper>
              <Add_Products />
            </AdminProtectedWrapper>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;



//To much support to indian cricket india only focus on cricket too much important to cricket  vss be a multi sport nation 
//night outers vs early birds 
