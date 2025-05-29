import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
 
import "./AdminLogin.css"; // Link your CSS file
 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
 
 
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
 
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://localhost:7162/api/Auth/Admin_Login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("jwtToken", data.token);
      navigate("/admin-dashboard");
    } else {
      alert("Login failed!");
    }
  };
 
  return (
    <div className="login-container">
        <div className="admin-button">
        <button onClick={() => navigate("/login")}>👨🏼</button>
      </div>
      <form onSubmit={handleLogin} className="login-form">
        <h2>Admin Login</h2>
        <div className="ainput-box">
          <FaUser className="aicon-right" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="ainput-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ paddingRight: "35px" }}
            required
          />
          <FaLock className="aicon-right" />
          <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "50px", // Adjust spacing as needed
                top: "55%",
                transform: "translateY(-50%)",
                cursor: "pointer"
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};
 
export default Login;