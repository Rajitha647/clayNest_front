import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "./navbar";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from URL params
  const navigate = useNavigate();

  const [product, setProduct] = useState(null); // State to store product data
  const [message, setMessage] = useState(""); // State to display error/success messages
  const [loading, setLoading] = useState(false); // State to manage loading status

  // Fetch product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product with ID:", id);
        const response = await axios.get(`http://localhost:9000/products/findByid/${id}`);

        if (response.data) {
          setProduct({
            title: response.data.title || "",
            description: response.data.description || "",
            category: response.data.category || "",
            price: response.data.price || "",
            rating: response.data.rating || "",
            stock: response.data.stock || "",
            image: response.data.image || "",
          });
        } else {
          setMessage("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setMessage("Error fetching product data.");
      }
    };

    fetchProduct();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setProduct((prev) => ({ ...prev, [name]: files[0] }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.put(
        `http://localhost:9000/products/updateproducts/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Update response:", response.data); // Debugging log

      alert("Product updated successfully!");
      navigate("/view"); // Redirect to the product view page
    } catch (error) {
      console.error("Error updating product", error);
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner or message if product data is not loaded yet
  if (!product) {
    return (
      <Container className="text-center" style={{ marginTop: "100px" }}>
        {message ? <Alert variant="danger">{message}</Alert> : <Spinner animation="border" />}
      </Container>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <AdminNavbar />
      <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
        <h2 className="text-center" style={{color:"brown",fontFamily:"serif",fontSize:"30px"}}>Edit Product</h2>
        <Form onSubmit={handleSubmit} className="mt-4">
          {/* Product Title */}
          <Form.Group controlId="title" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product title"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Product Description */}
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter product description"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Two Columns: Category and Stock */}
          <div style={{ display: "flex", gap: "10px" }}>
            {/* Product Category */}
            <Form.Group controlId="category" className="mb-3" style={{ flex: "1" }}>
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="kitchenwares">Kitchenwares</option>
                <option value="giftsanddecors">Gifts&Decors</option>
                <option value="lamps">Lamps</option>
                <option value="stove">Stove</option>
              </Form.Select>
            </Form.Group>

            {/* Product Stock */}
            <Form.Group controlId="stock" className="mb-3" style={{ flex: "1" }}>
              <Form.Label>Stock</Form.Label>
              <Form.Select
                name="stock"
                value={product.stock}
                onChange={handleChange}
                required
              >
                <option value="">Select Stock</option>
                <option value="instock">In Stock</option>
                <option value="outofstock">Out of Stock</option>
              </Form.Select>
            </Form.Group>
          </div>

          {/* Two Columns: Price and Rating */}
          <div style={{ display: "flex", gap: "10px" }}>
            {/* Product Price */}
            <Form.Group controlId="price" className="mb-3" style={{ flex: "1" }}>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Product Rating */}
            <Form.Group controlId="rating" className="mb-3" style={{ flex: "1" }}>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                placeholder="Enter product rating"
                name="rating"
                value={product.rating}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>

          {/* Product Image */}
          <Form.Group controlId="image" className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
            {product.image && typeof product.image === "string" && (
              <div className="mt-2">
                <img
                  src={product.image}
                  alt="Current"
                  style={{ maxWidth: "100px" }}
                />
              </div>
            )}
          </Form.Group>

          {/* Update Button */}
          <Button variant="success" type="submit" className="w-100" disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Updating...
              </>
            ) : (
              "Update Product"
            )}
          </Button>
        </Form>

        {/* Message Display */}
        {message && (
          <Alert
            variant={message.includes("success") ? "success" : "danger"}
            className="mt-3 text-center"
          >
            {message}
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default EditProduct;
