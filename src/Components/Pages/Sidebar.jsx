import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";
 
const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li>
          <Link to="/usermanagement">User Management</Link>
        </li>
        <li>
          <Link to="/productmanagement">Product Management</Link>
        </li>
        <li>
          <Link to="/ordermanagement">Order Management</Link>
        </li>
      </ul>
    </div>
  );
};
 
export default Sidebar;