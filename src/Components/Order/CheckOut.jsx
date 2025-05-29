import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CheckOut.css";
import defaultImage from "../Assets/avatar.png";

const CheckOut = () => {
  const { state } = useLocation(); 
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("token");

 
  if (!state?.orderList || state.orderList.length === 0) {
    return <p>Loading cart details...</p>;
  }

  const handlePlaceOrder = async () => {
    if (!shippingAddress || !paymentMode) {
      setError("Please enter shipping address and payment mode.");
      return;
    }

    const orderPayload = {
      shippingAddress,
      paymentMode,
    };

    try {
      const response = await fetch("https://localhost:7162/api/OrderManagement/CheckoutFromCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        setSuccessMessage("✅ Order placed successfully!");
        setTimeout(() => navigate("/dashboard"), 3000);
      } else {
        setError("❌ Failed to place order.");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      setError("❌ Something went wrong.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>🛍️ Checkout</h2>

      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <div className="order-details">
  {state.orderList.map((product) => (
    <div key={product.productID} className="order-item">
      <img src={product.imageURL || defaultImage} alt={product.productName} className="order-image"/>
      
      <div className="order-info">
        <p><strong>Product:</strong> {product.productName}</p>
        <p><strong>Quantity:</strong> {product.quantity}</p>
        </div>
    </div>
  ))}
</div>


      <div className="form-group">
        <label>Shipping Address:</label>
        <input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          placeholder="Enter your shipping address"
          required
        />
      </div>

      <div className="form-group">
        <label>Payment Mode:</label>
        <select
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
          required
        >
          <option value="">Select Payment Mode</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="UPI">UPI (GPay, PhonePe, Paytm)</option>
          <option value="Debit Card">Net Banking</option>
        </select>
      </div>

      <button className="confirm-btn" onClick={handlePlaceOrder}>
        ✅ Place Order
      </button>
    </div>
  );
};

export default CheckOut;
