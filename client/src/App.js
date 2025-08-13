import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import WishlistPage from './pages/WishlistPage';
import LoginRegister from './pages/LoginRegister';
import MyAccount from './pages/MyAccount';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';
import AboutUs from './pages/AboutUs';
import InventoryDashboard from './pages/InventoryDashboard';
import NewAdminDashboard from './pages/NewAdminDashboard';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/register" element={<LoginRegister />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/admin" element={
            <AdminRoute>
              <NewAdminDashboard />
            </AdminRoute>
          } />
          <Route path="/inventory" element={
            <AdminRoute>
              <InventoryDashboard />
            </AdminRoute>
          } />
          <Route path="/add-product" element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          } />
      </Routes>
    </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
