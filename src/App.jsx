import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';



const Home = lazy(() => import('./components/home'));
const Signup = lazy(() => import('./components/user/signup'));
const Login=lazy(()=>import('./components/user/login'))
const Shop = lazy(()=>import('./components/page/shop'))
const Kitchenwares=lazy(()=>import('./components/categories/kitchenwares'))
const Gifts=lazy(()=>import('./components/categories/gifts'))
const Stove=lazy(()=>import('./components/categories/mudstove'))
const Dashboard=lazy(()=>import('./components/admin/dashboard'))
const Adminlogin=lazy(()=>import('./components/admin/adminlogin'))
const Add =lazy(()=>import('./components/admin/products'))
const View =lazy(()=>import('./components/admin/productslist'))
const Edit =lazy(()=>import('./components/admin/editproducts'))
const Lamps=lazy(()=>import('./components/categories/lamps'))
const Cart=lazy(()=>import('./components/page/cartpage'))
const Land=lazy(()=>import('./components/page/landingpage'))
const Checkout=lazy(()=>import('./components/page/checkoutpage'))
const Confirmorder=lazy(()=>import('./components/page/orderconfirmpage'))
const Totalorders=lazy(()=>import('./components/page/myorders'))

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Land/>} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/kitchen' element={<Kitchenwares/>}/>
          <Route path='/gifts' element={<Gifts/>}/>
          <Route path='/stove' element={<Stove/>}/>
          <Route path='/lamps' element={<Lamps/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/order' element={<Confirmorder/>} />
          <Route path='/myorders' element={<Totalorders/>} />
          
          <Route path='/adminlogin' element={<Adminlogin/>}/>
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/adminlogin" />}/>
          <Route path='/add' element={<Add/>}/>
          <Route path='/view' element={<View/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
          </Routes>
      </Suspense>
      
    </BrowserRouter>
    </>
  );
}

export default App;
