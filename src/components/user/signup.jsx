import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Col, Row, Button } from 'react-bootstrap';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    email: '',
    password: '',
  });

  const [error, setErrorMessage] = useState('');
  const [msg, setSuccessMessage] = useState('');
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending data:', formData);

    try {
      const response = await axios.post(
        'https://claynest-back.onrender.com/user/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', response.data);

      if (response.data.status === 1) {
        localStorage.setItem('userId', response.data.userId);
        alert(response.data.msg);
        nav('/login');
      } else {
        setErrorMessage(response.data.msg || 'Failed to register');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setErrorMessage(error.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    
    <div className="form-container">
      <Form onSubmit={handleSubmit} className="form">
        <h2 className="form-heading">Create Account</h2>

        <Form.Group as={Row} className="mb-3" controlId="fullname">
          <Form.Label column sm="3">
            Fullname:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="phone">
          <Form.Label column sm="3">
            Phone no:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="tel"
              placeholder="Enter your phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="email">
          <Form.Label column sm="3">
            Email:
          </Form.Label>
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
          <Form.Label column sm="3">
            Create Password:
          </Form.Label>
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

        <Button variant="success" type="submit" className="submit-btn">
          Sign Up
        </Button>
        {error && <p className="error-message">{error}</p>}
        {msg && <p className="success-message">{msg}</p>}
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', fontSize: '16px', color: '#333' }}>
  Already have an account? Please
  <a
    href="/login"
    style={{
      textDecoration: 'none',
      color: '#007BFF',
      fontWeight: 'bold',
    }}
    onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
    onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
  >
    LOGIN
  </a>
</p>

      </Form>
    </div>
  );
}

export default Signup;
