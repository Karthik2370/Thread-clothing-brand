import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const DUMMY = {
  date: '2025-01-01',
  time: '12:00',
};

const CheckoutDelivery = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice } = useCart();
  const [form, setForm] = useState({
    date: '',
    time: '',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAutofill = () => {
    setForm(DUMMY);
  };

  const handleSubmit = e => {
    e.preventDefault();
    navigate('/checkout/payment');
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
        <div className="flex justify-between font-bold text-gray-900 dark:text-white">
          <span>Total</span>
          <span>₹{getTotalPrice().toFixed(2)}</span>
        </div>
      </div>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Delivery Date & Time</h2>
        <button 
          type="button" 
          onClick={handleAutofill} 
          className="mb-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 text-gray-900 dark:text-white"
        >
          Autofill Dummy Data
        </button>
        <input 
          name="date" 
          value={form.date} 
          onChange={handleChange} 
          required 
          type="date" 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300" 
        />
        <input 
          name="time" 
          value={form.time} 
          onChange={handleChange} 
          required 
          type="time" 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300" 
        />
        <button 
          type="submit" 
          className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 mt-4"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutDelivery;