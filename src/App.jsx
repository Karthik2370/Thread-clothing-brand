import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';

gsap.registerPlugin(ScrollTrigger);

function App({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const handleImageLoad = () => {
      loadedImages++;
      if (loadedImages === images.length) {
        ScrollTrigger.refresh();
      }
    };
    images.forEach(img => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener('load', handleImageLoad);
      }
    });
    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
      });
    };
  }, []);

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Header />
          <main>{children}</main>
          <Footer />
          <Cart />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;