import './app.css'

import Home from './components/Home';

import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Login from './components/Login';

import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Profile from './components/Profile';
import Orders from './components/Orders';
import Forgotpassword from './components/Forgotpassword';


function App() {

  return (


    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login type="signup" />} />
        <Route path="/products" element={<Products />} />
        <Route path="/:category" element={<Products />} />
        <Route path="/forgotpassword" element={<Forgotpassword type="forgotPassword" />} />
        <Route path="/resetpassword/:token" element={<Forgotpassword type="resetPassword" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/myorders" element={<Orders />} />
        <Route path="/" element={<Navigate to={"/home"} />} ></Route>

      </Routes>
    </Router>

  );
}

export default App;
