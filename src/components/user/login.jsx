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
<<<<<<< HEAD
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
=======
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, formData);

      if (response.data.status === 1) {
        localStorage.setItem('userId', response.data.userId);
        const { token, user } = response.data; 

        localStorage.setItem('token', token);

        localStorage.setItem('user', JSON.stringify(user));

        alert(response.data.msg);
        navigate('/home'); 
      } else {
        alert(response.data.msg); 
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
      }
    } catch (error) {
      console.error('Error during login', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
<<<<<<< HEAD
=======
    
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
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
<<<<<<< HEAD

        <p style={{ display: 'flex', justifyContent: 'center' }}>
          Don't have an account? Please <a href="/signup">SIGN UP</a>
        </p>
=======
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', fontSize: '16px', color: '#333' }}>
  Dont't have an account? Please
  <a
    href="/signup"
    style={{
      textDecoration: 'none',
      color: '#007BFF',
      fontWeight: 'bold',
    }}
    onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
    onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
  >
    Signup
  </a>
</p>

>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
      </Form>
    </div>
  );
}

export default Login;
