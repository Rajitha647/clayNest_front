import React from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Headernav from '../header/headernav';

const ThankYouPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Headernav />
            <Box padding={4}>
                <Typography variant="h4" align="center" marginBottom={4}>
                    Thank You for Your Order!
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ padding: 3 }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Order Successfully Placed
                            </Typography>
                            <Typography variant="body1" paragraph>
                                We appreciate your order! Your order is being processed and will be shipped soon.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                You can track the status of your order in your account or wait for an email with delivery updates.
                            </Typography>
                            <Typography variant="body1" paragraph>
                                If you chose Cash on Delivery, your order will be delivered and you will pay at the time of delivery.
                            </Typography>
                            
                            {/* Provide order summary or details */}
                            <Typography variant="body1" paragraph>
                                <strong>Order Summary:</strong>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" paragraph>
                                Order ID: { /* Insert Order ID if needed */ }
                            </Typography>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate('/shop')}
                                fullWidth
                                sx={{ marginTop: 3 }}
                            >
                                Continue Shopping
                            </Button>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Need Help?
                            </Typography>
                            <Typography variant="body2" paragraph>
                                If you have any questions or issues with your order, please contact our support team.
                            </Typography>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => navigate('/support')}
                                fullWidth
                            >
                                Contact Support
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default ThankYouPage;
