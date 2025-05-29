import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import defaultAvatar from "../Assets/avatar.png";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to log in first!");
      navigate("/login");
      return;
    }

    try {
      fetch("https://localhost:7162/api/User/User_Account", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setUpdatedUser({ ...data });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setError("Failed to load profile. Please try again.");
          setLoading(false);
        });

    } catch (error) {
      console.error("Invalid Token!", error);
      alert("Session expired or invalid token. Please log in again.");
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");

    fetch("https://localhost:7162/api/User/Edit_Account", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setUpdatedUser({ ...data });
        setEditing(false);
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      const token = localStorage.getItem("token");

      fetch("https://localhost:7162/api/User/Delete_Account", {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      })
        .then(() => {
          localStorage.removeItem("token");
          alert("Account deleted successfully. Redirecting to login...");
          navigate("/login");
        })
        .catch((error) => console.error("Error deleting account:", error));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    alert("You have been logged out.");
    navigate("/login"); // Redirect to login page
  };

  const handlePasswordChange = () => {
    setChangingPassword(true);
  };

  const handlePasswordSubmit = () => {
    const token = localStorage.getItem("token");

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    const passwordUpdateRequest = {
      name: user.name,
      email: user.email,
      password: passwords.newPassword, // Only new password is sent
      shippingAddress: user.shippingAddress || "NA",
      paymentDetails: user.paymentDetails || "NA",
    };

    fetch("https://localhost:7162/api/User/Edit_Account", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(passwordUpdateRequest),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Password Update Response:", data);
        alert("Password updated successfully!");
        setChangingPassword(false);
        setPasswords({ newPassword: "", confirmPassword: "" });
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        alert("Failed to update password. Please try again.");
      });
  };

  const handleViewOrders = () => {
    navigate("/orders"); // ✅ Navigate to Orders page
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  return (
    
    <div className="profile-container">
      <h2>User Profile</h2>

      {user ? (
        <div className="profile-details">
          <img src={defaultAvatar} alt="Profile" className="profile-img" />
          
          {editing ? (
  <>
    <label><strong>Name:</strong></label>
    <input 
      type="text" 
      placeholder="Enter your name" /* ✅ Placeholder added */
      value={updatedUser.name} 
      onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })} 
    />

    <label><strong>Email:</strong></label>
    <input 
      type="email" 
      placeholder="Enter your email address" /* ✅ Placeholder added */
      value={updatedUser.email} 
      onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })} 
    />

    <label><strong>Shipping Address:</strong></label>
    <input 
  type="text" 
  placeholder="Enter your shipping address" 
  value={updatedUser.shippingAddress || ""} 
  onChange={(e) => setUpdatedUser({ ...updatedUser, shippingAddress: e.target.value })} 
/>

    <label><strong>Payment Details:</strong></label>
    <input 
  type="text" 
  placeholder="Enter payment details" 
  value={updatedUser.paymentDetails || ""} 
  onChange={(e) => setUpdatedUser({ ...updatedUser, paymentDetails: e.target.value })} 
/>

    <button onClick={handleSave} className="save-btn">✅ Save Changes</button>
    <button onClick={() => setEditing(false)} className="cancel-btn">❌ Cancel</button>
  </>
) : (
  <>
    <p><strong>Name:</strong> {user.name}</p>
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Address:</strong> {user.shippingAddress ? user.shippingAddress : "NA"}</p>
    <p><strong>Payment Details:</strong> {user.paymentDetails ? user.paymentDetails : "NA"}</p>
    <button onClick={handleLogout} className="logout-btn">Logout</button>
    <button onClick={handleEdit} className="edit-btn">Edit Profile</button>
  </>
)}

          {/* ✅ New "View Your Orders" Button */}
          <button className="view-orders-btn" onClick={handleViewOrders}>
            📦 View Your Orders
          </button>

          {changingPassword ? (
            <>
              <input type="password" placeholder="New Password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} />
              <input type="password" placeholder="Confirm Password" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} />
              <button onClick={handlePasswordSubmit} className="save-btn">Update Password</button>
              <button onClick={() => setChangingPassword(false)} className="cancel-btn">❌ Cancel</button>
            </>
          ) : (
            <p><strong>Password:</strong> ******** <button onClick={handlePasswordChange} className="edit-btn">Change Password</button></p>
          )}

          <button onClick={handleDelete} className="delete-btn">Delete Account</button>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
