// import React, { useState, useEffect } from 'react';
// import { Box, Grid, Typography, TextField, Button, Paper, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import Headernav from '../header/headernav';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CheckoutPage = () => {
//     const nav = useNavigate();
//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [billingDetails, setBillingDetails] = useState({
//         name: '',
//         email: '',
//         address: '',
//         city: '',
//         zipCode: '',
//         phone: '',
//     });

//     const [cartItems, setCartItems] = useState([]);
//     const [totals, setTotals] = useState({ subtotal: 0, shipping: 50, total: 0 });

//     // Fetch cart items and calculate totals
//     useEffect(() => {
//         const fetchCartItems = async () => {
//             try {
//                 const userId = localStorage.getItem("userId");
//                 if (userId) {
//                     const response = await axios.get(`http://localhost:9000/cart/${userId}`);
//                     const cart = response.data.cart;

//                     const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//                     const total = subtotal + totals.shipping;

//                     setCartItems(cart);
//                     setTotals({ subtotal, shipping: 50, total });
//                 }
//             } catch (error) {
//                 console.error("Error fetching cart items:", error);
//             }
//         };

//         fetchCartItems();
//     }, []);

//     const handleBillingChange = (e) => {
//         setBillingDetails({
//             ...billingDetails,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handlePaymentChange = (e) => {
//         setPaymentMethod(e.target.value);
//     };

//     const handlePlaceOrder = async () => {
//         if (!billingDetails.address || !paymentMethod) {
//             alert("Please fill in all fields!");
//             return;
//         }

//         const token = localStorage.getItem("token");

//         if (!token) {
//             alert("You are not authenticated. Please log in.");
//             return;
//         }

//         const user = JSON.parse(localStorage.getItem("user"));
//         const userId = user?.id;

//         if (!userId) {
//             alert("User not logged in");
//             return;
//         }

//         const orderData = {
//             userId,
//             address: billingDetails.address,
//             paymentMethod,
//             products: cartItems.map((item) => ({
//                 productId: item.productId._id || item.productId,
//                 quantity: item.quantity,
//             })),
//         };

//         if (paymentMethod === "razorpay") {
//             try {
//                 const response = await fetch("http://localhost:9000/order/placeorder", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": `Bearer ${token}`, // Include the token
//                     },
//                     body: JSON.stringify({
//                         amount: totals.total * 100, // Amount in paise
//                         currency: "INR",
//                     }),
//                 });

//                 const orderResponse = await response.json();

//                 if (orderResponse.success) {
//                     const options = {
//                         key: process.env.REACT_APP_RAZORPAY_KEY,
//                         amount: orderResponse.order.amount,
//                         currency: orderResponse.order.currency,
//                         name: "Your Store",
//                         description: "Order Payment",
//                         order_id: orderResponse.order.id,
//                         handler: async (response) => {
//                             try {
//                                 const verifyResponse = await fetch("http://localhost:9000/order/paymentsuccess", {
//                                     method: "POST",
//                                     headers: {
//                                         "Content-Type": "application/json",
//                                         "Authorization": `Bearer ${token}`,
//                                     },
//                                     body: JSON.stringify({
//                                         razorpay_order_id: response.razorpay_order_id,
//                                         razorpay_payment_id: response.razorpay_payment_id,
//                                         razorpay_signature: response.razorpay_signature,
//                                     }),
//                                 });

//                                 const verifyData = await verifyResponse.json();

//                                 if (verifyData.success) {
//                                     await saveOrder({
//                                         ...orderData,
//                                         paymentStatus: "Paid",
//                                         transactionId: response.razorpay_payment_id,
//                                     });

//                                     alert("Payment Successful!");
//                                     nav("/order");
//                                 } else {
//                                     alert("Payment verification failed!");
//                                 }
//                             } catch (error) {
//                                 console.error("Error verifying payment:", error);
//                                 alert("Payment verification error.");
//                             }
//                         },
//                         prefill: {
//                             name: billingDetails.name,
//                             email: billingDetails.email,
//                             contact: billingDetails.phone,
//                         },
//                         theme: { color: "#303972" },
//                     };

//                     const razorpay = new window.Razorpay(options);
//                     razorpay.open();
//                 } else {
//                     alert("Failed to create Razorpay order");
//                 }
//             } catch (error) {
//                 console.error("Error creating Razorpay order:", error);
//                 alert("Razorpay integration failed.");
//             }
//         } else if (paymentMethod === "cashOnDelivery") {
//             try {
//                 await saveOrder({
//                     ...orderData,
//                     paymentStatus: "Pending",
//                     transactionId: "N/A",
//                 });

