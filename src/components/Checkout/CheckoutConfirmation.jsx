import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutConfirmation = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-center">Order Confirmed!</h2>
      <p className="text-gray-600 mb-6 text-center">Thank you for your purchase. Your order has been placed and will be delivered soon.</p>
      <button onClick={() => navigate('/')} className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">Back to Home</button>
    </div>
  );
};

export default CheckoutConfirmation; 