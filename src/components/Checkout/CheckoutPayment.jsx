import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CreditCard, Smartphone, Wallet, Shield, Lock, CheckCircle } from 'lucide-react';

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardForm, setCardForm] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiId, setUpiId] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleCardChange = (e) => {
    let { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'number') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (value.length > 19) value = value.substring(0, 19);
    }
    
    // Format expiry as MM/YY
    if (name === 'expiry') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      if (value.length > 5) value = value.substring(0, 5);
    }
    
    // Limit CVV to 3-4 digits
    if (name === 'cvv') {
      value = value.replace(/\D/g, '').substring(0, 4);
    }
    
    setCardForm(prev => ({ ...prev, [name]: value }));
  };

  const autofillCard = () => {
    setCardForm({
      number: '4111 1111 1111 1111',
      expiry: '12/25',
      cvv: '123',
      name: 'John Doe'
    });
  };

  const autofillUPI = () => {
    setUpiId('john@paytm');
  };

  const handlePayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Store mock payment details
      const paymentId = 'pay_' + Math.random().toString(36).substr(2, 9);
      const orderId = 'order_' + Math.random().toString(36).substr(2, 9);
      
      localStorage.setItem('mock_payment_id', paymentId);
      localStorage.setItem('mock_order_id', orderId);
      localStorage.setItem('mock_payment_method', paymentMethod);
      localStorage.setItem('mock_amount', getTotalPrice().toString());
      
      navigate('/checkout/confirmation');
    }, 3000); // 3 second realistic processing time
  };

  const isFormValid = () => {
    if (paymentMethod === 'card') {
      return cardForm.number.length >= 19 && 
             cardForm.expiry.length === 5 && 
             cardForm.cvv.length >= 3 && 
             cardForm.name.length > 0;
    }
    if (paymentMethod === 'upi') {
      return upiId.includes('@') && upiId.length > 5;
    }
    return true; // For wallet payments
  };

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="mb-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Order Summary</h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-600 mb-2">
          {items.map(item => (
            <li key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex justify-between items-center py-2 text-sm">
              <span className="text-gray-700 dark:text-gray-300">{item.product.name} ({item.selectedColor}, {item.selectedSize}) x{item.quantity}</span>
              <span className="text-gray-900 dark:text-white">₹{item.product.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
          <span>Total</span>
          <span>₹{getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Choose Payment Method</h2>
        
        {/* Payment Method Selection */}
        <div className="space-y-3">
          {/* Credit/Debit Card */}
          <div 
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              paymentMethod === 'card' ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-700' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
            onClick={() => setPaymentMethod('card')}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                paymentMethod === 'card' ? 'border-black dark:border-white bg-black dark:bg-white' : 'border-gray-300 dark:border-gray-600'
              }`}>
                {paymentMethod === 'card' && (
                  <div className="w-2 h-2 bg-white dark:bg-black rounded-full mx-auto mt-0.5"></div>
                )}
              </div>
              <CreditCard size={20} className="text-gray-600 dark:text-gray-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Credit / Debit Card</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Visa, Mastercard, Rupay</div>
              </div>
            </div>
          </div>

          {/* UPI */}
          <div 
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              paymentMethod === 'upi' ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-700' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
            onClick={() => setPaymentMethod('upi')}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                paymentMethod === 'upi' ? 'border-black dark:border-white bg-black dark:bg-white' : 'border-gray-300 dark:border-gray-600'
              }`}>
                {paymentMethod === 'upi' && (
                  <div className="w-2 h-2 bg-white dark:bg-black rounded-full mx-auto mt-0.5"></div>
                )}
              </div>
              <Smartphone size={20} className="text-gray-600 dark:text-gray-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">UPI Payment</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Google Pay, PhonePe, Paytm</div>
              </div>
            </div>
          </div>

          {/* Digital Wallet */}
          <div 
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
              paymentMethod === 'wallet' ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-700' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
            onClick={() => setPaymentMethod('wallet')}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                paymentMethod === 'wallet' ? 'border-black dark:border-white bg-black dark:bg-white' : 'border-gray-300 dark:border-gray-600'
              }`}>
                {paymentMethod === 'wallet' && (
                  <div className="w-2 h-2 bg-white dark:bg-black rounded-full mx-auto mt-0.5"></div>
                )}
              </div>
              <Wallet size={20} className="text-gray-600 dark:text-gray-400" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Digital Wallet</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Paytm, Mobikwik, Freecharge</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Forms */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900 dark:text-white">Card Details</h3>
              <button 
                type="button" 
                onClick={autofillCard}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
              >
                Use Test Card
              </button>
            </div>
            
            <div className="space-y-3">
              <input
                type="text"
                name="number"
                placeholder="Card Number"
                value={cardForm.number}
                onChange={handleCardChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
              />
              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={cardForm.expiry}
                  onChange={handleCardChange}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={cardForm.cvv}
                  onChange={handleCardChange}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
                />
              </div>
              
              <input
                type="text"
                name="name"
                placeholder="Cardholder Name"
                value={cardForm.name}
                onChange={handleCardChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
              />
            </div>
          </div>
        )}

        {paymentMethod === 'upi' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900 dark:text-white">UPI Details</h3>
              <button 
                type="button" 
                onClick={autofillUPI}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
              >
                Use Test UPI
              </button>
            </div>
            
            <input
              type="text"
              placeholder="Enter UPI ID (e.g., john@paytm)"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
            />
          </div>
        )}

        {paymentMethod === 'wallet' && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 transition-colors duration-300">
            <div className="flex items-center space-x-2 mb-2">
              <Wallet size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-blue-900 dark:text-blue-200">Digital Wallet Payment</span>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              You will be redirected to your selected wallet app to complete the payment.
            </p>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 transition-colors duration-300">
          <div className="flex items-start space-x-3">
            <Shield size={20} className="text-green-600 dark:text-green-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-900 dark:text-green-200 mb-1">🧪 Demo Payment System</h4>
              <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                This is a realistic payment simulation for testing purposes. No real money will be charged.
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-green-600 dark:text-green-400">
                <span>✓ Secure Testing Environment</span>
                <span>✓ No Real Transactions</span>
                <span>✓ Full Payment Flow</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={isProcessing || !isFormValid()}
          className={`w-full py-4 rounded-lg font-medium text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
            isProcessing || !isFormValid()
              ? 'bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-400 cursor-not-allowed' 
              : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transform hover:scale-[1.02]'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white dark:border-black"></div>
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <Lock size={18} />
              <span>Pay ₹{getTotalPrice().toFixed(2)} Securely</span>
            </>
          )}
        </button>

        {/* Test Credentials */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
          <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Test Credentials</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">Test Card</div>
              <div className="text-gray-600 dark:text-gray-400">4111 1111 1111 1111</div>
              <div className="text-gray-600 dark:text-gray-400">Expiry: 12/25, CVV: 123</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">Test UPI</div>
              <div className="text-gray-600 dark:text-gray-400">john@paytm</div>
              <div className="text-gray-600 dark:text-gray-400">success@upi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPayment;