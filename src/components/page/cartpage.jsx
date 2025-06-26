import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Divider,
  MenuItem,
  Select,
<<<<<<< HEAD
=======
  useMediaQuery
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import Headernav from '../header/headernav';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD

const CartPage = () => {
  const nav = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, delivery: 50 });
  const userId = localStorage.getItem('userId'); // Replace with dynamic user ID logic

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/cart/${userId}`);
=======
import { useTheme } from '@mui/material/styles';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';


const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, delivery: 50, gst: 0, total: 0 });
  const userId = localStorage.getItem('userId');
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`https://claynest-back.onrender.com/cart/${userId}`);
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
      setCartItems(response.data.cart);
      calculateTotals(response.data.cart);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
<<<<<<< HEAD
    setTotals({ subtotal, delivery: 50 });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:9000/cart/${userId}/${productId}`);
=======
    const gst = subtotal * 0.18;
    const total = subtotal + totals.delivery + gst;
    setTotals({ subtotal, delivery: 50, gst, total });
  };

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`https://claynest-back.onrender.com/cart/${userId}/${productId}`);
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
<<<<<<< HEAD
      await axios.patch(`http://localhost:9000/cart/${userId}`, { productId, quantity: newQuantity });
      fetchCartItems();
=======
      await axios.patch(`https://claynest-back.onrender.com/cart/${userId}`, { productId, quantity: newQuantity });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      calculateTotals(cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      ));
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

<<<<<<< HEAD
  return (
    <div>
      <Headernav />
      <Box padding={4}>
=======
  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems } });
  };

  return (
    <>
    <div>
      <Headernav />
      <Box padding={isMobile ? 2 : 4}>
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
        <Typography variant="h4" align="center" marginBottom={4}>
          Shopping Cart
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
<<<<<<< HEAD
            <Paper elevation={3} sx={{ padding: 2 }}>
=======
            <Paper elevation={3} sx={{ padding: isMobile ? 1 : 2 }}>
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
              {cartItems.length === 0 ? (
                <Typography
                  variant="h6"
                  align="center"
                  color="textSecondary"
                  sx={{ padding: 4 }}
                >
<<<<<<< HEAD
                  No items added to the cart.
=======
                  No items in your cart. Start shopping!
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
                </Typography>
              ) : (
                cartItems.map((item) => (
                  <Box
                    key={item.productId}
                    display="flex"
<<<<<<< HEAD
                    alignItems="center"
=======
                    flexDirection={isMobile ? "column" : "row"}
                    alignItems={isMobile ? "flex-start" : "center"}
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
                    justifyContent="space-between"
                    paddingY={2}
                    borderBottom="1px solid #ddd"
                  >
<<<<<<< HEAD
                    <Box display="flex" alignItems="center">
                      <img
                        src={`http://localhost:9000/uploads/${item.image}`}
                        alt={item.productName}
                        style={{ width: 100, height: 80, borderRadius: 8, marginRight: 16 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
=======
                    <Box display="flex" alignItems="center" flex={isMobile ? "1 1 100%" : "1 1 auto"}>
                      <img
                        src={`https://claynest-back.onrender.com/uploads/${item.image}`}
                        alt={item.productName}
                        style={{
                          width: isMobile ? 80 : 100,
                          height: isMobile ? 60 : 80,
                          borderRadius: 8,
                          marginRight: 16,
                        }}
                      />
                      <Box>
                        <Typography variant={isMobile ? "subtitle2" : "subtitle1"} fontWeight="bold">
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
                          {item.productName}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" color="primary">
                          ₹{item.price.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
<<<<<<< HEAD
                    <Box display="flex" alignItems="center">
                      <Select
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
=======
                    <Box display="flex" alignItems="center" flex={isMobile ? "1 1 100%" : "1 1 auto"} mt={isMobile ? 1 : 0}>
                      <Select
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId, Number(e.target.value))}
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
                        size="small"
                        sx={{ marginRight: 2 }}
                      >
                        {[...Array(10).keys()].map((qty) => (
                          <MenuItem key={qty + 1} value={qty + 1}>
                            {qty + 1}
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography variant="body2" fontWeight="bold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </Typography>
                      <IconButton
                        onClick={() => handleRemoveItem(item.productId)}
                        color="error"
                        sx={{ marginLeft: 2 }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                ))
              )}
            </Paper>
<<<<<<< HEAD
            <Button variant="text" sx={{ marginTop: 2 }} onClick={() => nav('/shop')}>
              &lt; Continue shopping
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Summary
=======
            <Button variant="text" sx={{ marginTop: 2 }} onClick={() => navigate('/shop')}>
              &lt; Continue Shopping
            </Button>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: isMobile ? 2 : 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Order Summary
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography>Subtotal</Typography>
                <Typography>₹{totals.subtotal.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography>Shipping</Typography>
                <Typography>₹{totals.delivery.toFixed(2)}</Typography>
              </Box>
<<<<<<< HEAD
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography>Total</Typography>
                <Typography>₹{(totals.subtotal + totals.delivery).toFixed(2)}</Typography>
=======
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography>GST (18%)</Typography>
                <Typography>₹{totals.gst.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">₹{totals.total.toFixed(2)}</Typography>
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
              </Box>
              <Button
                style={{ backgroundColor: '#ad4646', color: 'white' }}
                variant="contained"
                fullWidth
<<<<<<< HEAD
                sx={{ marginTop: 2 }}
                disabled={cartItems.length === 0}
                onClick={() => nav('/checkout', { state: { cartItems } })} // Pass cartItems
              >
                Checkout
=======
                sx={{ marginTop: 2, minWidth: "100%" }}
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Proceed to Checkout
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
<<<<<<< HEAD
=======
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
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
  );
};

export default CartPage;
