import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js"; // 👈 Import PayPal provider

// Lazy imports
const Home = lazy(() => import('./components/home'));
const Signup = lazy(() => import('./components/user/signup'));
const Login = lazy(() => import('./components/user/login'));
const Shop = lazy(() => import('./components/page/shop'));
const Kitchenwares = lazy(() => import('./components/categories/kitchenwares'));
const Gifts = lazy(() => import('./components/categories/gifts'));
const Stove = lazy(() => import('./components/categories/mudstove'));
const Dashboard = lazy(() => import('./components/admin/dashboard'));
const Adminlogin = lazy(() => import('./components/admin/adminlogin'));
const Add = lazy(() => import('./components/admin/products'));
const View = lazy(() => import('./components/admin/productslist'));
const Edit = lazy(() => import('./components/admin/editproducts'));
const Lamps = lazy(() => import('./components/categories/lamps'));
const Cart = lazy(() => import('./components/page/cartpage'));
const Land = lazy(() => import('./components/page/landingpage'));
const Contact = lazy(() => import('./components/page/contact'));
const Checkout = lazy(() => import('./components/page/checkoutpage'));
const Confirmorder = lazy(() => import('./components/page/orderpage'));
const About = lazy(() => import('./components/aboutus'));
const Myorders = lazy(()=>import('./components/page/myorders'))

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <PayPalScriptProvider options={{ "client-id": "Aa1gAgS3YQPt-SGbLg5UTUdOWL48CJzvDRlFwqLusbG3ESTQC8LsLG3nmGAE28FBLJA2l4FXH3CsDSe-" }}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Land />} />
            <Route path='/home' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/kitchen' element={<Kitchenwares />} />
            <Route path='/gifts' element={<Gifts />} />
            <Route path='/stove' element={<Stove />} />
            <Route path='/lamps' element={<Lamps />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/confirmorder' element={<Confirmorder />} />
            <Route path='/about' element={<About />} />
            <Route path='/myorders' element={<Myorders/>} />
            <Route path='/adminlogin' element={<Adminlogin />} />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/adminlogin" />}
            />
            <Route path='/add' element={<Add />} />
            <Route path='/view' element={<View />} />
            <Route path='/edit/:id' element={<Edit />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
