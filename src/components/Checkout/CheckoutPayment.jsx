import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const DUMMY = {
  card: '4111 1111 1111 1111',
  expiry: '12/25',
  cvv: '123',
  name: 'John Doe',
};

const CheckoutPayment = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice } = useCart();
  const [form, setForm] = useState({
    card: '',
    expiry: '',
    cvv: '',
    name: '',
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
    navigate('/checkout/confirmation');
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
        <h2 className="text-xl font-bold mb-4">Payment Details</h2>
        <button type="button" onClick={handleAutofill} className="mb-2 px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors duration-200">Autofill Dummy Data</button>
        <input name="card" value={form.card} onChange={handleChange} required placeholder="Card Number" maxLength={19} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" />
        <div className="flex flex-col sm:flex-row gap-4">
          <input name="expiry" value={form.expiry} onChange={handleChange} required placeholder="MM/YY" maxLength={5} className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" />
          <input name="cvv" value={form.cvv} onChange={handleChange} required placeholder="CVV" maxLength={4} className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
        <input name="name" value={form.name} onChange={handleChange} required placeholder="Name on Card" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" />
        <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 mt-4">Confirm Payment</button>
      </form>
    </>
  );
};

export default CheckoutPayment; 