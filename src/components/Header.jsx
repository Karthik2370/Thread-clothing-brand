import React, { useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { gsap } from 'gsap';

const Header = () => {
  const { toggleCart, getTotalItems } = useCart();
  const headerRef = useRef();
  const logoRef = useRef();
  const navRef = useRef();
  const cartRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(logoRef.current, 
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo(navRef.current?.children,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(cartRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );
  }, []);

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div ref={logoRef} className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black tracking-tight">
              THREAD
            </h1>
          </div>

          {/* Navigation */}
          <nav ref={navRef} className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200">
              Home
            </a>
            <a href="#products" className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200">
              Products
            </a>
            <a href="#about" className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200">
              About
            </a>
            <a href="#contact" className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200">
              Contact
            </a>
          </nav>

          {/* Cart */}
          <div ref={cartRef} className="flex items-center space-x-4">
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-700 hover:text-black transition-colors duration-200"
            >
              <ShoppingBag size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;