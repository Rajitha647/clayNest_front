import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://claynest-back.onrender.com/products/getproducts");
        if (response.data.status === 1) {
          setProducts(response.data.data);
        } else {
          setError("Failed to fetch products.");
        }
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const navigate = useNavigate(); 

  const handleEdit = (productId) => {
    navigate(`/edit/${productId}`);  
  };


  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    
    if (confirmDelete) {
      console.log("Deleting product with ID:", productId);  
      try {
        const response = await axios.delete(`https://claynest-back.onrender.com/products/deleteproducts/${productId}`);
        if (response.data.status === 1) {
          setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
          alert("Product deleted successfully.");
        } else {
          setError("Failed to delete the product. Please try again later.");
        }
      } catch (err) {
        console.error("Error deleting product:", err);
        if (err.response) {
          setError(`Error: ${err.response.data.message || 'Failed to delete product'}`);
        } else {
          setError("Network error. Please check your connection.");
        }
      }
    }
  };
  
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{color:"brown",fontFamily:"serif",fontSize:"30px"}}>Product List</h2>
      {loading ? (  
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : products.length > 0 ? (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src={`https://claynest-back.onrender.com/uploads/${product.image}`}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: "150px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-truncate" style={{display:"flex",justifyContent:"center"}}>{product.title}</h5>
                  <p className="card-text">
                    <strong>Description:</strong> {product.description}
                    <br />
                    <strong>Category:</strong> {product.category}
                    <br />
                    <strong>Price:</strong> <CurrencyRupeeIcon fontSize="small"/>{product.price}
                    <br />
                    <strong>Rating:</strong> {product.rating} / 5
                    <br />
                    <strong>Stock:</strong> {product.stock}
                  </p>
                   <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleEdit(product._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductList;
