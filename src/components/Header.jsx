import React, { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Menu, X, User, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { gsap } from 'gsap';
import { useNavigate, Link } from 'react-router-dom';

const PROFILE_IMAGE = 'https://randomuser.me/api/portraits/men/32.jpg';

const Header = () => {
  const { toggleCart, getTotalItems } = useCart();
  const headerRef = useRef();
  const logoRef = useRef();
  const navRef = useRef();
  const cartRef = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

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

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

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
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200">
              Home
            </Link>
            <Link to="/" onClick={() => { window.scrollTo({ top: document.getElementById('products')?.offsetTop || 0, behavior: 'smooth' }); }} className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200">
              Products
            </Link>
            <Link to="/" onClick={() => { window.scrollTo({ top: document.getElementById('about')?.offsetTop || 0, behavior: 'smooth' }); }} className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200">
              About
            </Link>
            <Link to="/" onClick={() => { window.scrollTo({ top: document.getElementById('contact')?.offsetTop || 0, behavior: 'smooth' }); }} className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200">
              Contact
            </Link>
          </nav>

          {/* Cart & Profile */}
          <div ref={cartRef} className="flex items-center space-x-4">
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-700 hover:text-black transition-colors duration-200"
              aria-label="Open cart"
            >
              <ShoppingBag size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                onClick={() => setDropdownOpen(v => !v)}
                aria-label="User menu"
              >
                <img src={PROFILE_IMAGE} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                <ChevronDown size={18} className="ml-1 text-gray-400" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100 animate-fadeIn">
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => { setDropdownOpen(false); navigate('/profile'); }}>Profile</button>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => { setDropdownOpen(false); navigate('/orders'); }}>Orders</button>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>Settings</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;