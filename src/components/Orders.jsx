import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ChevronRight, Calendar, CreditCard, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { DUMMY_ORDERS } from '../data/mockData';
import { useCart } from '../context/CartContext';

const TABS = ['All', 'Processing', 'Shipped', 'Delivered'];

const Orders = () => {
  const [tab, setTab] = useState('All');
  const [showMetrics, setShowMetrics] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  const filtered = tab === 'All' ? DUMMY_ORDERS : DUMMY_ORDERS.filter(o => o.status === tab);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200';
      case 'Shipped': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200';
      case 'Processing': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getPaymentMethodIcon = (method) => {
    return <CreditCard size={14} className="text-gray-500 dark:text-gray-400" />;
  };

  const handleReorder = (order) => {
    // Add all items from the order to cart
    order.items.forEach(item => {
      // Find the product by name (in a real app, you'd use product ID)
      const product = {
        id: item.name.toLowerCase().replace(/\s+/g, '-'),
        name: item.name,
        price: item.price,
        image: item.image,
        colors: ['black', 'white', 'gray'], // Default colors
        sizes: ['XS', 'S', 'M', 'L', 'XL'] // Default sizes
      };
      
      // Add to cart with default selections
      for (let i = 0; i < item.qty; i++) {
        addToCart(product, 'black', 'M'); // Default color and size
      }
    });
    
    alert(`${order.items.length} item(s) added to cart!`);
  };

  const totalSpent = DUMMY_ORDERS.reduce((sum, order) => sum + order.total, 0);
  const deliveredOrders = DUMMY_ORDERS.filter(o => o.status === 'Delivered').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-2 sm:px-0 flex flex-col items-center transition-colors duration-300">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-8 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Orders</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowMetrics(!showMetrics)}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
              title={showMetrics ? 'Hide Statistics' : 'Show Statistics'}
            >
              {showMetrics ? <EyeOff size={16} /> : <Eye size={16} />}
              <span>{showMetrics ? 'Hide Stats' : 'Show Stats'}</span>
            </button>
            <Package size={24} className="text-gray-400 dark:text-gray-500" />
          </div>
        </div>
        
        {/* Order Statistics - Conditionally shown */}
        {showMetrics && (
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center transition-colors duration-300">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{DUMMY_ORDERS.length}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Total Orders</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center transition-colors duration-300">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">₹{totalSpent}</div>
              <div className="text-sm text-green-700 dark:text-green-300">Total Spent</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center transition-colors duration-300">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{deliveredOrders}</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Delivered</div>
            </div>
          </div>
        )}
        
        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-6 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                tab === t 
                  ? 'bg-black dark:bg-white text-white dark:text-black' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
              onClick={() => setTab(t)}
            >
              {t} {t !== 'All' && `(${DUMMY_ORDERS.filter(o => o.status === t).length})`}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            <Package size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No orders found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't placed any orders yet.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(order => (
              <div 
                key={order.id} 
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer group"
                onClick={() => navigate(`/order/${order.id}`)}
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="font-semibold text-lg text-gray-900 dark:text-white">#{order.orderNumber}</div>
                    <div className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                    <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={14} />
                      <span>{new Date(order.date).toLocaleDateString('en-IN')}</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200" />
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
                        className="w-10 h-10 rounded-lg object-cover border-2 border-white dark:border-gray-800 shadow-sm"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800 shadow-sm flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {order.items.length === 1 
                        ? order.items[0].name
                        : `${order.items[0].name} ${order.items.length > 1 ? `and ${order.items.length - 1} more item${order.items.length > 2 ? 's' : ''}` : ''}`
                      }
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {order.items.reduce((total, item) => total + item.qty, 0)} item{order.items.reduce((total, item) => total + item.qty, 0) > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                {/* Order Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    {getPaymentMethodIcon(order.paymentMethod)}
                    <span>{order.paymentMethod}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-gray-900 dark:text-white">₹{order.total}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Total Amount</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/order/${order.id}`);
                    }}
                    className="flex-1 bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
                  >
                    View Details
                  </button>
                  {order.status === 'Delivered' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReorder(order);
                      }}
                      className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-1"
                    >
                      <TrendingUp size={14} />
                      Reorder
                    </button>
                  )}
                  {(order.status === 'Shipped' || order.status === 'Processing') && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/order/${order.id}?tab=tracking`);
                      }}
                      className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      Track Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Helpful Tips */}
        {filtered.length > 0 && (
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 transition-colors duration-300">
            <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">💡 Order Tips</h3>
            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <p>• Click on any order to view detailed tracking and information</p>
              <p>• Use "Reorder" to quickly add previous purchases to your cart</p>
              <p>• Track your shipments in real-time from the order details page</p>
              {showMetrics && <p>• Toggle statistics visibility to focus on your orders</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;