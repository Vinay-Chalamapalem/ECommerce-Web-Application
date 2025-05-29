import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrderDetails.css";
import defaultImage from "../Assets/avatar.png";

const OrderDetails = () => {
  const { id } = useParams(); 
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Order ID from URL:", id); 

    if (!token) {
      setError("User not authenticated.");
      return;
    }

    if (!id || id === "undefined") { 
      setError("Invalid Order ID.");
      return;
    }

    fetch(`https://localhost:7162/api/OrderManagement/Order_Details?id=${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Order Details API Response:", data); 
        if (!data || Object.keys(data).length === 0) {
          setError("Order not found.");
        } else {
          setOrder(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
        setError("Failed to load order details.");
      });
  }, [id]);

  const handleDeleteOrder = async () => {
    if (!window.confirm(`Are you sure you want to delete Order ID ${id}?`)) {
      return;
    }

    try {
      const response = await fetch(`https://localhost:7162/api/OrderManagement/Delete_the_Order?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert("Order deleted successfully!");
        navigate("/orders");
      } else {
        alert("Failed to delete order.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!order) {
    return <p>Loading order details...</p>;
  }

  return (
    <div className="order-details-container">
      <h2>📦 Order Details</h2>

      <img src={order.imageURL || defaultImage} alt={order.productName} className="order-image" />
      <p><strong>Product:</strong> {order.productName}</p>
      <p><strong>Quantity:</strong> {order.quantity}</p>
      <p><strong>Price:</strong> ₹{order.totalPrice}</p>
      <p><strong>Status:</strong> {order.orderStatus}</p>
      <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
      <p><strong>Payment Method:</strong> {order.paymentStatus ? order.paymentStatus : "Not Provided"}</p>

      <button className="delete-order-btn" onClick={handleDeleteOrder}>
        ❌ Cancel Order
      </button>
    </div>
  );
};

export default OrderDetails;
