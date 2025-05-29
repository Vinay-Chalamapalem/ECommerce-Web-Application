import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "../LoginForm/LoginForm.css";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7162/api/Auth/User_Registration", formData);

      if (response.status === 200) {
        setSuccessMessage("Registration successful! Redirecting to Login...");

        // Wait for 2 seconds before redirecting to login
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.response?.data || "Failed to register. Please try again.");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="input-box">
          <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <FaEnvelope className="icon" />
        </div>
        <div className="input-box">
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <FaLock className="icon" />
        </div>

        {/* Show error message if registration fails */}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {/* Show success message before redirecting */}
        {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}

        <button type="submit">Register</button>
        <div className="register-link">
          <p>Already registered? <Link to="/login">Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
