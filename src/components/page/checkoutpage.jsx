import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import Headernav from '../header/headernav';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';



const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems'));
    return state?.cartItems || savedCart || [];
  });

  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [totals, setTotals] = useState({ subtotal: 0, shipping: 50, total: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotals((prevTotals) => ({
      ...prevTotals,
      subtotal,
      total: subtotal + prevTotals.shipping,
    }));
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const handleBillingChange = (e) => {
    setBillingDetails({
      ...billingDetails,
      [e.target.name]: e.target.value,
    });
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

    try {
      setLoading(true);
      const response = await fetch('https://claynest-back.onrender.com/order/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('orderId', data.orderId);
        navigate('/order');
      } else {
        throw new Error(data.message || 'Error placing the order.');
      }
    } catch (error) {
      alert('Failed to place the order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div>
      <Headernav />
      <Box padding={4}>
        <Typography variant="h4" align="center" marginBottom={4}>
          Checkout
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" fontWeight="bold" marginBottom={2}>
                Billing Information
              </Typography>
              <TextField
                label="Full Name"
                name="name"
                value={billingDetails.name}
                onChange={handleBillingChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email Address"
                name="email"
                value={billingDetails.email}
                onChange={handleBillingChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                name="address"
                value={billingDetails.address}
                onChange={handleBillingChange}
                fullWidth
                margin="normal"
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="City/District"
                    name="city"
                    value={billingDetails.city}
                    onChange={handleBillingChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Zip Code"
                    name="zipCode"
                    value={billingDetails.zipCode}
                    onChange={handleBillingChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <TextField
                label="Phone Number"
                name="phone"
                value={billingDetails.phone}
                onChange={handleBillingChange}
                fullWidth
                margin="normal"
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" fontWeight="bold" marginBottom={2}>
                Order Summary
              </Typography>
              {cartItems.map((item) => (
                <Box key={item.productId} display="flex" justifyContent="space-between" marginBottom={1}>
                  <Typography>{item.productName}</Typography>
                  <Typography>₹{(item.price * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography>Subtotal</Typography>
                <Typography>₹{(totals.subtotal || 0).toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography>Shipping</Typography>
                <Typography>₹{(totals.shipping || 0).toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography>Total</Typography>
                <Typography>₹{(totals.total || 0).toFixed(2)}</Typography>
              </Box>
              <Typography variant="h6" fontWeight="bold" marginTop={4} marginBottom={2}>
                Payment Method
              </Typography>
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

export default CheckoutPage;
