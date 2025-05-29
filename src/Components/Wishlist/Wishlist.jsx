import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import defaultImage from "../Assets/avatar.png";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const handleRemove = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.productId !== productId);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  return (
    <div className="wishlist-container">
      <h2>💖 Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>No items in wishlist yet! Start saving your favorites.</p>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((product) => (
            <div key={product.productId} className="wishlist-item">
              <img src={product.imageURL || defaultImage} alt={product.name} className="wishlist-image" />
              <div className="wishlist-info">
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
                <button className="remove-btn" onClick={() => handleRemove(product.productId)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
