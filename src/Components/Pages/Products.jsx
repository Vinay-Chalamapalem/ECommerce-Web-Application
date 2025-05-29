import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/product.css"; // Import the CSS

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const token = localStorage.getItem("jwtToken");
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7162/api/Admin/Get_All_Products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
 
    fetchProducts();
  }, [token]);
  const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
 
  return (
    <div className="products-container">
      <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} />
      <h2 className="products-title">Products</h2>
      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>ProductId</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.productId}</td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="no-products">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
 
export default Products;