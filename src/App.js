import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import Dashboard from "./Components/Dashboard/Dashboard";
import ProductDetails from "./Components/Product/ProductDetails";
import Profile from "./Components/Profile/Profile";
import Header from "./Components/Header/Header";
import Cart from "./Components/Cart/Cart";
import Wishlist from "./Components/Wishlist/Wishlist";
import Orders from "./Components/Order/Orders";
import PlaceOrder from "./Components/Order/PlaceOrder";
import CheckOut from "./Components/Order/CheckOut";
import OrderDetails from "./Components/Order/OrderDetails"; 
import WalmartTitle from './Components/WalmartIntro/WalmartTitle';

// ✅ Admin Imports
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminDashboard from "./Components/Pages/Dashboard";
import Admins from "./Components/Pages/Admins";
import AUsers from "./Components/Pages/Users";
import AOrders from "./Components/Pages/Orders";
import AProducts from "./Components/Pages/Products";
import ProductManagement from "./Components/Pages/ProductManagement/ProductManagement";
import AddProduct from "./Components/Pages/ProductManagement/AddProduct";
import EditProduct from "./Components/Pages/ProductManagement/EditProduct";
import OrderManagement from "./Components/Pages/OrderManagement";
import UserManagement from "./Components/Pages/UserManagement";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register",'/admin-login','/admin-dashboard','/admins','/ausers','/aorders','/aproducts','/add-product','/edit-product','/productmanagement','/usermanagement','/ordermanagement','/'];
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      {/* {true && <Header setSelectedCategory={setSelectedCategory} setSearchQuery={setSearchQuery} />} */}
      {!hideHeaderRoutes.includes(location.pathname) && (<Header setSelectedCategory={setSelectedCategory} setSearchQuery={setSearchQuery} />)}
      <Routes>
        {/* ✅ User Side Routes */}
        <Route path="/" element={<WalmartTitle />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={<Dashboard selectedCategory={selectedCategory} searchQuery={searchQuery} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetails cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/check-out" element={<CheckOut />} />
        <Route path="/order-details/:id" element={<OrderDetails />} />

        {/* ✅ Admin Side Routes (WITHOUT ProtectedRoute) */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/ausers" element={<AUsers />} />
        <Route path="/aorders" element={<AOrders />} />
        <Route path="/aproducts" element={<AProducts />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product" element={<EditProduct />} />
        <Route path="/productmanagement" element={<ProductManagement />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/ordermanagement" element={<OrderManagement />} />
      </Routes>
    </>
  );
}

export default App;
