import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
// import Header from "../Header/Header";

const Dashboard = ({ selectedCategory, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // ✅ Corrected state variable names
  // const [currentCategory, setCurrentCategory] = useState("All");
  // const [currentSearchQuery, setCurrentSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);

    let apiEndpoint = "https://localhost:7162/api/ProductManagement/All_Products";

    if (searchQuery) {
      apiEndpoint = `https://localhost:7162/api/ProductManagement/Search_By_Name?Name=${searchQuery}`;
    } else if (selectedCategory !== "All") {
      apiEndpoint = `https://localhost:7162/api/ProductManagement/Search_By_Category?category=${selectedCategory}`;
    }

    fetch(apiEndpoint)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status} (${res.statusText})`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
        setLoading(false);
      });
  }, [selectedCategory, searchQuery]); // ✅ Ensure correct dependency tracking

  return (
    // <div>
    //   {/* ✅ Passed correct state update functions */}
    //   <Header setSelectedCategory={setCurrentCategory} setSearchQuery={setCurrentSearchQuery} />
      
      <div className="dashboard-container">
        <h2>
          {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory === "All" ? "All Products" : `${selectedCategory} Products`}
        </h2>

        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found! Coming soon...</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.productId} className="product-card" onClick={() => navigate(`/product/${product.productId}`)}>
                <img src={product.imageURL || "default-product.png"} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    // </div>
  );
};

export default Dashboard;
