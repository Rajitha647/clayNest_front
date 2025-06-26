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
        setLoading(false);
        return;
      }

      try {
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
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
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
