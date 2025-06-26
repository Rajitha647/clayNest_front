<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <PayPalScriptProvider options={{ 'client-id': 'Aa1gAgS3YQPt-SGbLg5UTUdOWL48CJzvDRlFwqLusbG3ESTQC8LsLG3nmGAE28FBLJA2l4FXH3CsDSe-', currency: 'USD' }}>
    <App />
  </PayPalScriptProvider>
);
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
>>>>>>> 4b61a809c19b4b8bcea21c06dcfa1aabc4389570
