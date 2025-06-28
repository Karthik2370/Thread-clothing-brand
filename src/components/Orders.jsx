import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ChevronRight, Calendar, CreditCard } from 'lucide-react';

const DUMMY_ORDERS = [
  {
    id: 'ORD12345',
    orderNumber: 'THR001234567',
    status: 'Delivered',
    date: '2024-06-01',
    items: [
      { name: 'Essential Black Tee', qty: 1, price: 1299, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80' },
      { name: 'Minimalist White', qty: 2, price: 1099, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80' },
    ],
    total: 3497,
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD12346',
    orderNumber: 'THR001234568',
    status: 'Shipped',
    date: '2024-06-10',
    items: [
      { name: 'Geometric Print', qty: 1, price: 1499, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80' },
    ],
    total: 1499,
    paymentMethod: 'UPI'
  },
  {
    id: 'ORD12347',
    orderNumber: 'THR001234569',
    status: 'Processing',
    date: '2024-06-15',
    items: [
      { name: 'Vintage Fade', qty: 1, price: 1699, image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80' },
      { name: 'Urban Oversized', qty: 1, price: 1899, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80' },
    ],
    total: 3598,
    paymentMethod: 'Digital Wallet'
  },
];

const TABS = ['All', 'Processing', 'Shipped', 'Delivered'];

const Orders = () => {
  const [tab, setTab] = useState('All');
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  const filtered = tab === 'All' ? DUMMY_ORDERS : DUMMY_ORDERS.filter(o => o.status === tab);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Processing': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentMethodIcon = (method) => {
    return <CreditCard size={14} className="text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2 sm:px-0 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">My Orders</h2>
          <Package size={24} className="text-gray-400" />
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-6 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                tab === t 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setTab(t)}
            >
              {t} {t !== 'All' && `(${DUMMY_ORDERS.filter(o => o.status === t).length})`}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(order => (
              <div 
                key={order.id} 
                className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer group"
                onClick={() => navigate(`/order/${order.id}`)}
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="font-semibold text-lg">#{order.orderNumber}</div>
                    <div className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Calendar size={14} />
                      <span>{new Date(order.date).toLocaleDateString('en-IN')}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex -space-x-2">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <img 
                        key={idx}
                        src={item.image} 
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover border-2 border-white shadow-sm"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-10 h-10 rounded-lg bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center text-xs font-medium text-gray-600">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-700">
                      {order.items.length === 1 
                        ? order.items[0].name
                        : `${order.items[0].name} ${order.items.length > 1 ? `and ${order.items.length - 1} more item${order.items.length > 2 ? 's' : ''}` : ''}`
                      }
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.items.reduce((total, item) => total + item.qty, 0)} item{order.items.reduce((total, item) => total + item.qty, 0) > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                {/* Order Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    {getPaymentMethodIcon(order.paymentMethod)}
                    <span>{order.paymentMethod}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-gray-900">₹{order.total}</div>
                    <div className="text-xs text-gray-500">Total Amount</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-200">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/order/${order.id}`);
                    }}
                    className="flex-1 bg-black text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                  >
                    View Details
                  </button>
                  {order.status === 'Delivered' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle reorder logic
                        alert('Reorder functionality would be implemented here');
                      }}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      Reorder
                    </button>
                  )}
                  {(order.status === 'Shipped' || order.status === 'Processing') && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/order/${order.id}?tab=tracking`);
                      }}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
                    >
                      Track Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Statistics */}
        {filtered.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{DUMMY_ORDERS.length}</div>
              <div className="text-sm text-blue-700">Total Orders</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                ₹{DUMMY_ORDERS.reduce((sum, order) => sum + order.total, 0)}
              </div>
              <div className="text-sm text-green-700">Total Spent</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {DUMMY_ORDERS.filter(o => o.status === 'Delivered').length}
              </div>
              <div className="text-sm text-purple-700">Delivered</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;