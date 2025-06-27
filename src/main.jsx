import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import HeroGallery from './components/HeroGallery';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import ProductDetail from './components/ProductDetail';
import CheckoutLayout from './components/Checkout/CheckoutLayout';
import CheckoutAddress from './components/Checkout/CheckoutAddress';
import CheckoutDelivery from './components/Checkout/CheckoutDelivery';
import CheckoutPayment from './components/Checkout/CheckoutPayment';
import CheckoutConfirmation from './components/Checkout/CheckoutConfirmation';
import Orders from './components/Orders';
import Profile from './components/Profile';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={
            <>
              <HeroGallery />
              <ProductGrid />
              <About />
            </>
          } />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<CheckoutLayout />}>
            <Route index element={<CheckoutAddress />} />
            <Route path="address" element={<CheckoutAddress />} />
            <Route path="delivery" element={<CheckoutDelivery />} />
            <Route path="payment" element={<CheckoutPayment />} />
            <Route path="confirmation" element={<CheckoutConfirmation />} />
          </Route>
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>
);