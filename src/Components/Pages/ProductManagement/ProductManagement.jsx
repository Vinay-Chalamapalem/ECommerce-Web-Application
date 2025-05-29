import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Pages/Navbar";
import Sidebar from "../../Pages/Sidebar";
import "../../styles/productManagement.css";
 
const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 
  useEffect(() => {
    fetchProducts();
  }, []);
 
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        "https://localhost:7162/api/Admin/Get_All_Products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
 
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Error fetching products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
 
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return; // If user clicks 'No', exit the function
  
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        `https://localhost:7162/api/ProductManagement/Delete_Product/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        fetchProducts();
      } else {
        console.error("Error deleting product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  
 
const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    };
   
 
  return (
    <div className="product-page-container">
       
  <Navbar toggleSidebar={toggleSidebar} />
  <Sidebar isOpen={isSidebarOpen} />
 
      <div className="products-header">
        <h2 className="products-title">Product Management</h2>
        <button
          onClick={() => navigate("/add-product")}
          className="add-product-button"
        >
          + Add Product
        </button>
      </div>
      <div className="products-card-container">
        {products.map((product) => (
          <div key={product.productId} className="product-card">
            <img src={`${product.imageURL}`} alt={product.name} />
 
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <p>{product.category}</p>
            <div className="card-buttons">
              <button
                className="edit"
                onClick={() =>
                  navigate("/edit-product", { state: { product } })
                }
              >
                Edit
              </button>
              <button
                className="delete"
                onClick={() => handleDelete(product.productId)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default Products;
 