import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import defaultImage from "../Assets/avatar.png";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    fetch(`https://localhost:7162/api/ProductManagement/Search_The_Product?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        checkWishlist(data.productId);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  const checkWishlist = (productId) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWishlisted(wishlist.some(item => item.productId === productId));
  };

  const handleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    
    if (isWishlisted) {
      const updatedWishlist = wishlist.filter(item => item.productId !== product.productId);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsWishlisted(false);
    } else {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsWishlisted(true);
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const handleBuyNow = () => {
    navigate("/placeorder", { state: { order: {
      productID: product.productId,
      quantity: 1,
      totalPrice: product.price,
      productName: product.name,
      imageURL: product.imageURL
    }}});
  };
  
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated. Please log in.");
      navigate("/login");
      return;
    }

    const cartItem = {
      productID: product.productId,
      quantity: 1
    };

    try {
      const response = await fetch("https://localhost:7162/api/CartItem/Add_Into_Cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(cartItem),
      });

      if (!response.ok) {
        throw new Error(`Failed to add item to cart: ${response.status} (${response.statusText})`);
      }

      setMessage("Item added to cart! ✅");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="product-details-containerr">
      <div className="product-imagee">
        <img src={product.imageURL || defaultImage} alt={product.name} />
      </div>
      <div className="product-infoo">
        <h2>{product.name}</h2>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Description:</strong> {product.description}</p>

        {message && <p className="success-message">{message}</p>}
        
        {/* ❤️ Wishlist Button */}
        <button className={`wishlist-btnn ${isWishlisted ? "active" : ""}`} onClick={handleWishlist}>
          {isWishlisted ? "❤️ Remove from Wishlist" : "🤍 Add to Wishlist"}
        </button>

        {/* Action Buttons */}
        <div className="button-groupp">
          <button className="cart-btnn" onClick={handleAddToCart}>Add to Cart</button>
          <button className="buy-btnn" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
