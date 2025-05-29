import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "./PlaceOrder.css";
import defaultImage from "../Assets/avatar.png";
 
const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};
  console.log("Order state:", order);
  const [userDetails, setUserDetails] = useState({});
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(order ? order.totalPrice : 0);
 
 
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      setTotalPrice(newQuantity * order.totalPrice);
    }
  };
 
  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated. Please log in.");
      navigate("/login");
      return;
    }
    const decodedToken = jwtDecode(token);
    setUserDetails(prev => ({ ...prev, userID: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] }));
 
    const orderRequest = {
      UserID: userDetails.userID, 
      ProductID: order.productID,
      Quantity: quantity,
      TotalPrice: totalPrice,
      ShippingAddress: shippingAddress,
      OrderStatus: "Placed",
      PaymentStatus: paymentMode,
      ProductName: order.productName,
      ImageURL: order.imageURL,
    };
    console.log("Order Request Payload:", orderRequest);
 
    try {
      const response = await fetch(`https://localhost:7162/api/OrderManagement/OrderNow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(orderRequest),
      });
 
      if (!response.ok) {
        throw new Error(`Failed to place order: ${response.status} (${response.statusText})`);
      }
 
      alert("Order placed successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
 
if (!order) {
    return <p>Loading order details...</p>;
    }
   
 
  return (
    <div className="order-confirmation-container">
      <h2>Order Confirmation</h2>
      <div className="order-details">
        <img src={order.imageURL || defaultImage} alt={order.productName} />
        <p><strong>Product:</strong> {order.productName}</p>
        <p><strong>Price:</strong> ₹{totalPrice}</p>
        <div className="quantity-control">
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange(1)}>+</button>
        </div>
      </div>
      <div className="shipping-address">
        <label htmlFor="shippingAddress">Shipping Address:</label>
        <input
          type="text"
          id="shippingAddress"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
        />
      </div>
      <div className="payment-mode">
        <label htmlFor="paymentMode">Payment Mode:</label>
        <select
          id="paymentMode"
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
      <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};
 
export default PlaceOrder;