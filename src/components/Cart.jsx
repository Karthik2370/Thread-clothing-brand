import React, { useEffect, useRef } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice,
    getTotalItems 
  } = useCart();
  
  const cartRef = useRef();
  const overlayRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const overlay = overlayRef.current;
    const cart = cartRef.current;
    if (!overlay || !cart) return;
    if (isOpen) {
      // Open animation
      gsap.set([overlay, cart], { display: 'block' });
      gsap.fromTo(overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(cart,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      );
    } else {
      // Close animation
      gsap.to(overlay,
        { opacity: 0, duration: 0.3, ease: 'power2.out' }
      );
      gsap.to(cart,
        { 
          x: '100%', 
          duration: 0.4, 
          ease: 'power3.out',
          onComplete: () => {
            gsap.set([overlay, cart], { display: 'none' });
          }
        }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={toggleCart}
      />

      {/* Cart Panel */}
      <div 
        ref={cartRef}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col transition-colors duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <ShoppingBag size={24} className="text-gray-900 dark:text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Cart ({getTotalItems()})</h2>
          </div>
          <button 
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
          >
            <X size={20} className="text-gray-900 dark:text-white" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Add some products to get started</p>
              <button 
                onClick={toggleCart}
                className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} 
                     className="flex items-center space-x-3 sm:space-x-4 bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">{item.product.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {item.selectedColor} • {item.selectedSize}
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">₹{item.product.price}</p>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200"
                    >
                      <Minus size={14} className="text-gray-900 dark:text-white" />
                    </button>
                    <span className="w-6 sm:w-8 text-center font-medium text-gray-900 dark:text-white text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors duration-200"
                    >
                      <Plus size={14} className="text-gray-900 dark:text-white" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors duration-200"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-white">
              <span>Total:</span>
              <span>₹{getTotalPrice().toFixed(2)}</span>
            </div>
            <button 
              className="w-full bg-black dark:bg-white text-white dark:text-black py-3 sm:py-4 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
              onClick={() => { navigate('/checkout'); toggleCart(); }}
            >
              Checkout
            </button>
            <button 
              onClick={toggleCart}
              className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;