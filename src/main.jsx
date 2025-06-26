import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <PayPalScriptProvider options={{ 'client-id': 'Aa1gAgS3YQPt-SGbLg5UTUdOWL48CJzvDRlFwqLusbG3ESTQC8LsLG3nmGAE28FBLJA2l4FXH3CsDSe-', currency: 'USD' }}>
    <App />
  </PayPalScriptProvider>
);
