import React, { useState } from "react";
import { Form, Button, Alert, Container, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./navbar";
import axios from "axios";

const AddProduct = () => {
  const nav = useNavigate();
  const [user, setUser] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    rating: "",
    stock: "",
    image: null,
  });
  const [message, setMessage] = useState("");
  const [loading, setIsLoading] = useState(false);

  const changeValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const getPic = (e) => {
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const { title, description, category, price, rating, stock, image } = user;

    if (!image) {
      setMessage("Please upload an image.");
      return;
    }

    if (!title || !description || !category || !price || !rating || !stock) {
      setMessage("All fields are required.");
      return;
    }

    if (price <= 0) {
      setMessage("Price must be greater than zero.");
      return;
    }

    if (rating < 0 || rating > 5) {
      setMessage("Rating must be between 0 and 5.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("rating", rating);
    formData.append("stock", stock);
    formData.append("image", image);

    const api = `https://claynest-back.onrender.com/products/addproduct`;

    try {
      setIsLoading(true);
      const response = await axios.post(api, formData);

      if (response.data.status === 1) {
        setMessage("Product added successfully!");
        setUser({
          title: "",
          description: "",
          category: "",
          price: "",
          rating: "",
          stock: "",
          image: null,
        });
        document.getElementById("image").value = null;
        nav("/view");
      } else {
        setMessage(response.data.msg);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.msg ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminNavbar />

      <Container style={{ maxWidth: "600px" }}>
        <h2 className="text-center" style={{color:"brown",fontFamily:"serif",fontSize:"30px"}}>Add Product</h2>
        <Form onSubmit={handleSubmit} className="mt-4">
          <Row className="mb-3">
            <Col sm={6}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product title"
                  name="title"
                  value={user.title || ""}
                  onChange={changeValue}
                  required
                  style={{ marginBottom: "10px" }}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={user.category || ""}
                  onChange={changeValue}
                  required
                  style={{ marginBottom: "10px" }}
                >
                  <option value="">Select Category</option>
                  <option value="kitchenwares">Kitchenwares</option>
                  <option value="giftsanddecors">Gifts&Decors</option>
                  <option value="lamps">Lamps</option>
                  <option value="stove">Stove</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col sm={6}>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product price"
                  name="price"
                  value={user.price || ""}
                  onChange={changeValue}
                  required
                  style={{ marginBottom: "10px" }}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="stock">
                <Form.Label>Stock</Form.Label>
                <Form.Select
                  name="stock"
                  value={user.stock || ""}
                  onChange={changeValue}
                  required
                  style={{ marginBottom: "10px" }}
                >
                  <option value="">Select Stock</option>
                  <option value="instock">In Stock</option>
                  <option value="outofstock">Out of Stock</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col sm={6}>
              <Form.Group controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  placeholder="Enter product rating"
                  name="rating"
                  value={user.rating || ""}
                  onChange={changeValue}
                  required
                  style={{ marginBottom: "10px" }}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={getPic}
                  required
                  style={{ marginBottom: "10px" }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter product description"
              name="description"
              value={user.description || ""}
              onChange={changeValue}
              required
              style={{ marginBottom: "10px" }}
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100" disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Adding...
              </>
            ) : (
              "Add Product"
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

export default AddProduct;
