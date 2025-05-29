import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/user.css"; // Import the CSS file
 
const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const token = localStorage.getItem("jwtToken");
 
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7162/api/Admin/Get_All_Users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
 
    fetchUsers();
  }, [token]);
 
 
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    
    if (confirmDelete) {
      try {
        await axios.delete(
          `https://localhost:7162/api/User/Delete_Account_by_admin/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(users.filter((user) => user.userID !== id));
        console.log("User profile deleted successfully");
      } catch (error) {
        console.error("Failed to delete user profile:", error);
      }
    } else {
      console.log("User deletion canceled.");
    }
};
  const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
  return (
    <div className="users-container">
      <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} />
      <h2 className="users-title">User Management</h2>
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>UserId</th>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Password</th> */}
              <th>Shipping Address</th>
              <th>Payment Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.userID}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {/* <td>{user.password}</td> */}
                <td>{user.shippingAddress}</td>
                <td>{user.paymentDetails}</td>
                <td>
                  <button
                  className="card-buttons-delete"
                  onClick={() => handleDeleteUser(user.userID)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="no-users">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UsersPage;