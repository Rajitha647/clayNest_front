import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  Button,
  CircularProgress,
} from '@mui/material';
import Headernav from '../header/headernav';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';


const Orderpage = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const orderId = localStorage.getItem('orderId');
      if (!orderId) {
        setOrderDetails({ error: 'Order ID not found in localStorage' });
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:9000/order/getorder/${orderId}`, {
          method: 'GET',
          headers: {
            'Authorization':` Bearer ${localStorage.getItem('token')}`,  // Assuming you are using JWT
          },
        });

        if (response.ok) {
          const orderData = await response.json();
          setOrderDetails(orderData);
        } else {
          setOrderDetails({ error: 'Order not found or invalid' });
        }
      } catch (error) {
        setOrderDetails({ error: 'Failed to fetch order details' });
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (orderDetails?.error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h5" color="error">
          {orderDetails.error}
        </Typography>
      </Box>
    );
  }

  return (
    <>
    <div>
      <Headernav/>
      <Box padding={4}>
        <Typography variant="h4" align="center" marginBottom={4}>
          Order Details
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" fontWeight="bold" marginBottom={2}>
                Billing Information
              </Typography>
              <Typography>Name: {orderDetails?.billingDetails?.name}</Typography>
              <Typography>Email: {orderDetails?.billingDetails?.email}</Typography>
              <Typography>Address: {orderDetails?.billingDetails?.address}</Typography>
              <Typography>City: {orderDetails?.billingDetails?.city}</Typography>
              <Typography>Zip Code: {orderDetails?.billingDetails?.zipCode}</Typography>
              <Typography>Phone: {orderDetails?.billingDetails?.phone}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" fontWeight="bold" marginBottom={2}>
                Order Summary
              </Typography>
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography>Subtotal</Typography>
                <Typography>₹{(orderDetails?.totalAmount || 0).toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography>Total</Typography>
                <Typography>₹{(orderDetails?.totalAmount || 0).toFixed(2)}</Typography>
              </Box>
              <Box marginTop={2}>
                <Typography variant="h6" fontWeight="bold">
                  Payment Method
                </Typography>
                <Typography>{orderDetails?.paymentMethod === 'razorpay' ? 'Razorpay' : 'Cash on Delivery'}</Typography>
              </Box>
              <Box marginTop={2}>
                <Typography variant="h6" fontWeight="bold">
                  Order Status
                </Typography>
                <Typography>{orderDetails?.status || 'Processing'}</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Box textAlign="center" marginTop={4}>
          <Button variant="contained" color="primary" onClick={() => navigate('/home')}>
            Go to Home
          </Button>
        </Box>
      </Box>
    </div>
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

export default Orderpage;