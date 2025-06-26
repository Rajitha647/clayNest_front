import React, { useState } from 'react';
import axios from 'axios';

function PaymentPage() {
  const [amount, setAmount] = useState(500);  // Example amount (500 INR)

  const handlePayment = async () => {
    try {
      // Step 1: Call backend to create Razorpay order
      const response = await axios.post('http://localhost:9000/order/capturePayment', { amount });
      const { order_id,razorpayKeyId } = response.data;

      // Step 2: Setup Razorpay options with order_id
      const options = {
        key: razorpayKeyId,  // Replace with your Razorpay key
        amount: amount * 100,      // Amount in paise
        currency: "INR",
        name: "Your Merchant Name",
        description: "Payment for Order",
        order_id: order_id,        // Use the order_id received from backend
        handler: function (response) {
          // Handle payment success or failure
          console.log("Payment Successful:", response);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999", // Customer contact number
        },
        notes: {
          order_id: order_id,
        },
        theme: {
          color: "#F37254",
        },
        modal: {
          ondismiss: function () {
            console.log("Payment dismissed");
          },
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open(); // Trigger Razorpay payment modal

    } catch (error) {
      console.error('Error creating order:', error);
      alert('There was an issue with the payment process. Please try again.');
    }
  };

  return (
    <div>
      <h2>Make Payment</h2>
      <p>Amount: ₹{amount}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default PaymentPage;