//                 alert("Order placed successfully! Cash on Delivery selected.");
//                 nav("/order");
//             } catch (error) {
//                 console.error("Error placing COD order:", error);
//                 alert("Failed to place order. Please try again.");
//             }
//         }
//     };

//     const saveOrder = async (order) => {
//         const token = localStorage.getItem("token");

//         const response = await fetch("http://localhost:9000/order/cod", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`,
//             },
//             body: JSON.stringify(order),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.message || "Error placing the order.");
//         }

//         return data;
//     };

//     return (
//         <div>
//             <Headernav />
//             <Box padding={4}>
//                 <Typography variant="h4" align="center" marginBottom={4}>
//                     Checkout
//                 </Typography>
//                 <Grid container spacing={4}>
//                     {/* Billing Information */}
//                     <Grid item xs={12} md={6}>
//                         <Paper elevation={3} sx={{ padding: 3 }}>
//                             <Typography variant="h6" fontWeight="bold" marginBottom={2}>
//                                 Billing Information
//                             </Typography>
//                             <TextField label="Full Name" name="name" value={billingDetails.name} onChange={handleBillingChange} fullWidth margin="normal" />
//                             <TextField label="Email Address" name="email" value={billingDetails.email} onChange={handleBillingChange} fullWidth margin="normal" />
//                             <TextField label="Address" name="address" value={billingDetails.address} onChange={handleBillingChange} fullWidth margin="normal" />
//                             <Grid container spacing={2}>
//                                 <Grid item xs={6}>
//                                     <TextField label="City/District" name="city" value={billingDetails.city} onChange={handleBillingChange} fullWidth margin="normal" />
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <TextField label="Zip Code" name="zipCode" value={billingDetails.zipCode} onChange={handleBillingChange} fullWidth margin="normal" />
//                                 </Grid>
//                             </Grid>
//                             <TextField label="Phone Number" name="phone" value={billingDetails.phone} onChange={handleBillingChange} fullWidth margin="normal" />
//                         </Paper>
//                     </Grid>

//                     {/* Order Summary */}
//                     <Grid item xs={12} md={6}>
//                         <Paper elevation={3} sx={{ padding: 3 }}>
//                             <Typography variant="h6" fontWeight="bold" marginBottom={2}>
//                                 Order Summary
//                             </Typography>
//                             {cartItems.map(item => (
//                                 <Box key={item.productId} display="flex" justifyContent="space-between" marginBottom={1}>
//                                     <Typography>{item.productName}</Typography>
//                                     <Typography>₹{(item.price * item.quantity).toFixed(2)}</Typography>
//                                 </Box>
//                             ))}
//                             <Box display="flex" justifyContent="space-between" marginBottom={1}>
//                                 <Typography>Subtotal</Typography>
//                                 <Typography>₹{totals.subtotal.toFixed(2)}</Typography>
//                             </Box>
//                             <Box display="flex" justifyContent="space-between" marginBottom={1}>
//                                 <Typography>Shipping</Typography>
//                                 <Typography>₹{totals.shipping.toFixed(2)}</Typography>
//                             </Box>
//                             <Divider sx={{ my: 2 }} />
//                             <Box display="flex" justifyContent="space-between" marginBottom={1}>
//                                 <Typography>Total</Typography>
//                                 <Typography>₹{totals.total.toFixed(2)}</Typography>
//                             </Box>

//                             {/* Payment Method */}
//                             <Typography variant="h6" fontWeight="bold" marginTop={4} marginBottom={2}>
//                                 Payment Method
//                             </Typography>
//                             <FormControl fullWidth margin="normal">
//                                 <InputLabel>Payment Method</InputLabel>
//                                 <Select value={paymentMethod} onChange={handlePaymentChange} label="Payment Method">
//                                     <MenuItem value="razorpay">Razorpay</MenuItem>
//                                     <MenuItem value="cashOnDelivery">Cash on Delivery</MenuItem>
//                                 </Select>
//                             </FormControl>

//                             <Button
//                                 style={{ backgroundColor: "#ad4646", color: "white" }}
//                                 variant="contained"
//                                 fullWidth
//                                 onClick={handlePlaceOrder}
//                                 sx={{ marginTop: 2 }}
//                             >
//                                 Place Order
//                             </Button>
//                         </Paper>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </div>
//     );
// };

// export default CheckoutPage;

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('razorpay'); // Default payment method
    const [address, setAddress] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [totals, setTotals] = useState({ subtotal: 0, delivery: 50, gst: 0 });
    const userId = localStorage.getItem('userId'); // Replace with dynamic user ID logic

    // Fetch cart items and calculate totals
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/cart/${userId}`);
                const cart = response.data.cart;

                const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                const gst = (subtotal * 0.18).toFixed(2); // 18% GST example
                setCartItems(cart);
                setTotals({ subtotal, delivery: 50, gst: parseFloat(gst) });
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [userId]);

    const handlePayment = async () => {
        if (!address) {
            alert('Please enter your address!');
            return;
        }

        try {
            if (paymentMethod === 'razorpay') {
                // Create Razorpay Order
                const { data } = await axios.post('http://localhost:9000/order/placeorder', {
                    amount: (totals.subtotal + totals.delivery + totals.gst) * 100, // Amount in paise
                    currency: 'INR',
                });

                // Razorpay payment options
                const options = {
                    key: data.key,
                    amount: data.amount,
                    currency: 'INR',
                    name: 'clayNest',
                    description: 'Order Payment',
                    order_id: data.order.id,
                    handler: async function (response) {
                        try {
                            
                            const verifyResponse = await axios.post(
                                'http://localhost:9000/order/paymentsuccess',
                                {
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                    userId,
                                    address,
                                    paymentMethod: 'razorpay',
                                    cartItems,
                                    totalAmount: totals.subtotal + totals.delivery + totals.gst,
                                }
                            );

                            if (verifyResponse.data.success) {
                                alert('Payment Successful!');
                                navigate('/order-success');
                            } else {
                                alert('Payment verification failed.');
                            }
                        } catch (error) {
                            console.error('Payment verification error:', error);
                            alert('Payment verification failed.');
                        }
                    },
                    // prefill: {
                    //     name: '',
                    //     email: '',
                    //     contact: '',
                    // },
                    theme: { color: '#3399cc' },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            } else if (paymentMethod === 'cod') {
               
                const codResponse = await axios.post('http://localhost:9000/order/cod/', {
                    userId,
                    address,
                    paymentMethod: 'cod',
                    cartItems,
                    totalAmount: totals.subtotal + totals.delivery + totals.gst,
                });

                if (codResponse.data.status===1) {
                    alert('Order placed successfully! Cash on Delivery selected.');
                    navigate('/order-success');
                } else {
                    alert('Failed to place order. Please try again.');
                }
            }
        } catch (error) {
            console.error('Order placement failed:', error);
            alert('Order failed. Please try again.');
        }
    };

    return (
        <Box padding={4}>
            <Typography variant="h4" align="center" marginBottom={4}>
                Checkout
            </Typography>

            {/* Shipping Address */}
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
                <Typography variant="h6" fontWeight="bold">
                    Shipping Address
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Enter your shipping address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    sx={{ marginTop: 2 }}
                />
            </Paper>

            {/* Payment Method */}
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
                <Typography variant="h6" fontWeight="bold">
                    Payment Method
                </Typography>
                <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    sx={{ marginTop: 2 }}
                >
                    <FormControlLabel value="razorpay" control={<Radio />} label="Razorpay" />
                    <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
                </RadioGroup>
            </Paper>

            {/* Order Summary */}
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                    Order Summary
                </Typography>
                {cartItems.map((item) => (
                    <Box display="flex" justifyContent="space-between" marginTop={2} key={item.productId}>
                        <Typography>{item.productName}</Typography>
                        <Typography>₹{(item.price * item.quantity).toFixed(2)}</Typography>
                    </Box>
                ))}
                <Divider sx={{ marginY: 2 }} />
                <Box display="flex" justifyContent="space-between">
                    <Typography>Subtotal</Typography>
                    <Typography>₹{totals.subtotal.toFixed(2)}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography>GST (18%)</Typography>
                    <Typography>₹{totals.gst.toFixed(2)}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography>Delivery</Typography>
                    <Typography>₹{totals.delivery.toFixed(2)}</Typography>
                </Box>
                <Divider sx={{ marginY: 2 }} />
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6">₹{(totals.subtotal + totals.delivery + totals.gst).toFixed(2)}</Typography>
                </Box>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ marginTop: 3 }}
                    style={{ backgroundColor: '#ad4646', color: 'white' }}
                    onClick={handlePayment}
                >
                    Place Order
                </Button>
            </Paper>
        </Box>
    );
};

export default CheckoutPage;
