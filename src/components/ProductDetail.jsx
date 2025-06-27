import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { gsap } from 'gsap';
import LazyImage from './LazyImage';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const product = products.find(p => p.id === id);
  const mainRef = useRef();

  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button onClick={() => navigate(-1)} className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2">
          <ArrowLeft size={18} /> Go Back
        </button>
      </div>
    );
  }

  // Related products (excluding current)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <section className="py-20 bg-white min-h-[80vh]">
      <div ref={mainRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div>
          <LazyImage src={product.image} alt={product.name} className="rounded-lg shadow-lg w-full h-96 object-cover" />
        </div>
        {/* Details */}
        <div>
          <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-gray-500 hover:text-black transition-colors duration-200">
            <ArrowLeft size={18} className="mr-2" /> Back
          </button>
          <h1 className="text-4xl font-bold text-black mb-4">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-6">{product.description}</p>
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-2xl font-bold text-black">₹{product.price}</span>
            {product.featured && <span className="bg-black text-white px-3 py-1 text-xs font-medium rounded-full">Featured</span>}
          </div>
          {/* Color selector */}
          <div className="mb-4">
            <span className="text-sm text-gray-500 mr-2">Color:</span>
            <div className="inline-flex space-x-2">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  className={`w-7 h-7 rounded-full border-2 ${color === selectedColor ? 'border-black' : 'border-gray-300'}`}
                  style={{ backgroundColor: color === 'white' ? '#fff' : color === 'black' ? '#000' : color === 'gray' ? '#6b7280' : color }}
                  aria-label={color}
                />
              ))}
            </div>
          </div>
          {/* Size selector */}
          <div className="mb-8">
            <span className="text-sm text-gray-500 mr-2">Size:</span>
            <div className="inline-flex space-x-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 text-xs border rounded ${size === selectedSize ? 'border-black bg-black text-white' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(product, selectedColor, selectedSize)}
            className="flex items-center gap-2 px-8 py-4 bg-black text-white rounded-lg font-medium text-lg hover:bg-gray-800 transition-colors duration-200 shadow-lg"
          >
            <ShoppingBag size={22} /> Add to Cart
          </button>
        </div>
      </div>
      {/* Related products */}
      {related.length > 0 && (
        <div className="max-w-5xl mx-auto mt-20 px-4">
          <h2 className="text-2xl font-bold mb-8 text-black">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {related.map((rel) => (
              <div key={rel.id} className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transition-shadow duration-300" onClick={() => navigate(`/product/${rel.id}`)}>
                <LazyImage src={rel.image} alt={rel.name} className="rounded-lg w-full h-48 object-cover mb-4" />
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{rel.name}</h3>
                <span className="text-xl font-bold text-gray-900">₹{rel.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail; 