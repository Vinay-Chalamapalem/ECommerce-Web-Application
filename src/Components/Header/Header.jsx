import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import "./Header.css";

const Header = ({ setSelectedCategory, setSearchQuery }) => {
  const [showMenu, setShowMenu] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let lastScrollTop = window.scrollY;
    const handleScroll = () => {
      let scrollTop = window.scrollY;
      setShowMenu(scrollTop < lastScrollTop || scrollTop < 50);
      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchQuery(""); 
    navigate("/dashboard"); 
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    navigate("/dashboard");
  };

  return (
    <header className="header">
      {}
      <div className="top-bar">
        <h2 className="logo" onClick={() => { 
          setSelectedCategory("All"); 
          setSearchQuery(""); 
          navigate("/dashboard");
        }}>
          Walmart
        </h2>
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for products, brands..." 
            className="search-box"
            onChange={handleSearch} 
          />
        </div>  
        <div className="icons">
          <FaUser className="icon" onClick={() => navigate("/profile")} />
          <FaHeart className="icon" onClick={() => navigate("/wishlist")} />
          <FaShoppingCart className="icon" onClick={() => navigate("/cart")} />
        </div>
      </div>

      {}
      {showMenu && (
        <nav className="menu">
          <ul>
            <li onClick={() => handleCategoryClick("Electronics")}>Electronics</li>
            <li onClick={() => handleCategoryClick("Men")}>Men</li>
            <li onClick={() => handleCategoryClick("Women")}>Women</li>
            <li onClick={() => handleCategoryClick("Baby")}>Baby & Kids</li>
            <li onClick={() => handleCategoryClick("Home")}>Home & Furniture</li>
            <li onClick={() => handleCategoryClick("More")}>Sports, Books & More</li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
