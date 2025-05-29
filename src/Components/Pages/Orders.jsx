import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/order.css"; // Import your CSS
 
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const token = localStorage.getItem("jwtToken");
 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7162/api/Admin/Get_All_Orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
 
    fetchOrders();
  }, [token]);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
 
  return (
    <div className="orders-container">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
 
      <h2 className="orders-title">Orders</h2>
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
            <th>Order ID</th>
              <th>User ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Shipping Address</th>
              <th>Order Status</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.orderID}</td>
                <td>{order.userID}</td>
                <td>{order.productID}</td>
                <td>{order.quantity}</td>
                <td>₹{order.totalPrice.toFixed(2)}</td>
                <td>{order.shippingAddress}</td>
                <td>{order.orderStatus}</td>
                <td>{order.paymentStatus}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="7" className="no-orders">
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
 
export default OrdersPage;