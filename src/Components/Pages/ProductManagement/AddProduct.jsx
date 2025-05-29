import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Pages/Navbar";
import Sidebar from "../../Pages/Sidebar";
import "../../styles/productManagement.css";
 
const AddProduct = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    price: "",
    description:"",
    quantity: "",
    category: "",
  });
  const [message, setMessage] = useState("");
 
  const handleAddProduct = async (e) => {
    e.preventDefault();
 
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        "https://localhost:7162/api/ProductManagement/Add_Products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newProduct),
        }
      );
 
      if (response.ok) {
        setMessage("Product added successfully!");
        setTimeout(() => {
          setMessage("");
          navigate("/productmanagement");
        }, 3000);
      } else {
        console.error("Error adding product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
 
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
 
  return (
    <div className="product-container">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <br />
      <br />
      <h1>Add Product</h1>
      <form onSubmit={handleAddProduct} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            value={newProduct.productName}
            onChange={(e) =>
              setNewProduct({ ...newProduct, productName: e.target.value })
            }
            placeholder="Product Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (₹)</label>
          <input
            type="text"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            placeholder="Price"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            placeholder="Category"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            placeholder="Description"
            required
          />
        </div>
       
        <div className="form-group">
          <label htmlFor="imageURL">Image URL</label>
          <input
            type="text"
            value={newProduct.imageURL}
            onChange={(e) =>
              setNewProduct({ ...newProduct, imageURL: e.target.value })
            }
            placeholder="Image URL"
          />
        </div>
 
        {message && <p className="success-message">{message}</p>}
 
        <div className="button-group">
          <button type="submit">Add</button>
          <button type="button" onClick={() => navigate("/productmanagement")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
 
export default AddProduct;