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
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import Headernav from '../header/headernav';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, delivery: 7, gst: 0 });
  const userId = localStorage.getItem('userId');

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/cart/${userId}`);
      setCartItems(response.data.cart);
      calculateTotals(response.data.cart);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotals({ subtotal, delivery: 50, gst: 0 });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:9000/cart/${userId}/${productId}`);
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await axios.patch(`http://localhost:9000/cart/${userId}`, { productId, quantity: newQuantity });
      fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems } });
  };

  return (
    <div>
      <Headernav />
      <Box padding={4}>
        <Typography variant="h4" align="center" marginBottom={4}>
          Shopping Cart
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              {cartItems.length === 0 ? (
                <Typography
                  variant="h6"
                  align="center"
                  color="textSecondary"
                  sx={{ padding: 4 }}
                >
                  No items added to the cart.
                </Typography>
              ) : (
                cartItems.map((item) => (
                  <Box
                    key={item.productId}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    paddingY={2}
                    borderBottom="1px solid #ddd"
                  >
                    <Box display="flex" alignItems="center">
                      <img
                        src={`http://localhost:9000/uploads/${item.image}`}
                        alt={item.productName}
                        style={{
                          width: 100,
                          height: 80,
                          borderRadius: 8,
                          marginRight: 16,
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.productName}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" color="primary">
                          ₹{item.price.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Select
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
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
            <Button variant="text" sx={{ marginTop: 2 }} onClick={() => navigate('/shop')}>
              &lt; Continue shopping
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Summary
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography>Items</Typography>
                <Typography>₹{totals.subtotal.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography>Shipping</Typography>
                <Typography>₹{totals.delivery.toFixed(2)}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography>Total (tax excl.)</Typography>
                <Typography>₹{(totals.subtotal + totals.delivery).toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
                <Typography>Taxes:</Typography>
                <Typography>₹0.00</Typography>
              </Box>
              <Button
                style={{ backgroundColor: '#ad4646', color: 'white' }}
                variant="contained"
                fullWidth
                sx={{ marginTop: 2 }}
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CartPage;
