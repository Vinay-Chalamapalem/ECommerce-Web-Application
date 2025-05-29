import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";
import defaultImage from "../Assets/avatar.png";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("User not authenticated.");
      return;
    }

    fetch("https://localhost:7162/api/OrderManagement/Your_Orders", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setError("No orders found.");
        } else {
          setOrders(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders.");
      });
  }, []);

  return (
    <div className="orders-container">
      <h2>📦 Your Orders</h2>
      
      {error && <p className="error">{error}</p>}

      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div 
              key={order.orderID} 
              className="order-item"
              onClick={() => {console.log("Navigating to Order Details with ID:", order);
                navigate(`/order-details/${order.orderID}`)}} 
            >
              <img src={order.imageURL || defaultImage} alt={order.productName} className="order-image" />
              <div className="order-info">
                <p><strong>Product:</strong> {order.productName}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Price:</strong> ₹{order.totalPrice}</p>
                <p><strong>Status:</strong> {order.orderStatus}</p>
                <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                <p><strong>Payment Method:</strong> {order.paymentStatus}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
