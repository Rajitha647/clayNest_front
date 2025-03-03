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
      const response = await axios.post('https://claynest-back.onrender.com/user/login', formData);

      if (response.data.status === 1) {
        localStorage.setItem('userId', response.data.userId);
        const { token, user } = response.data; 

        localStorage.setItem('token', token);

        localStorage.setItem('user', JSON.stringify(user));

        alert(response.data.msg);
        navigate('/home'); 
      } else {
        alert(response.data.msg); 
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

      </Form>
    </div>
  );
}

export default Login;
