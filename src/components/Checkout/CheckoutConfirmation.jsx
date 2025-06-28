import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CheckCircle, Package, Truck, CreditCard } from 'lucide-react';

const CheckoutConfirmation = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Generate a random order number for demo
  const orderNumber = `ORD${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Success Icon */}
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <CheckCircle className="w-12 h-12 text-green-500" />
      </div>

      {/* Success Message */}
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-900">Payment Successful!</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Thank you for your purchase. Your order has been confirmed and will be processed shortly.
      </p>

      {/* Order Details */}
      <div className="w-full max-w-md bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">Order Number</span>
          <span className="font-mono text-sm font-medium">{orderNumber}</span>
        </div>
        
        <div className="space-y-2 mb-4">
          {items.map(item => (
            <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} 
                 className="flex justify-between text-sm">
              <span>{item.product.name} ({item.selectedColor}, {item.selectedSize}) x{item.quantity}</span>
              <span>₹{item.product.price * item.quantity}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-2 flex justify-between font-bold">
          <span>Total Paid</span>
          <span>₹{getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      {/* Next Steps */}
      <div className="w-full max-w-md space-y-4 mb-8">
        <h3 className="font-semibold text-center mb-4">What happens next?</h3>
        
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <CreditCard size={16} className="text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-sm">Payment Confirmed</div>
            <div className="text-xs text-gray-500">Your payment has been processed successfully</div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
            <Package size={16} className="text-yellow-600" />
          </div>
          <div>
            <div className="font-medium text-sm">Order Processing</div>
            <div className="text-xs text-gray-500">We're preparing your items for shipment</div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
            <Truck size={16} className="text-green-600" />
          </div>
          <div>
            <div className="font-medium text-sm">Shipping</div>
            <div className="text-xs text-gray-500">You'll receive tracking info within 24 hours</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <button 
          onClick={() => navigate('/orders')}
          className="flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
        >
          View Orders
        </button>
        <button 
          onClick={() => navigate('/')}
          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
        >
          Continue Shopping
        </button>
      </div>

      {/* Email Confirmation Notice */}
      <p className="text-xs text-gray-500 text-center mt-6 max-w-md">
        A confirmation email has been sent to your email address with order details and tracking information.
      </p>
    </div>
  );
};

export default CheckoutConfirmation;