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
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7162/api/Admin/Get_All_Admins",
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
 
    fetchAdmins();
  }, [token]);
 
const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
 
 
  return (
    <div className="users-container">
     
<Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
 
      <h2 className="users-title">Admins</h2>
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>AdminId</th>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Password</th> */}
              {/* <th>Shipping Address</th>
              <th>Payment Details</th> */}
            </tr>
          </thead>
          <tbody>
            {users.map((admin, index) => (
              <tr key={index}>
                <td>{admin.adminID}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                {/* <td>{user.password}</td> */}
                {/* <td>{user.shippingAddress}</td>
                <td>{user.paymentDetails}</td> */}
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