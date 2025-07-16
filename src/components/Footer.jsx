import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [subscriptionStatus, setSubscriptionStatus] = React.useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setSubscriptionStatus('error');
      setTimeout(() => setSubscriptionStatus(''), 3000);
      return;
    }
    
    setSubscriptionStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setSubscriptionStatus('success');
      setEmail('');
      setTimeout(() => setSubscriptionStatus(''), 5000);
    }, 1500);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopLink = (category) => {
    navigate('/');
    setTimeout(() => {
      scrollToSection('products');
    }, 100);
  };

  return (
    <footer className="bg-black dark:bg-gray-900 text-white py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">THREAD</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Minimal. Modern. Timeless. Creating the perfect t-shirt collection 
              for those who appreciate quality and simplicity.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleShopLink('all')} className="text-gray-400 hover:text-white transition-colors duration-200 text-left">All Products</button></li>
              <li><button onClick={() => handleShopLink('basics')} className="text-gray-400 hover:text-white transition-colors duration-200 text-left">Basics</button></li>
              <li><button onClick={() => handleShopLink('graphic')} className="text-gray-400 hover:text-white transition-colors duration-200 text-left">Graphics</button></li>
              <li><button onClick={() => handleShopLink('vintage')} className="text-gray-400 hover:text-white transition-colors duration-200 text-left">Vintage</button></li>
              <li><button onClick={() => handleShopLink('oversized')} className="text-gray-400 hover:text-white transition-colors duration-200 text-left">Oversized</button></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('/settings')} className="text-gray-400 hover:text-white transition-colors duration-200 text-left">Size Guide</button></li>
              <li><button onClick={() => navigate('/settings')} className="text-gray-400 hover:text-white transition-colors duration-200 text-left">Shipping Info</button></li>
              <li><button onClick={() => navigate('/settings')} className="text-gray-400 hover:text-white transition-colors duration-200 text-left">Returns</button></li>
              <li><button onClick={() => navigate('/settings')} className="text-gray-400 hover:text-white transition-colors duration-200 text-left">FAQ</button></li>
              <li><button onClick={() => navigate('/settings')} className="text-gray-400 hover:text-white transition-colors duration-200 text-left">Contact Us</button></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="mb-4 lg:mb-0">
              <h4 className="font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-400">Get the latest updates on new products and exclusive offers.</p>
            </div>
            <div className="flex flex-col sm:flex-row w-full lg:w-auto space-y-2 sm:space-y-0">
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row w-full lg:w-auto space-y-2 sm:space-y-0">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 sm:w-64 px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-white"
                  disabled={subscriptionStatus === 'loading'}
                />
                <button 
                  type="submit"
                  disabled={subscriptionStatus === 'loading'}
                  className="px-6 py-3 bg-white text-black font-medium rounded-r-lg sm:rounded-l-none hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {subscriptionStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
            
            {/* Subscription Status Messages */}
            {subscriptionStatus === 'success' && (
              <div className="mt-3 p-3 bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-800 dark:text-green-200 text-sm">
                  ✅ Successfully subscribed! Check your email for confirmation.
                </p>
              </div>
            )}
            
            {subscriptionStatus === 'error' && (
              <div className="mt-3 p-3 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-200 text-sm">
                  ❌ Please enter a valid email address.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 space-y-4 md:space-y-0">
          <p>&copy; 2025 Karthik Nambiar. All rights reserved.</p>
          <div className="flex flex-wrap justify-center space-x-6">
            <button onClick={() => navigate('/settings')} className="hover:text-white transition-colors duration-200">Privacy Policy</button>
            <button onClick={() => navigate('/settings')} className="hover:text-white transition-colors duration-200">Terms of Service</button>
            <button onClick={() => navigate('/settings')} className="hover:text-white transition-colors duration-200">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
                type="email" 
                placeholder="Enter your email"
                className="flex-1 sm:w-64 px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 bg-white text-black font-medium rounded-r-lg sm:rounded-l-none hover:bg-gray-200 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 space-y-4 md:space-y-0">
          <p>&copy; 2025 Karthik Nambiar. All rights reserved.</p>
          <div className="flex flex-wrap justify-center space-x-6">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;