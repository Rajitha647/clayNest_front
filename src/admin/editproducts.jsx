import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "./navbar";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
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
        setMessage("Error fetching product data.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setProduct((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(product).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await axios.put(
        `http://localhost:9000/products/updateproducts/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Product updated successfully!");
      navigate("/view");
    } catch (error) {
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

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
        <h2 className="text-center" style={{ color: "brown", fontFamily: "serif", fontSize: "30px" }}>
          Edit Product
        </h2>
        <Form onSubmit={handleSubmit} className="mt-4">
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
          <div style={{ display: "flex", gap: "10px" }}>
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
          <div style={{ display: "flex", gap: "10px" }}>
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
                <img src={product.image} alt="Current" style={{ maxWidth: "100px" }} />
              </div>
            )}
          </Form.Group>
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
