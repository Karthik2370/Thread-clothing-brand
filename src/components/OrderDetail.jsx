import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Star, MessageCircle, RotateCcw, Copy, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { gsap } from 'gsap';

// Mock order data - in a real app, this would come from an API
const MOCK_ORDERS = {
  'ORD12345': {
    id: 'ORD12345',
    orderNumber: 'THR001234567',
    status: 'Delivered',
    date: '2024-06-01',
    deliveryDate: '2024-06-05',
    estimatedDelivery: '2024-06-05',
    trackingNumber: 'TRK789456123',
    paymentMethod: 'Credit Card',
    paymentId: 'pay_abc123xyz',
    items: [
      { 
        id: '1',
        name: 'Essential Black Tee', 
        qty: 1, 
        price: 1299,
        color: 'Black',
        size: 'M',
        image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80'
      },
      { 
        id: '2',
        name: 'Minimalist White', 
        qty: 2, 
        price: 1099,
        color: 'White',
        size: 'L',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80'
      },
    ],
    total: 3497,
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      phone: '+91 9876543210'
    },
    timeline: [
      { status: 'Order Placed', date: '2024-06-01 10:30 AM', completed: true },
      { status: 'Payment Confirmed', date: '2024-06-01 10:31 AM', completed: true },
      { status: 'Order Processing', date: '2024-06-01 2:15 PM', completed: true },
      { status: 'Shipped', date: '2024-06-02 9:00 AM', completed: true },
      { status: 'Out for Delivery', date: '2024-06-05 8:30 AM', completed: true },
      { status: 'Delivered', date: '2024-06-05 3:45 PM', completed: true }
    ]
  },
  'ORD12346': {
    id: 'ORD12346',
    orderNumber: 'THR001234568',
    status: 'Shipped',
    date: '2024-06-10',
    estimatedDelivery: '2024-06-15',
    trackingNumber: 'TRK789456124',
    paymentMethod: 'UPI',
    paymentId: 'pay_def456uvw',
    items: [
      { 
        id: '3',
        name: 'Geometric Print', 
        qty: 1, 
        price: 1499,
        color: 'Black',
        size: 'L',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
      },
    ],
    total: 1499,
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      phone: '+91 9876543210'
    },
    timeline: [
      { status: 'Order Placed', date: '2024-06-10 2:15 PM', completed: true },
      { status: 'Payment Confirmed', date: '2024-06-10 2:16 PM', completed: true },
      { status: 'Order Processing', date: '2024-06-10 5:30 PM', completed: true },
      { status: 'Shipped', date: '2024-06-11 11:00 AM', completed: true },
      { status: 'Out for Delivery', date: '', completed: false },
      { status: 'Delivered', date: '', completed: false }
    ]
  }
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const mainRef = useRef();
  const timelineRef = useRef();

  const order = MOCK_ORDERS[orderId];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      );
    }

    // Animate timeline items
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current.children,
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.5, 
          stagger: 0.1, 
          ease: 'power2.out',
          delay: 0.3
        }
      );
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20">
        <Package size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <p className="text-gray-600 mb-6">The order you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/orders')} 
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back to Orders
        </button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Shipped': return 'text-blue-600 bg-blue-100';
      case 'Processing': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleReviewSubmit = (productId, rating, review) => {
    // In a real app, this would submit to an API
    console.log('Review submitted:', { productId, rating, review });
    setShowReviewModal(false);
    setSelectedProduct(null);
    alert('Review submitted successfully!');
  };

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div ref={mainRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/orders')} 
            className="mb-4 flex items-center text-gray-500 hover:text-black transition-colors duration-200"
          >
            <ArrowLeft size={18} className="mr-2" /> Back to Orders
          </button>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Order #{order.orderNumber}</h1>
                <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Total Amount:</span>
                <div className="font-semibold text-lg">₹{order.total}</div>
              </div>
              <div>
                <span className="text-gray-500">Payment Method:</span>
                <div className="font-medium">{order.paymentMethod}</div>
              </div>
              <div>
                <span className="text-gray-500">Estimated Delivery:</span>
                <div className="font-medium">
                  {new Date(order.estimatedDelivery).toLocaleDateString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'details', label: 'Order Details', icon: Package },
                { id: 'tracking', label: 'Tracking', icon: Truck },
                { id: 'support', label: 'Support', icon: MessageCircle }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${
                    activeTab === id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Items Ordered</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        Color: {item.color} • Size: {item.size} • Qty: {item.qty}
                      </p>
                      <p className="font-semibold text-gray-900">₹{item.price}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {order.status === 'Delivered' && (
                        <button 
                          onClick={() => {
                            setSelectedProduct(item);
                            setShowReviewModal(true);
                          }}
                          className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition-colors duration-200"
                        >
                          <Star size={14} className="inline mr-1" />
                          Review
                        </button>
                      )}
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <RotateCcw size={14} className="inline mr-1" />
                        Return
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin size={18} className="mr-2" />
                Shipping Address
              </h3>
              <div className="text-gray-700">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                <p className="mt-2">
                  <Phone size={14} className="inline mr-1" />
                  {order.shippingAddress.phone}
                </p>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transaction ID:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">{order.paymentId}</span>
                    <button 
                      onClick={() => copyToClipboard(order.paymentId)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Paid:</span>
                  <span className="font-bold text-lg">₹{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Order Tracking</h3>
              {order.trackingNumber && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Tracking:</span>
                  <span className="font-mono text-sm font-medium">{order.trackingNumber}</span>
                  <button 
                    onClick={() => copyToClipboard(order.trackingNumber)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              )}
            </div>
            
            <div ref={timelineRef} className="space-y-4">
              {order.timeline.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.completed ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {step.completed ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <Clock size={16} className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                      {step.status}
                    </div>
                    <div className="text-sm text-gray-500">
                      {step.date || 'Pending'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
                  <MessageCircle size={20} className="text-blue-600 mb-2" />
                  <div className="font-medium">Chat with Support</div>
                  <div className="text-sm text-gray-500">Get instant help from our team</div>
                </button>
                
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
                  <Phone size={20} className="text-green-600 mb-2" />
                  <div className="font-medium">Call Support</div>
                  <div className="text-sm text-gray-500">1800-123-4567 (Toll Free)</div>
                </button>
                
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
                  <Mail size={20} className="text-purple-600 mb-2" />
                  <div className="font-medium">Email Support</div>
                  <div className="text-sm text-gray-500">support@thread.com</div>
                </button>
                
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left">
                  <RotateCcw size={20} className="text-orange-600 mb-2" />
                  <div className="font-medium">Return/Exchange</div>
                  <div className="text-sm text-gray-500">30-day return policy</div>
                </button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-2">Frequently Asked Questions</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium text-blue-800">How can I track my order?</div>
                  <div className="text-blue-700">Use the tracking number provided in the Tracking tab above.</div>
                </div>
                <div>
                  <div className="font-medium text-blue-800">What is your return policy?</div>
                  <div className="text-blue-700">We offer 30-day returns for unworn items in original condition.</div>
                </div>
                <div>
                  <div className="font-medium text-blue-800">How long does delivery take?</div>
                  <div className="text-blue-700">Standard delivery takes 2-5 business days within India.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedProduct && (
        <ReviewModal 
          product={selectedProduct}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedProduct(null);
          }}
          onSubmit={handleReviewSubmit}
        />
      )}
    </section>
  );
};

// Review Modal Component
const ReviewModal = ({ product, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    onSubmit(product.id, rating, review);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-4">Review {product.name}</h3>
        
        <div className="flex items-center space-x-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-12 h-12 object-cover rounded-lg"
          />
          <div>
            <div className="font-medium">{product.name}</div>
            <div className="text-sm text-gray-500">{product.color} • {product.size}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="text-2xl transition-colors duration-200"
                >
                  <Star 
                    size={24} 
                    className={`${
                      star <= (hoveredRating || rating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Review (Optional)</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              rows={4}
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Submit Review
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderDetail;