import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Grid, Typography, TextField, Button, Paper, Divider,
  FormControl, InputLabel, Select, MenuItem, CircularProgress
} from '@mui/material';
import Headernav from '../header/headernav';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [billingDetails, setBillingDetails] = useState({
    name: '', email: '', address: '', city: '', zipCode: '', phone: ''
  });
  const [cartItems, setCartItems] = useState(state?.cartItems || []);
  const [totals, setTotals] = useState({ subtotal: 0, shipping: 50, total: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state?.cartItems) navigate('/cart');
  }, [state, navigate]);

  useEffect(() => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const total = subtotal + totals.shipping;
    setTotals(prev => ({ ...prev, subtotal, total }));
  }, [cartItems]);

  const handleBillingChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = async () => {
  const missingFields = Object.entries(billingDetails)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
    return;
  }

  if (!paymentMethod) {
    alert('Please select a payment method.');
    return;
  }

  if (cartItems.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  const orderData = {
    userId: localStorage.getItem('userId'),
    billingDetails,
    paymentMethod,
    products: cartItems.map((item) => ({
      productId: item.productId._id || item.productId,
      quantity: item.quantity,
    })),
    totalAmount: totals.total,
  };

  if (paymentMethod === 'razorpay') {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch("http://localhost:9000/payment/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: totals.total * 100,
          currency: "INR",
        }),
      });

      const { success, order } = await response.json();

      if (!success) {
        return alert("Failed to initiate payment.");
      }

      const options = {
        key: "rzp_test_iPdPcPKICe3U1U", // Replace with your Razorpay key
        amount: order.amount,
        currency: order.currency,
        name: "ClayNest Store",
        description: "Payment for Order",
        order_id: order.id,
        handler: async function (response) {
          // Verify payment
          const verifyRes = await fetch("http://localhost:9000/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            const finalOrder = await fetch('http://localhost:9000/order/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                ...orderData,
                paymentStatus: 'Paid',
                transactionId: response.razorpay_payment_id,
              }),
            });

            const finalOrderRes = await finalOrder.json();
            localStorage.setItem('orderId', finalOrderRes.orderId);
            navigate('/order');
          } else {
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: billingDetails.name,
          email: billingDetails.email,
          contact: billingDetails.phone,
        },
        theme: {
          color: "#303972",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
    }
  } else if (paymentMethod === 'cashOnDelivery') {
    try {
      const response = await fetch('http://localhost:9000/order/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      localStorage.setItem('orderId', data.orderId);
      navigate('/confirmorder');
    } catch (err) {
      alert("Failed to place the order.");
    }
  }
};

  return (
    <div>
      <Headernav />
      <Box padding={4}>
        <Typography variant="h4" align="center" marginBottom={4}>Checkout</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" fontWeight="bold" marginBottom={2}>Billing Information</Typography>
              <TextField label="Full Name" name="name" value={billingDetails.name} onChange={handleBillingChange} fullWidth margin="normal" />
              <TextField label="Email Address" name="email" value={billingDetails.email} onChange={handleBillingChange} fullWidth margin="normal" />
              <TextField label="Address" name="address" value={billingDetails.address} onChange={handleBillingChange} fullWidth margin="normal" />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField label="City/District" name="city" value={billingDetails.city} onChange={handleBillingChange} fullWidth margin="normal" />
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Zip Code" name="zipCode" value={billingDetails.zipCode} onChange={handleBillingChange} fullWidth margin="normal" />
                </Grid>
              </Grid>
              <TextField label="Phone Number" name="phone" value={billingDetails.phone} onChange={handleBillingChange} fullWidth margin="normal" />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" fontWeight="bold" marginBottom={2}>Order Summary</Typography>
              {cartItems.map(item => (
                <Box key={item.productId._id || item.productId} display="flex" justifyContent="space-between" marginBottom={1}>
                  <Typography>{item.productName}</Typography>
                  <Typography>₹{(item.price * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography>Subtotal</Typography>
                <Typography>₹{totals.subtotal.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography>Shipping</Typography>
                <Typography>₹{totals.shipping.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography>Total</Typography>
                <Typography>₹{totals.total.toFixed(2)}</Typography>
              </Box>

              <Typography variant="h6" fontWeight="bold" marginTop={4} marginBottom={2}>Payment Method</Typography>
              <FormControl fullWidth>
                <InputLabel>Payment Method</InputLabel>
                <Select value={paymentMethod} onChange={handlePaymentChange}>
                  <MenuItem value="razorpay">Razorpay</MenuItem>
                  <MenuItem value="cashOnDelivery">Cash on Delivery</MenuItem>
                </Select>
              </FormControl>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 4 }}
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Place Order'}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CheckoutPage;
