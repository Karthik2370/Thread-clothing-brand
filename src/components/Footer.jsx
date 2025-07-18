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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <h3 className="text-3xl font-bold mb-6">THREAD</h3>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed max-w-sm">
              Premium t-shirts crafted for the modern minimalist. Quality meets simplicity in every thread.
            </p>
            
            {/* Newsletter Section */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white">Stay Updated</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Get updates on new arrivals, exclusive offers, and style tips.
              </p>
              
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-200 whitespace-nowrap min-w-[120px]"
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
                
                {/* Status Messages */}
                {subscriptionStatus === 'success' && (
                  <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
                    <p className="text-green-400 text-sm flex items-center">
                      <span className="mr-2">✅</span>
                      Successfully subscribed! Check your email for confirmation.
                    </p>
                  </div>
                )}
                {subscriptionStatus === 'error' && (
                  <div className="bg-red-900/30 border border-red-700 rounded-lg p-3">
                    <p className="text-red-400 text-sm flex items-center">
                      <span className="mr-2">❌</span>
                      Please enter a valid email address.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Links Section */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Shop Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Shop</h4>
                <ul className="space-y-4">
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
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Support</h4>
                <ul className="space-y-4">
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

              {/* Company Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
                <ul className="space-y-4">
                  <li>
                    <button 
                      onClick={() => navigate('/settings?tab=account')}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => navigate('/orders')}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    >
                      Orders
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => navigate('/settings')}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    >
                      Account
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => navigate('/settings?tab=help')}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    >
                      Careers
                    </button>
                  </li>
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Legal</h4>
                <ul className="space-y-4">
                  <li>
                    <button 
                      onClick={() => navigate('/settings?tab=privacy')}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    >
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => navigate('/settings?tab=privacy')}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    >
                      Terms of Service
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => navigate('/settings?tab=privacy')}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    >
                      Cookie Policy
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => navigate('/settings?tab=help')}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    >
                      Refund Policy
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 THREAD by Karthik Nambiar. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <span className="text-gray-500 text-sm">Made with ❤️ for minimalists</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;