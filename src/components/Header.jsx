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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const mobileMenuRef = useRef();
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
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    }
    if (dropdownOpen || mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen, mobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div ref={logoRef} className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-2xl font-bold text-black dark:text-white tracking-tight transition-colors duration-300">
                THREAD
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200">
              Home
            </Link>
            <button 
              onClick={() => scrollToSection('products')} 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              Products
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => navigate('/settings?tab=help')} 
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Cart & Profile */}
          <div ref={cartRef} className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
              aria-label="Open cart"
            >
              <ShoppingBag size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full h-5 w-5 flex items-center justify-center transition-colors duration-300">
                  {getTotalItems()}
                </span>
              )}
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors duration-300"
                onClick={() => setDropdownOpen(v => !v)}
                aria-label="User menu"
              >
                <img src={PROFILE_IMAGE} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                <ChevronDown size={18} className="ml-1 text-gray-400 dark:text-gray-500" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-100 dark:border-gray-700 animate-fadeIn transition-colors duration-300">
                  <button 
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200" 
                    onClick={() => { setDropdownOpen(false); navigate('/orders'); }}
                  >
                    Orders
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200" 
                    onClick={() => { setDropdownOpen(false); navigate('/settings'); }}
                  >
                    Settings
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300"
          >
            <div className="px-4 py-4 space-y-4">
              <Link 
                to="/" 
                className="block text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <button 
                onClick={() => scrollToSection('products')} 
                className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
              >
                Products
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
              >
                About
              </button>
              <button 
                onClick={() => { navigate('/settings?tab=help'); setMobileMenuOpen(false); }} 
                className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
              >
                Contact
              </button>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-4">
                <button
                  onClick={() => { toggleCart(); setMobileMenuOpen(false); }}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  <ShoppingBag size={20} />
                  <span>Cart ({getTotalItems()})</span>
                </button>
                
                <button 
                  onClick={() => { navigate('/orders'); setMobileMenuOpen(false); }}
                  className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  Orders
                </button>
                
                <button 
                  onClick={() => { navigate('/settings'); setMobileMenuOpen(false); }}
                  className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;