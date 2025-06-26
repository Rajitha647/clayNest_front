import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Paper, Divider, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Headernav from '.../header/Headernav';

const OrderConfirmationPage = () => {
    const { orderId } = useParams(); // Get order ID from URL
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/order/orderplaced/${orderId}`);
                setOrder(response.data.order);
            } catch (error) {
                console.error('Error fetching order details:', error);
                alert('Something went wrong while fetching order details');
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (!order) {
        return <div>Loading...</div>; // Loading state while fetching order details
    }

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
                                Order Details
                            </Typography>

                            {order.products.map((item) => (
                                <Box
                                    key={item.productId}
                                    display="flex"
                                    justifyContent="space-between"
                                    marginBottom={2}
                                >
                                    <Typography>{item.productId.name}</Typography>
                                    <Typography>
                                        ₹{(item.price * item.quantity).toFixed(2)} x {item.quantity}
                                    </Typography>
                                </Box>
                            ))}

                            <Divider sx={{ my: 2 }} />
                            <Box display="flex" justifyContent="space-between" marginBottom={1}>
                                <Typography>Total Amount</Typography>
                                <Typography>₹{order.totalAmount.toFixed(2)}</Typography>
                            </Box>

                            <Box display="flex" justifyContent="space-between" marginBottom={1}>
                                <Typography>Payment Method</Typography>
                                <Typography>{order.paymentMethod}</Typography>
                            </Box>

                            <Box display="flex" justifyContent="space-between" marginBottom={1}>
                                <Typography>Order Status</Typography>
                                <Typography>{order.status}</Typography>
                            </Box>

                            <Typography variant="h6" fontWeight="bold" marginTop={2}>
                                Shipping Address
                            </Typography>
                            <Typography>{order.address.name}</Typography>
                            <Typography>{order.address.address}</Typography>
                            <Typography>{order.address.city}, {order.address.zipCode}</Typography>
                            <Typography>{order.address.phone}</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Optionally, add a button to redirect the user to the homepage or to their orders */}
                <Box display="flex" justifyContent="center" marginTop={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/')}
                    >
                        Go to Homepage
                    </Button>
                </Box>
            </Box>
        </div>
    );
};

export default OrderConfirmationPage;
