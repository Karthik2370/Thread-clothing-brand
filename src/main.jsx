import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import ProductDetail from './components/ProductDetail';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ProductGrid />
              <About />
            </>
          } />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>
);