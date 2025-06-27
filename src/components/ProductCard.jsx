import React, { useState, useRef, useEffect } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import LazyImage from './LazyImage';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const { addToCart } = useCart();
  const cardRef = useRef();
  const imageRef = useRef();
  const contentRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(imageRef.current, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, selectedColor, selectedSize);
    
    // Add to cart animation
    gsap.to(cardRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  };

  return (
    <div
      ref={cardRef}
      className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <div ref={imageRef} className="w-full h-full">
          <LazyImage
            src={product.image}
            alt={product.name}
            className="w-full h-full"
          />
        </div>
        
        {/* Overlay Actions */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-3">
            <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200">
              <Heart size={20} className="text-gray-700" />
            </button>
            <button 
              onClick={e => { e.stopPropagation(); handleAddToCart(e); }}
              className="p-3 bg-black rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-200"
              aria-label="Add to Cart"
            >
              <ShoppingBag size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-medium rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div ref={contentRef} className="p-6">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        {/* Colors */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-gray-500">Colors:</span>
          <div className="flex space-x-1">
            {product.colors.slice(0, 3).map((color, idx) => (
              <button
                key={idx}
                onClick={e => { e.stopPropagation(); setSelectedColor(color); }}
                className={`w-6 h-6 rounded-full border-2 ${
                  color === selectedColor ? 'border-black' : 'border-gray-300'
                }`}
                style={{ 
                  backgroundColor: color === 'white' ? '#fff' : 
                                 color === 'black' ? '#000' : 
                                 color === 'gray' ? '#6b7280' : color 
                }}
              />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-gray-500">Sizes:</span>
          <div className="flex space-x-1">
            {product.sizes.slice(0, 4).map((size) => (
              <button
                key={size}
                onClick={e => { e.stopPropagation(); setSelectedSize(size); }}
                className={`px-2 py-1 text-xs border rounded ${
                  size === selectedSize 
                    ? 'border-black bg-black text-white' 
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
          <button 
            onClick={e => { e.stopPropagation(); handleAddToCart(e); }}
            className="p-3 bg-black rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-200"
            aria-label="Add to Cart"
          >
            <ShoppingBag size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;