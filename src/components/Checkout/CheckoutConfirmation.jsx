import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CheckCircle, Package, Truck, CreditCard, Copy, Smartphone, Wallet, Lock } from 'lucide-react';

const CheckoutConfirmation = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [orderCleared, setOrderCleared] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Get mock payment details from localStorage
    const paymentId = localStorage.getItem('mock_payment_id');
    const orderId = localStorage.getItem('mock_order_id');
    const paymentMethod = localStorage.getItem('mock_payment_method');
    const amount = localStorage.getItem('mock_amount');
    
    if (paymentId) {
      setPaymentDetails({
        paymentId,
        orderId,
        paymentMethod,
        amount,
        timestamp: new Date().toISOString()
      });
      
      // Clear cart after successful payment only once
      if (clearCart && !orderCleared) {
        clearCart();
        setOrderCleared(true);
        
        // Clean up localStorage
        localStorage.removeItem('mock_payment_id');
        localStorage.removeItem('mock_order_id');
        localStorage.removeItem('mock_payment_method');
        localStorage.removeItem('mock_amount');
      }
    }
  }, []); // Empty dependency array to run only once

  // Generate a random order number
  const orderNumber = `THR${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Simple feedback - you could add a toast here
    alert('Copied to clipboard!');
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'card': return <CreditCard size={16} />;
      case 'upi': return <Smartphone size={16} />;
      case 'wallet': return <Wallet size={16} />;
      default: return <CreditCard size={16} />;
    }
  };

  const getPaymentMethodName = (method) => {
    switch (method) {
      case 'card': return 'Credit/Debit Card';
      case 'upi': return 'UPI Payment';
      case 'wallet': return 'Digital Wallet';
      default: return 'Card Payment';
    }
  };

  // Use stored items if cart was cleared
  const displayItems = items.length > 0 ? items : [];
  const displayTotal = paymentDetails ? parseFloat(paymentDetails.amount) : getTotalPrice();

  return (
    <div className="flex flex-col items-center justify-center py-8 bg-white dark:bg-gray-800 transition-colors duration-300">
      {/* Success Animation */}
      <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-6 animate-pulse">
        <CheckCircle className="w-12 h-12 text-green-500 dark:text-green-400" />
      </div>

      {/* Success Message */}
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-white">Payment Successful! 🎉</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
        Thank you for your purchase! Your order has been confirmed and will be processed shortly.
      </p>

      {/* Payment Details */}
      {paymentDetails && (
        <div className="w-full max-w-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 transition-colors duration-300">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-3 flex items-center">
            <Lock size={16} className="mr-2" />
            Payment Details
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-blue-700 dark:text-blue-300">Payment Method:</span>
              <div className="flex items-center space-x-2">
                {getPaymentMethodIcon(paymentDetails.paymentMethod)}
                <span className="font-medium text-blue-900 dark:text-blue-200">
                  {getPaymentMethodName(paymentDetails.paymentMethod)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-blue-700 dark:text-blue-300">Transaction ID:</span>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-blue-900 dark:text-blue-200">
                  {paymentDetails.paymentId}
                </span>
                <button 
                  onClick={() => copyToClipboard(paymentDetails.paymentId)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-blue-700 dark:text-blue-300">Order ID:</span>
              <span className="font-mono text-xs text-blue-900 dark:text-blue-200">
                {paymentDetails.orderId}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-blue-700 dark:text-blue-300">Amount Paid:</span>
              <span className="font-bold text-blue-900 dark:text-blue-200">₹{paymentDetails.amount}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-blue-700 dark:text-blue-300">Status:</span>
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                ✓ Confirmed
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div className="w-full max-w-md bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">Order Number</span>
          <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">{orderNumber}</span>
        </div>
        
        {displayItems.length > 0 ? (
          <div className="space-y-2 mb-4">
            {displayItems.map(item => (
              <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} 
                   className="flex justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  {item.product.name} ({item.selectedColor}, {item.selectedSize}) x{item.quantity}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">₹{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Order details processed successfully
          </div>
        )}
        
        <div className="border-t border-gray-200 dark:border-gray-600 pt-2 flex justify-between font-bold text-gray-900 dark:text-white">
          <span>Total Paid</span>
          <span>₹{displayTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Order Timeline */}
      <div className="w-full max-w-md space-y-4 mb-8">
        <h3 className="font-semibold text-center mb-4 text-gray-900 dark:text-white">Order Timeline</h3>
        
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
            <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
          </div>
          <div>
            <div className="font-medium text-sm text-gray-900 dark:text-white">Payment Confirmed</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Just now - Payment processed successfully</div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
            <Package size={16} className="text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <div className="font-medium text-sm text-gray-900 dark:text-white">Order Processing</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Within 2 hours - Preparing your items</div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
            <Truck size={16} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="font-medium text-sm text-gray-900 dark:text-white">Shipped</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Within 24 hours - Tracking info will be sent</div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
            <Package size={16} className="text-gray-400 dark:text-gray-500" />
          </div>
          <div>
            <div className="font-medium text-sm text-gray-500 dark:text-gray-400">Delivered</div>
            <div className="text-xs text-gray-400 dark:text-gray-500">2-3 business days</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <button 
          onClick={() => navigate('/orders')}
          className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
        >
          Track Order
        </button>
        <button 
          onClick={() => navigate('/')}
          className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Continue Shopping
        </button>
      </div>

      {/* Demo Notice */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6 w-full max-w-md transition-colors duration-300">
        <div className="flex items-start space-x-2">
          <span className="text-yellow-600 dark:text-yellow-400 text-lg">🧪</span>
          <div>
            <div className="font-medium text-yellow-900 dark:text-yellow-200 text-sm">Demo Mode</div>
            <div className="text-xs text-yellow-700 dark:text-yellow-300">
              This was a test transaction. No real money was charged. Perfect for showcasing the complete payment flow!
            </div>
          </div>
        </div>
      </div>

      {/* Email Confirmation Notice */}
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4 max-w-md">
        📧 A confirmation email would be sent to your email address with order details and tracking information.
      </p>
    </div>
  );
};

export default CheckoutConfirmation;