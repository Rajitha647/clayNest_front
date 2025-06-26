import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Col, Row, Button } from 'react-bootstrap';
import './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/user/login', formData);

      if (response.data.status === 1) {
        // Store user ID and token in localStorage
        localStorage.setItem('userId', response.data.userId);
        const { token, user } = response.data; // assuming the response includes the token and user data

        // Store token in localStorage
        localStorage.setItem('token', token);

        // Store user information in localStorage
        localStorage.setItem('user', JSON.stringify(user));

        alert(response.data.msg);
        navigate('/home'); // Navigate to home on successful login
      } else {
        alert(response.data.msg); // Display error message if login fails
      }
    } catch (error) {
      console.error('Error during login', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="form-container" style={{ paddingBottom: '100px' }}>
      <Form onSubmit={handleSubmit} className="form">
        <h2 className="form-heading">Login</h2>

        <Form.Group as={Row} className="mb-3" controlId="email">
          <Form.Label column sm="3">Email:</Form.Label>
          <Col sm="9">
            <Form.Control
              type="email"
              placeholder="email@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="password">
          <Form.Label column sm="3">Password:</Form.Label>
          <Col sm="9">
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Button variant="warning" type="submit" className="submit-btn">Login</Button>

        <p style={{ display: 'flex', justifyContent: 'center' }}>
          Don't have an account? Please <a href="/signup">SIGN UP</a>
        </p>
      </Form>
    </div>
  );
}

export default Login;
