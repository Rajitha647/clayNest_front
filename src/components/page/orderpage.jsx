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
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          const order = data.order || data;
          setOrderDetails(order);
        } else {
          setOrderDetails({ error: data.message || 'Order not found' });
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
        <Typography variant="h5" color="error">{orderDetails.error}</Typography>
      </Box>
    );
  }

  const billing = orderDetails?.billingDetails || {};
  const total = orderDetails?.totalAmount || 0;
  const status = orderDetails?.status || 'Processing';

  return (
    <div>
      <Headernav />
      <Box padding={4}>
        <Typography variant="h4" align="center" marginBottom={4}>
          Order Confirmation
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" fontWeight="bold" marginBottom={2}>
                Billing Details
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
 {orderDetails?.paymentMethod === 'razorpay'
  ? 'Razorpay'
  : orderDetails?.paymentMethod === 'cashOnDelivery'
  ? 'Cash on Delivery'
  : orderDetails?.paymentMethod || 'Unpaid'}

</Typography>


              <Typography variant="h6" fontWeight="bold" marginTop={2}>
                Order Status
              </Typography>
              <Typography>{status}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box textAlign="center" marginTop={4}>
          <Button variant="contained" color="primary" onClick={() => navigate('/home')}>
            Continue Shopping
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Orderpage;
