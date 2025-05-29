import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../Pages/Navbar";
import Sidebar from "../../Pages/Sidebar";
import "../../styles/productManagement.css";
 
const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(location.state?.product || null);
  const [message, setMessage] = useState("");
 
  const handleUpdate = async (e) => {
    e.preventDefault();
 
    try {
      const token = localStorage.getItem("jwtToken");
 
      const response = await fetch(
        `https://localhost:7162/api/ProductManagement/Edit_Product/${editProduct.productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editProduct),
        }
      );
 
      if (response.ok) {
        setMessage("Product edited successfully!");
        setTimeout(() => {
          setMessage("");
          navigate("/productmanagement");
        }, 3000);
      } else {
        console.error("Error updating product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
 
  if (!editProduct) {
    return <p>Loading product details...</p>;
  }
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
 
  return (
    <div className="product-container">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <br />
      <br />
      <h1>Edit Product</h1>
      <form onSubmit={handleUpdate} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            type="text"
            value={editProduct.name || ""}
            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
            required
          />
        </div>
 
        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input
            id="price"
            type="number"
            value={editProduct.price || ""}
            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
            required
          />
        </div>
 
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            value={editProduct.category || ""}
            onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={editProduct.description || ""}
            onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
            required
          />
        </div>
 
        <div className="form-group">
          <label htmlFor="imageURL">Image URL</label>
          <input
            id="imageURL"
            type="text"
            value={editProduct.imageURL || ""}
            onChange={(e) => setEditProduct({ ...editProduct, imageURL: e.target.value })}
          />
        </div>
 
        {message && <p className="success-message">{message}</p>}
 
        <div className="button-group">
          <button type="submit">Update</button>
          <button type="button" onClick={() => navigate("/productmanagement")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
 
export default EditProduct;