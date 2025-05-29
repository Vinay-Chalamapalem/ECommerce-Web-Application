import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import "../LoginForm/LoginForm.css";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
 
const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("🚀 User already logged in, redirecting...");
      navigate("/login");
    }
  }, [navigate]);
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
 
  const handleLogin = async (e) => {
    e.preventDefault();
 
    try {
      const response = await axios.post("https://localhost:7162/api/Auth/User_Login", formData);
 
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        throw new Error("Login failed. No token received.");
      }
    } catch (err) {
      setError(err.response?.data || "Invalid email or password. Try again.");
    }
  };
 
  return (
    <div className="wrapper">
      {}
      <div className="admin-button">
        <button onClick={() => navigate("/admin-login")}>👨‍💼</button>
      </div>
 
      <form onSubmit={handleLogin}>
        <h1>User Login</h1>
        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Enter your email" 
            required
            onChange={handleChange}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password" 
            required
            onChange={handleChange}
            style={{ paddingRight: "35px" }}
          />
          <FaLock className="icon" />
          <span
    onClick={togglePasswordVisibility}
    style={{
      position: "absolute",
      right: "50px", 
      top: "55%",
      transform: "translateY(-50%)",
      cursor: "pointer"
    }}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
        </div>
 
        <div className="remember-forgot">
          <label>
            <input type="checkbox" checked={rememberMe} onChange={handleRememberMe} /> Remember Me
          </label>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
 
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}
 
        <button type="submit">Login</button>
        <div className="register-link">
          <p>New user? <Link to="/register">Create an account</Link></p>
        </div>
      </form>
    </div>
  );
};
 
export default LoginForm;