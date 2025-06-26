<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Paper, Divider, CircularProgress } from '@mui/material';
import Headernav from '../header/headernav';

const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserOrders = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setOrders([]);
=======
import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setError("You are not logged in. Please log in to view your orders.");
        setLoading(false);
        return;
      }

      const userId = JSON.parse(storedUser)?._id;
      if (!userId) {
        setError("Invalid user ID. Please log in again.");
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
        setLoading(false);
        return;
      }

      try {
<<<<<<< HEAD
        const response = await fetch(`http://localhost:9000/order/getorders/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setOrders(data.orders || []);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setOrders([]);
=======
        const response = await axios.get(`https://claynest-back.onrender.com/order/getorders/${userId}`);
        setOrders(response.data.orders || []);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
      } finally {
        setLoading(false);
      }
    };

<<<<<<< HEAD
    fetchUserOrders();
=======
    fetchOrders();
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
  }, []);

  if (loading) {
    return (
<<<<<<< HEAD
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
=======
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
    );
  }

  return (
<<<<<<< HEAD
    <div>
      <Headernav />
      <Box padding={4}>
        <Typography variant="h4" align="center" marginBottom={4}>
          My Orders
        </Typography>

        {orders.length === 0 ? (
          <Typography variant="h6" align="center">No orders found.</Typography>
        ) : (
          orders.map((order, index) => {
            const billing = order.billingDetails || {};
            const total = order.totalAmount || 0;
            const status = order.status || 'Processing';

            return (
              <Grid container spacing={4} key={index} sx={{ marginBottom: 4 }}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={3} sx={{ padding: 3 }}>
                    <Typography variant="h6" fontWeight="bold" marginBottom={2}>
                      Address
                    </Typography>
                    <Typography>Name: {billing.name || '-'}</Typography>
                    <Typography>Email: {billing.email || '-'}</Typography>
                    <Typography>Address: {billing.address || '-'}</Typography>
                    <Typography>City: {billing.city || '-'}</Typography>
                    <Typography>Zip Code: {billing.zipCode || '-'}</Typography>
                    <Typography>Phone: {billing.phone || '-'}</Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper elevation={3} sx={{ padding: 3 }}>
                    <Typography variant="h6" fontWeight="bold" marginBottom={2}>
                      Order Summary
                    </Typography>
                    <Box display="flex" justifyContent="space-between" marginBottom={1}>
                      <Typography>Total Amount</Typography>
                      <Typography>₹{total.toFixed(2)}</Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" fontWeight="bold" marginTop={2}>
                      Payment Method
                    </Typography>
                    <Typography>
                      {order.paymentMethod === 'paypal'
                        ? 'PayPal'
                        : order.paymentMethod === 'cashOnDelivery'
                        ? 'Cash on Delivery'
                        : order.paymentMethod || 'Unknown'}
                    </Typography>

                    <Typography variant="h6" fontWeight="bold" marginTop={2}>
                      Order Status
                    </Typography>
                    <Typography>{status}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            );
          })
        )}
      </Box>
    </div>
  );
};

export default Myorders;
=======
    <>
    <Container style={{ marginTop: "50px" }}>
      <h2 className="text-center mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <Alert variant="info" className="text-center">You have no orders yet.</Alert>
      ) : (
        <Row>
          <Col xs={12}>
            {/* 📌 Scrollable table on small screens */}
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total Amount</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>{order._id}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>{order.status}</td>
                      <td>₹{order.totalAmount.toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => alert(`Details for Order ID: ${order._id}`)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      )}
    </Container>
    <footer className="footer">
        <Container>
          <Row className="justify-content-center text-center">
            <Col xs={12} sm={6} md={4} lg={3}>
              <p>&copy; {new Date().getFullYear()} ClayNest. All Rights Reserved.</p>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              <p><MailOutlineIcon fontSize="small" /> claynest@gmail.com</p>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              <p><LocalPhoneIcon fontSize="small" /> 8606454877</p>
            </Col>
          </Row>
        </Container>
      </footer>
      </>
  );
};

export default MyOrders;
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
