import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CreditCard, ExternalLink } from 'lucide-react';

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Create Stripe Payment Link URL with line items
  const createStripePaymentLink = () => {
    // For demo purposes, we'll use a pre-created Stripe Payment Link
    // In a real implementation, you would create these Payment Links in your Stripe Dashboard
    // and map them to your products
    
    const baseUrl = 'https://buy.stripe.com/test_';
    
    // Example Payment Links (you would create these in your Stripe Dashboard)
    const paymentLinks = {
      'single-item': 'eVa7sQ0OQ4Og6pq000', // Example link for single items
      'multiple-items': 'bIY5kI8gofYM6pq001' // Example link for multiple items
    };
    
    // For demo, we'll use a generic payment link
    // In production, you'd dynamically select based on cart contents
    const linkId = items.length === 1 ? paymentLinks['single-item'] : paymentLinks['multiple-items'];
    
    return `${baseUrl}${linkId}`;
  };

  const handleStripePayment = () => {
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const paymentUrl = createStripePaymentLink();
      
      // Open Stripe Payment Link in new tab
      window.open(paymentUrl, '_blank');
      
      // For demo purposes, we'll automatically redirect to confirmation after a delay
      // In production, you'd handle this via Stripe webhooks or redirect URLs
      setTimeout(() => {
        setIsProcessing(false);
        navigate('/checkout/confirmation');
      }, 3000);
    }, 1000);
  };

  const handleDemoPayment = () => {
    // Simulate demo payment processing
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
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
              paymentMethod === 'stripe' ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setPaymentMethod('stripe')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === 'stripe' ? 'border-black bg-black' : 'border-gray-300'
                }`}>
                  {paymentMethod === 'stripe' && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <CreditCard size={20} className="text-gray-600" />
                <div>
                  <div className="font-medium">Stripe Payment</div>
                  <div className="text-sm text-gray-500">Secure payment with credit/debit card</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <img src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" alt="Visa" className="h-6" />
                <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="Mastercard" className="h-6" />
                <img src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg" alt="Amex" className="h-6" />
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

        {/* Stripe Payment Info */}
        {paymentMethod === 'stripe' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <ExternalLink size={20} className="text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Secure Stripe Payment</h4>
                <p className="text-sm text-blue-700 mb-2">
                  You'll be redirected to Stripe's secure payment page to complete your purchase. 
                  Your payment information is encrypted and secure.
                </p>
                <p className="text-xs text-blue-600">
                  After payment, you'll be automatically redirected back to our confirmation page.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Button */}
        <button
          onClick={paymentMethod === 'stripe' ? handleStripePayment : handleDemoPayment}
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
            <>
              {paymentMethod === 'stripe' && <ExternalLink size={20} />}
              <span>
                {paymentMethod === 'stripe' 
                  ? `Pay ₹${getTotalPrice().toFixed(2)} with Stripe` 
                  : `Complete Demo Payment ₹${getTotalPrice().toFixed(2)}`
                }
              </span>
            </>
          )}
        </button>

        {/* Security Notice */}
        <div className="text-center text-sm text-gray-500">
          <p>🔒 Your payment information is secure and encrypted</p>
        </div>
      </div>
    </>
  );
};

export default CheckoutPayment;