import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Package, ShoppingCart, Shield } from "lucide-react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AnalyticsChart from "./AnalyticsChart";
import "../styles/dashboard.css";
 
const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    users: 0,
    products: 0,
    orders: 0,
    admins: 0,
  });
 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("jwtToken");
 
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7162/api/Admin/Analytics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAnalytics(response.data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      }
    };
 
    fetchAnalytics();
  }, [token]);
 
  return (
    <div className="dashboard-container">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} />
 
      <div className={`dashboard-wrapper ${sidebarOpen ? "with-sidebar" : ""}`}>
        <h1 className="dashboard-title">Admin Dashboard</h1>
 
        <div className="cards-grid">
          <div className="dashboard-card bg-blue">
            <User size={40} />
            <div>
              <p className="card-label">Users</p>
              <p className="card-value">{analytics.users}</p>
            </div>
          </div>
 
          <div className="dashboard-card bg-green">
            <Package size={40} />
            <div>
              <p className="card-label">Products</p>
              <p className="card-value">{analytics.products}</p>
            </div>
          </div>
 
          <div className="dashboard-card bg-yellow">
            <ShoppingCart size={40} />
            <div>
              <p className="card-label">Orders</p>
              <p className="card-value">{analytics.orders}</p>
            </div>
          </div>
 
          <div className="dashboard-card bg-red">
            <Shield size={40} />
            <div>
              <p className="card-label">Admins</p>
              <p className="card-value">{analytics.admins}</p>
            </div>
          </div>
        </div>
 
        <AnalyticsChart data={analytics} />
      </div>
    </div>
  );
};
 
export default Dashboard;