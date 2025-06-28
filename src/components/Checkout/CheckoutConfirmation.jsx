import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CheckCircle, Package, Truck, CreditCard, Copy, Smartphone, Wallet, Lock } from 'lucide-react';

const CheckoutConfirmation = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    // Scroll to top immediately without smooth behavior to avoid conflicts
    window.scrollTo(0, 0);
    
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
      
      // Clear cart after successful payment
      if (clearCart) clearCart();
    }
  }, [clearCart]);

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

  return (
    <div className="w-full max-w-none">
      <div className="flex flex-col items-center justify-start py-4 px-4">
        {/* Success Animation */}
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>

        {/* Success Message */}
        <h2 className="text-xl font-bold mb-2 text-center text-gray-900">Payment Successful! 🎉</h2>
        <p className="text-gray-600 mb-4 text-center text-sm max-w-sm">
          Thank you for your purchase! Your order has been confirmed and will be processed shortly.
        </p>

        {/* Payment Details */}
        {paymentDetails && (
          <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center text-sm">
              <Lock size={14} className="mr-2" />
              Payment Details
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-blue-700">Payment Method:</span>
                <div className="flex items-center space-x-1">
                  {getPaymentMethodIcon(paymentDetails.paymentMethod)}
                  <span className="font-medium text-blue-900 text-xs">
                    {getPaymentMethodName(paymentDetails.paymentMethod)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-blue-700">Transaction ID:</span>
                <div className="flex items-center space-x-1">
                  <span className="font-mono text-xs text-blue-900">
                    {paymentDetails.paymentId.substring(0, 12)}...
                  </span>
                  <button 
                    onClick={() => copyToClipboard(paymentDetails.paymentId)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Copy size={12} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-blue-700">Amount Paid:</span>
                <span className="font-bold text-blue-900">₹{paymentDetails.amount}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-blue-700">Status:</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  ✓ Confirmed
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="w-full bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">Order Number</span>
            <span className="font-mono text-xs font-medium">{orderNumber}</span>
          </div>
          
          <div className="space-y-1 mb-3">
            {items.map(item => (
              <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} 
                   className="flex justify-between text-xs">
                <span className="text-gray-700">
                  {item.product.name} ({item.selectedColor}, {item.selectedSize}) x{item.quantity}
                </span>
                <span className="font-medium">₹{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-2 flex justify-between font-bold text-sm">
            <span>Total Paid</span>
            <span>₹{getTotalPrice().toFixed(2)}</span>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="w-full space-y-3 mb-6">
          <h3 className="font-semibold text-center mb-3 text-sm">Order Timeline</h3>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle size={12} className="text-green-600" />
            </div>
            <div>
              <div className="font-medium text-xs">Payment Confirmed</div>
              <div className="text-xs text-gray-500">Just now - Payment processed successfully</div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
              <Package size={12} className="text-yellow-600" />
            </div>
            <div>
              <div className="font-medium text-xs">Order Processing</div>
              <div className="text-xs text-gray-500">Within 2 hours - Preparing your items</div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Truck size={12} className="text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-xs">Shipped</div>
              <div className="text-xs text-gray-500">Within 24 hours - Tracking info will be sent</div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Package size={12} className="text-gray-400" />
            </div>
            <div>
              <div className="font-medium text-xs text-gray-500">Delivered</div>
              <div className="text-xs text-gray-400">2-3 business days</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 w-full">
          <button 
            onClick={() => navigate('/orders')}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 text-sm"
          >
            Track Order
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 text-sm"
          >
            Continue Shopping
          </button>
        </div>

        {/* Demo Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4 w-full">
          <div className="flex items-start space-x-2">
            <span className="text-yellow-600 text-sm">🧪</span>
            <div>
              <div className="font-medium text-yellow-900 text-xs">Demo Mode</div>
              <div className="text-xs text-yellow-700">
                This was a test transaction. No real money was charged.
              </div>
            </div>
          </div>
        </div>

        {/* Email Confirmation Notice */}
        <p className="text-xs text-gray-500 text-center mt-3">
          📧 A confirmation email would be sent to your email address.
        </p>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;