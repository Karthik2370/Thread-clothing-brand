import React, { useState, useEffect } from 'react';

const DUMMY_ORDERS = [
  {
    id: 'ORD12345',
    status: 'Completed',
    date: '2024-06-01',
    items: [
      { name: 'Essential Black Tee', qty: 1, price: 1299 },
      { name: 'Minimalist White', qty: 2, price: 1099 },
    ],
    total: 3497,
  },
  {
    id: 'ORD12346',
    status: 'In Progress',
    date: '2024-06-10',
    items: [
      { name: 'Geometric Print', qty: 1, price: 1499 },
    ],
    total: 1499,
  },
];

const TABS = ['All', 'Completed', 'In Progress'];

const Orders = () => {
  const [tab, setTab] = useState('All');
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const filtered = tab === 'All' ? DUMMY_ORDERS : DUMMY_ORDERS.filter(o => o.status === tab);
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2 sm:px-0 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-4 sm:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>
        <div className="flex justify-center gap-2 mb-6">
          {TABS.map(t => (
            <button
              key={t}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${tab === t ? 'bg-black text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No orders found.</div>
        ) : (
          <div className="space-y-6">
            {filtered.map(order => (
              <div key={order.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div className="font-semibold">Order #{order.id}</div>
                  <div className={`text-xs px-2 py-1 rounded-full font-medium mt-2 sm:mt-0 ${order.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status}</div>
                </div>
                <div className="text-xs text-gray-500 mb-2">Placed on {order.date}</div>
                <ul className="mb-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-sm">
                      <span>{item.name} x{item.qty}</span>
                      <span>₹{item.price * item.qty}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders; 