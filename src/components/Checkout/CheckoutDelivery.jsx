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
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₹{getTotalPrice().toFixed(2)}</span>
        </div>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Delivery Date & Time</h2>
        <button type="button" onClick={handleAutofill} className="mb-2 px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors duration-200">Autofill Dummy Data</button>
        <input name="date" value={form.date} onChange={handleChange} required type="date" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" />
        <input name="time" value={form.time} onChange={handleChange} required type="time" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" />
        <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 mt-4">Continue to Payment</button>
      </form>
    </>
  );
};

export default CheckoutDelivery; 