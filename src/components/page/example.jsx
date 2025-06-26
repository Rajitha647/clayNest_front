


import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../CSS/checkout.css';

function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handlePlaceOrder = async () => {
    if (!address || !paymentMethod) {
      alert('Please fill in all fields!');
      return;
    }

    if (paymentMethod === 'Razorpay') {
      try {
        const response = await fetch('http://localhost:5001/api/payment/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: cart.reduce((total, item) => total + item.productId.price * item.quantity, 0) * 100, // Amount in paise
            currency: 'INR',
          }),
        });

        const orderData = await response.json();

        if (orderData.success) {
          const { order } = orderData;
          const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY, // Your Razorpay key
            amount: order.amount,
            currency: order.currency,
            name: 'Your Store',
            description: 'Order Payment',
            order_id: order.id,
            handler: async function (response) {
              try {
                const verifyResponse = await fetch('http://localhost:5001/api/payment/verify', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  }),
                });

                const verifyData = await verifyResponse.json();

                if (verifyData.success) {
                  alert('Payment successful!');
                  navigate('/order');
                } else {
                  alert('Payment verification failed!');
                }
              } catch (error) {
                console.error('Error verifying payment:', error);
                alert('Something went wrong during payment verification.');
              }
            },
            prefill: {
              name: '', // Prefilled user data
              email: '',
              contact: '',
            },
            theme: {
              color: '#303972',
            },
          };

          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } else {
          alert('Failed to create Razorpay order');
        }
      } catch (error) {
        console.error('Error creating Razorpay order:', error);
        alert('Something went wrong with Razorpay integration.');
      }
      return;
    }

    // Non-Razorpay order handling
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    if (!userId) {
      alert('User not logged in');
      return;
    }

    const order = {
      userId,
      address,
      paymentMethod,
      products: cart.map((item) => ({
        productId: item.productId._id || item.productId,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch('http://localhost:5001/api/orders/place-Order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        localStorage.removeItem('cart');
        navigate('/order');
      } else {
        console.error('Error response:', data);
        alert('Error placing the order: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while placing the order. Please try again later.');
    }
  };

  return (
    <Container style={{ padding: '30px' }}>
      <h1>Checkout</h1>
      <Row className="mb-4">
        <Col>
          <h4>Cart Summary</h4>
          {cart.length > 0 ? (
            <Row>
              {cart.map((product) => (
                <Col lg={4} md={6} sm={12} key={product._id} className="mb-4">
                  <Card style={{ backgroundColor: '#303972', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Card.Img
                      variant="top"
                      src={`http://localhost:5001/${product.productId.image}`}
                      style={{ height: '200px', objectFit: 'contain', width: '100%', borderRadius: '15px 15px 0 0' }}
                    />
                    <Card.Body style={{ color: 'white' }}>
                      <Card.Title>{product.productId.name}</Card.Title>
                      <Card.Text>Price: Rs. {product.productId.price}</Card.Text>
                      <Card.Text>Quantity: {product.quantity}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>Your cart is empty!</p>
          )}
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Form>
            <Form.Group controlId="formAddress">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ borderRadius: '25px' }}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Form>
            <Form.Group controlId="formPaymentMethod">
              <Form.Label>Payment Method</Form.Label>
              {/* <Form.Check
                type="radio"
                label="Credit Card"
                name="paymentMethod"
                value="credit card"
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ marginBottom: '10px' }}
              /> */}
              <Form.Check
                type="radio"
                label="Razorpay"
                name="paymentMethod"
                value="Razorpay"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Cash on delivery"
                name="paymentMethod"
                value="Cash on delivery"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button
            variant="success"
            onClick={handlePlaceOrder}
            style={{ width: '100%', padding: '10px', marginTop: '20px', borderRadius: '20px' }}
          >
            Place Order
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckoutPage;