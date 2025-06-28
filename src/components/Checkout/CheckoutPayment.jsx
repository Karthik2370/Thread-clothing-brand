import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CreditCard, Smartphone, Wallet, Shield } from 'lucide-react';

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRazorpayPayment = () => {
    setIsProcessing(true);

    // Razorpay configuration
    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag', // Test key - replace with your actual test key
      amount: getTotalPrice() * 100, // Amount in paise (multiply by 100)
      currency: 'INR',
      name: 'THREAD',
      description: 'Premium T-shirt Purchase',
      image: '/favicon-96.png', // Your logo
      order_id: '', // Optional - for server-side order creation
      handler: function (response) {
        // Payment successful
        console.log('Payment successful:', response);
        setIsProcessing(false);
        
        // Store payment details for confirmation page
        localStorage.setItem('razorpay_payment_id', response.razorpay_payment_id);
        localStorage.setItem('razorpay_order_id', response.razorpay_order_id || '');
        localStorage.setItem('razorpay_signature', response.razorpay_signature || '');
        
        navigate('/checkout/confirmation');
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'THREAD Store'
      },
      theme: {
        color: '#000000'
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
          console.log('Payment modal closed');
        }
      }
    };

    const rzp = new window.Razorpay(options);
    
    rzp.on('payment.failed', function (response) {
      setIsProcessing(false);
      alert('Payment failed: ' + response.error.description);
      console.log('Payment failed:', response.error);
    });

    rzp.open();
  };

  const handleDemoPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // Store demo payment details
      localStorage.setItem('demo_payment_id', 'demo_' + Date.now());
      navigate('/checkout/confirmation');
    }, 2000);
  };

  return (
    <>
      {/* Order Summary */}
      <div className="mb-6 bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        <ul className="divide-y divide-gray-200 mb-2">
          {items.map(item => (
            <li key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex justify-between items-center py-2 text-sm">
              <span>{item.product.name} ({item.selectedColor}, {item.selectedSize}) x{item.quantity}</span>
              <span>₹{item.product.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>
        
        {/* Payment Method Selection */}
        <div className="space-y-3">
          <div 
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              paymentMethod === 'razorpay' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setPaymentMethod('razorpay')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === 'razorpay' ? 'border-black bg-black' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'razorpay' && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <img src="https://razorpay.com/assets/razorpay-logo.svg" alt="Razorpay" className="h-6" />
                </div>
                <div>
                  <div className="font-medium">Razorpay Payment</div>
                  <div className="text-sm text-gray-500">Cards, UPI, Wallets & More</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard size={20} className="text-gray-400" />
                <Smartphone size={20} className="text-gray-400" />
                <Wallet size={20} className="text-gray-400" />
              </div>
            </div>
          </div>

          <div 
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              paymentMethod === 'demo' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setPaymentMethod('demo')}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                paymentMethod === 'demo' ? 'border-black bg-black' : 'border-gray-300'
              }`}>
                {paymentMethod === 'demo' && (
                  <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                )}
              </div>
              <div>
                <div className="font-medium">Demo Payment</div>
                <div className="text-sm text-gray-500">For testing purposes only</div>
              </div>
            </div>
          </div>
        </div>

        {/* Razorpay Payment Info */}
        {paymentMethod === 'razorpay' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield size={20} className="text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Secure Razorpay Payment</h4>
                <p className="text-sm text-blue-700 mb-2">
                  Pay securely using Credit/Debit Cards, UPI, Net Banking, or Digital Wallets. 
                  Your payment information is encrypted and secure.
                </p>
                <div className="flex items-center space-x-4 text-xs text-blue-600">
                  <span>✓ 256-bit SSL Encryption</span>
                  <span>✓ PCI DSS Compliant</span>
                  <span>✓ Instant Confirmation</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Supported Payment Methods for Razorpay */}
        {paymentMethod === 'razorpay' && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-3">Supported Payment Methods</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-gray-700 mb-1">Cards</div>
                <div className="text-gray-600">Visa, Mastercard, Rupay, Amex</div>
              </div>
              <div>
                <div className="font-medium text-gray-700 mb-1">UPI</div>
                <div className="text-gray-600">GPay, PhonePe, Paytm, BHIM</div>
              </div>
              <div>
                <div className="font-medium text-gray-700 mb-1">Wallets</div>
                <div className="text-gray-600">Paytm, Mobikwik, Freecharge</div>
              </div>
              <div>
                <div className="font-medium text-gray-700 mb-1">Banking</div>
                <div className="text-gray-600">Net Banking, EMI</div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Button */}
        <button
          onClick={paymentMethod === 'razorpay' ? handleRazorpayPayment : handleDemoPayment}
          disabled={isProcessing}
          className={`w-full py-4 rounded-lg font-medium text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
            isProcessing 
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
              : 'bg-black text-white hover:bg-gray-800 transform hover:scale-[1.02]'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <span>
              {paymentMethod === 'razorpay' 
                ? `Pay ₹${getTotalPrice().toFixed(2)} with Razorpay` 
                : `Complete Demo Payment ₹${getTotalPrice().toFixed(2)}`
              }
            </span>
          )}
        </button>

        {/* Security Notice */}
        <div className="text-center text-sm text-gray-500">
          <p>🔒 Your payment information is secure and encrypted</p>
          {paymentMethod === 'razorpay' && (
            <p className="mt-1">Powered by Razorpay - India's most trusted payment gateway</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutPayment;