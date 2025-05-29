import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/order.css"; // Import your CSS
 
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
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
 
  const handleEditOrder = async () => {
    try {
      const response = await axios.put(
        `https://localhost:7162/api/OrderManagement/Edit_Order/${editOrder.orderID}`,
        {
          orderID: editOrder.ID,
          userID: editOrder.userID,
          productID: editOrder.productID,
          quantity: editOrder.quantity,
          totalPrice: editOrder.totalPrice,
          shippingAddress: editOrder.shippingAddress,
          orderStatus: editOrder.orderStatus,
          paymentStatus: editOrder.paymentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(
        orders.map((order) =>
          order.orderID === editOrder.orderID ? response.data : order
        )
      );
      setEditOrder(null);
    } catch (error) {
      console.error("Failed to edit order:", error);
    }
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };
 
  return (
    <div className="orders-container">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
 
      <h2 className="orders-title">Order Management</h2>
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
              <th>Action</th>
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
                <td>
                <button onClick={() => setEditOrder(order)}>Edit</button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="8" className="no-orders">
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
 
      {editOrder && (
        <div className="edit-order-form">
          <h2>Edit Order</h2>
          <div className="form-group">
          <label>Order ID</label>
          <input
            type="text"
            name="orderID"
            placeholder="Order ID"
            value={editOrder.orderID}
            onChange={handleChange}
            disabled
          />
          </div>
          {/* <label>User ID</label>
          <input
            type="text"
            name="userID"
            placeholder="User ID"
            value={editOrder.userID}
            onChange={handleChange}
            disabled
          />
          <label>Product ID</label>
          <input
            type="text"
            name="productID"
            placeholder="Product ID"
            value={editOrder.productID}
            onChange={handleChange}
          /> */}
          {/* <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={editOrder.quantity}
            onChange={handleChange}
          />
          <label>Total Price</label>
          <input
            type="number"
            name="totalPrice"
            placeholder="Total Price"
            value={editOrder.totalPrice}
            onChange={handleChange}
          />
          <label>Shipping Address</label>
          <input
            type="text"
            name="shippingAddress"
            placeholder="Shipping Address"
            value={editOrder.shippingAddress}
            onChange={handleChange}
          /> */}
          <div className="form-group">
          <label>Order Status</label>
          <input
            type="text"
            name="orderStatus"
            placeholder="Order Status"
            value={editOrder.orderStatus}
            onChange={handleChange}
          />
          </div>
          {/* <label>Payment Status</label>
          <input
            type="text"
            name="paymentStatus"
            placeholder="Payment Status"
            value={editOrder.paymentStatus}
            onChange={handleChange}
          /> */}
          <div className="form-buttons">
          <button className="save-button"  onClick={handleEditOrder}>Save Changes</button>
          <button className="cancel-button"  onClick={() => setEditOrder(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default OrdersPage;