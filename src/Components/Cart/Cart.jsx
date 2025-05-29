import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Cart.css";
import defaultAvatar from "../Assets/avatar.png";


const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const token = localStorage.getItem("token");
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    fetch("https://localhost:7162/api/CartItem/Your_Cart", {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((error) => {
        setError(error.message);
        console.error("Error fetching cart:", error);
      });
  }, []);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
    setTotalAmount(total.toFixed(2));
  }, [cart]);

  const decreaseQuantity = async (id, productID, quantity, price) => {
    if (quantity === 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemID === id
          ? { ...item, quantity: quantity - 1, totalPrice: (price || 0) * (quantity - 1) }
          : item
      )
    );

    try {
      await fetch(`https://localhost:7162/api/CartItem/Edit_Your_Cart?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ productID, quantity: quantity - 1 }),
      });
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const increaseQuantity = async (id, productID, quantity, price) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemID === id
          ? { ...item, quantity: quantity + 1, totalPrice: (price || 0) * (quantity + 1) }
          : item
      )
    );

    try {
      await fetch(`https://localhost:7162/api/CartItem/Edit_Your_Cart?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ productID, quantity: quantity + 1 }),
      });
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const handleRemove = async (id) => {
    setCart(cart.filter((item) => item.cartItemID !== id));

    try {
      await fetch(`https://localhost:7162/api/CartItem/Delete_the_Cart?id=${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = () => {
    const orderList = cart.map(item => ({
      productID: item.productID,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      productName: item.productName,
      imageURL: item.imageURL
    }));

    navigate("/check-out", { state: { orderList } });
  };

  return (
   
    <div className="cart-container">
      <h2>🛒 Your Cart</h2>
      
      {cart.length === 0 ? (
        <p>No items in cart yet! Start shopping.</p>
      ) : (
        <div className="cart-items">
          {cart.map((product) => (
            <div key={product.cartItemID} className="cart-item">
              <img src={product.imageURL || defaultAvatar} alt={product.productName || "Product"} className="cart-image" />
              <div className="cart-info">
                <h3>{product.productName || "Unknown Product"}</h3>

                <div className="quantity-controls">
                  <button className="qty-btn" onClick={() => decreaseQuantity(product.cartItemID, product.productID, product.quantity, product.price)}>−</button>
                  <span>{product.quantity}</span>
                  <button className="qty-btn" onClick={() => increaseQuantity(product.cartItemID, product.productID, product.quantity, product.price)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => handleRemove(product.cartItemID)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-total">
          <h3>Total: ₹{totalAmount}</h3>
          <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout 🚀</button>
        </div>
      )}
    </div>
    
  );
};

export default Cart;