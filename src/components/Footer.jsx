import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubscriptionStatus('error');
      setTimeout(() => setSubscriptionStatus(''), 3000);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubscriptionStatus('success');
      setEmail('');
      setIsLoading(false);
      setTimeout(() => setSubscriptionStatus(''), 5000);
    }, 1500);
  };

  const scrollToProducts = () => {
    navigate('/');
    setTimeout(() => {
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">THREAD</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Premium t-shirts crafted for the modern minimalist. Quality meets simplicity in every thread.
            </p>
          </div>

          {/* Newsletter Section */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates on new arrivals, exclusive offers, and style tips.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg font-medium transition-colors duration-200 text-sm whitespace-nowrap"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              
              {/* Subscription Status Messages */}
              {subscriptionStatus === 'success' && (
                <p className="text-green-400 text-sm">
                  ✅ Successfully subscribed! Check your email for confirmation.
                </p>
              )}
              {subscriptionStatus === 'error' && (
                <p className="text-red-400 text-sm">
                  ❌ Please enter a valid email address.
                </p>
              )}
            </form>
          </div>

          {/* Shop Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={scrollToProducts}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                >
                  All Products
                </button>
              </li>
              <li>
                <button 
                  onClick={scrollToProducts}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button 
                  onClick={scrollToProducts}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                >
                  Sale
                </button>
              </li>
              <li>
                <button 
                  onClick={scrollToProducts}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                >
                  Collections
                </button>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigate('/settings?tab=help')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/settings?tab=help')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/settings?tab=help')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                >
                  Shipping Info
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/settings?tab=help')}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                >
                  Returns
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 THREAD by Karthik Nambiar. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button 
                onClick={() => navigate('/settings')}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => navigate('/settings')}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => navigate('/settings')}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;