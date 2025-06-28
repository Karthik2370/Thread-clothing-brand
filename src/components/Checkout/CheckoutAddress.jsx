import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const DUMMY = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '9876543210',
  address: '123 Main Street',
  city: 'Mumbai',
  zip: '400001',
};

const CheckoutAddress = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice } = useCart();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
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
    navigate('/checkout/delivery');
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
      
      <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Contact & Shipping Details</h2>
        <button 
          type="button" 
          onClick={handleAutofill} 
          className="mb-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200 text-gray-900 dark:text-white"
        >
          Autofill Dummy Data
        </button>
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            required 
            placeholder="Full Name" 
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300" 
          />
          <input 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            required 
            type="email" 
            placeholder="Email" 
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300" 
          />
        </div>
        <input 
          name="phone" 
          value={form.phone} 
          onChange={handleChange} 
          required 
          placeholder="Phone Number" 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300" 
        />
        <input 
          name="address" 
          value={form.address} 
          onChange={handleChange} 
          required 
          placeholder="Address" 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300" 
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            name="city" 
            value={form.city} 
            onChange={handleChange} 
            required 
            placeholder="City" 
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300" 
          />
          <input 
            name="zip" 
            value={form.zip} 
            onChange={handleChange} 
            required 
            placeholder="ZIP Code" 
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300" 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 mt-4"
        >
          Continue to Delivery
        </button>
      </form>
    </div>
  );
};

export default CheckoutAddress;