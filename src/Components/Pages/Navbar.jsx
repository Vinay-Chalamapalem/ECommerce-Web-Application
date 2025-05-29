import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
 
const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
 
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };
 
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="hamburger" onClick={toggleSidebar}>
          &#9776;
        </button>
        <Link to="/admin-dashboard" className="navbar-link highlight-link">
          Admin Dashboard
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/admins" className="navbar-link">
          Admins
        </Link>
        <Link to="/ausers" className="navbar-link">
          Users
        </Link>
        <Link to="/aproducts" className="navbar-link">
          Products
        </Link>
        <Link to="/aorders" className="navbar-link">
          Orders
        </Link>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};
 
export default Navbar;