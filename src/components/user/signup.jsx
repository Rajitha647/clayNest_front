import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Col, Row, Button } from 'react-bootstrap';
<<<<<<< HEAD
import './signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
=======
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570

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
<<<<<<< HEAD
=======
    setErrorMessage('');
    setSuccessMessage('');
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
    console.log('Sending data:', formData);

    try {
      const response = await axios.post(
<<<<<<< HEAD
        'http://localhost:9000/user/register',
=======
        `${import.meta.env.VITE_API_URL}/user/register`,
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
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
<<<<<<< HEAD
        alert(response.data.msg);
        nav('/login');
=======
        setSuccessMessage(response.data.msg || 'Registered successfully!');
         nav('/login');
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
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
<<<<<<< HEAD
          <Form.Label column sm="3">
            Fullname:
          </Form.Label>
=======
          <Form.Label column sm="3">Fullname:</Form.Label>
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
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
<<<<<<< HEAD
          <Form.Label column sm="3">
            Phone no:
          </Form.Label>
=======
          <Form.Label column sm="3">Phone no:</Form.Label>
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
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
<<<<<<< HEAD
          <Form.Label column sm="3">
            Email:
          </Form.Label>
=======
          <Form.Label column sm="3">Email:</Form.Label>
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
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
<<<<<<< HEAD
          <Form.Label column sm="3">
            Create Password:
          </Form.Label>
=======
          <Form.Label column sm="3">Create Password:</Form.Label>
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
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
<<<<<<< HEAD
        {error && <p className="error-message">{error}</p>}
        {msg && <p className="success-message">{msg}</p>}
        <p style={{ display: 'flex', justifyContent: 'center' }}>
          Already have an account? Please <a href="/login">LOGIN</a>
=======

        {error && <p className="error-message">{error}</p>}
        {msg && <p className="success-message">{msg}</p>}

        <p className="redirect-text">
          Already have an account? Please{' '}
          <a href="/login" className="login-link">LOGIN</a>
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
        </p>
      </Form>
    </div>
  );
}

export default Signup;
