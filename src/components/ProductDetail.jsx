import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { gsap } from 'gsap';
import LazyImage from './LazyImage';
import { ShoppingBag, ArrowLeft, Star, Heart, Share2, Truck, Shield, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

// Mock reviews data
const MOCK_REVIEWS = {
  '1': [
    {
      id: 1,
      user: 'Rahul S.',
      rating: 5,
      date: '2024-05-15',
      review: 'Excellent quality! The fabric is soft and the fit is perfect. Highly recommended.',
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      user: 'Priya M.',
      rating: 4,
      date: '2024-05-10',
      review: 'Good quality t-shirt. The black color is rich and doesn\'t fade after washing.',
      verified: true,
      helpful: 8
    },
    {
      id: 3,
      user: 'Amit K.',
      rating: 5,
      date: '2024-05-05',
      review: 'Perfect for daily wear. Comfortable and stylish. Will definitely buy more.',
      verified: false,
      helpful: 15
    }
  ],
  '2': [
    {
      id: 4,
      user: 'Sneha R.',
      rating: 5,
      date: '2024-05-12',
      review: 'Love the minimalist design! Fits true to size and the quality is outstanding.',
      verified: true,
      helpful: 10
    }
  ]
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const product = products.find(p => p.id === id);
  const mainRef = useRef();
  const imageRef = useRef();
  const detailsRef = useRef();

  const reviews = MOCK_REVIEWS[id] || [];
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      );
    }

    // Animate image and details separately
    if (imageRef.current && detailsRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );
      gsap.fromTo(
        detailsRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button onClick={() => navigate(-1)} className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2">
          <ArrowLeft size={18} /> Go Back
        </button>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    // Add success animation
    gsap.to(detailsRef.current?.querySelector('.add-to-cart-btn'), {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-white min-h-screen">
      <div ref={mainRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center text-gray-500 hover:text-black transition-colors duration-200"
        >
          <ArrowLeft size={18} className="mr-2" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div ref={imageRef} className="space-y-4">
            <div className="relative group">
              <LazyImage 
                src={product.image} 
                alt={product.name} 
                className="rounded-lg shadow-lg w-full h-96 lg:h-[500px] object-cover" 
              />
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200"
              >
                <Heart 
                  size={20} 
                  className={`${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                />
              </button>
              <button className="absolute top-4 left-4 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200">
                <Share2 size={20} className="text-gray-600" />
              </button>
            </div>
            
            {/* Additional product images would go here */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((_, idx) => (
                <div key={idx} className="aspect-square bg-gray-100 rounded-lg border-2 border-transparent hover:border-black transition-colors duration-200 cursor-pointer">
                  <LazyImage 
                    src={product.image} 
                    alt={`${product.name} view ${idx + 1}`} 
                    className="w-full h-full object-cover rounded-lg" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div ref={detailsRef} className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-black mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(averageRating)}
                  <span className="text-sm text-gray-600 ml-2">
                    ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                  </span>
                </div>
                {product.featured && (
                  <span className="bg-black text-white px-3 py-1 text-xs font-medium rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-xl text-gray-600 mb-6">{product.description}</p>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-black">₹{product.price}</span>
              <span className="text-lg text-gray-500 line-through">₹{Math.round(product.price * 1.3)}</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 text-sm font-medium rounded">
                23% OFF
              </span>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Color: {selectedColor}</span>
                <span className="text-xs text-gray-500">{product.colors.length} colors available</span>
              </div>
              <div className="flex space-x-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                      color === selectedColor ? 'border-black scale-110' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ 
                      backgroundColor: color === 'white' ? '#fff' : 
                                     color === 'black' ? '#000' : 
                                     color === 'gray' ? '#6b7280' : color 
                    }}
                    aria-label={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Size: {selectedSize}</span>
                <button className="text-xs text-blue-600 hover:text-blue-800 underline">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm border rounded-lg font-medium transition-all duration-200 ${
                      size === selectedSize 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-gray-700">Quantity</span>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="add-to-cart-btn w-full flex items-center justify-center gap-3 px-8 py-4 bg-black text-white rounded-lg font-medium text-lg hover:bg-gray-800 transition-colors duration-200 shadow-lg"
              >
                <ShoppingBag size={22} /> Add to Cart - ₹{product.price * quantity}
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                  <Heart size={18} />
                  Wishlist
                </button>
                <button className="flex items-center justify-center gap-2 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck size={16} className="text-green-600" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <RotateCcw size={16} className="text-blue-600" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield size={16} className="text-purple-600" />
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'reviews', label: `Reviews (${reviews.length})` },
                { id: 'shipping', label: 'Shipping & Returns' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-3">Features</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Premium 100% cotton blend fabric</li>
                    <li>• Pre-shrunk for consistent fit</li>
                    <li>• Reinforced seams for durability</li>
                    <li>• Tagless design for comfort</li>
                    <li>• Machine washable</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Care Instructions</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Machine wash cold with like colors</li>
                    <li>• Use non-chlorine bleach when needed</li>
                    <li>• Tumble dry low heat</li>
                    <li>• Iron on low temperature if needed</li>
                    <li>• Do not dry clean</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {reviews.length > 0 ? (
                <>
                  {/* Review Summary */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
                          <div className="flex items-center space-x-1">
                            {renderStars(averageRating)}
                          </div>
                        </div>
                        <p className="text-gray-600">Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
                      </div>
                      <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">
                        Write a Review
                      </button>
                    </div>
                    
                    {/* Rating Breakdown */}
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(rating => {
                        const count = reviews.filter(r => r.rating === rating).length;
                        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                        return (
                          <div key={rating} className="flex items-center space-x-3">
                            <span className="text-sm w-8">{rating}★</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-8">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {(showAllReviews ? reviews : reviews.slice(0, 3)).map(review => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">{review.user}</span>
                              {review.verified && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{review.review}</p>
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    ))}
                  </div>

                  {reviews.length > 3 && (
                    <div className="text-center mt-6">
                      <button 
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="flex items-center space-x-2 mx-auto px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <span>{showAllReviews ? 'Show Less' : `Show All ${reviews.length} Reviews`}</span>
                        {showAllReviews ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Star size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-500 mb-6">Be the first to review this product</p>
                  <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">
                    Write a Review
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Truck size={20} className="text-green-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Free Standard Delivery</h4>
                      <p className="text-sm text-gray-600">On orders over ₹2000. Delivered in 2-5 business days.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Truck size={20} className="text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Express Delivery</h4>
                      <p className="text-sm text-gray-600">₹99 for next-day delivery in major cities.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Returns & Exchanges</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <RotateCcw size={20} className="text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-medium">30-Day Returns</h4>
                      <p className="text-sm text-gray-600">Free returns within 30 days of purchase.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield size={20} className="text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Quality Guarantee</h4>
                      <p className="text-sm text-gray-600">2-year warranty against manufacturing defects.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-black">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((rel) => (
                <div 
                  key={rel.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 group"
                  onClick={() => navigate(`/product/${rel.id}`)}
                >
                  <div className="relative overflow-hidden">
                    <LazyImage 
                      src={rel.image} 
                      alt={rel.name} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute top-3 right-3">
                      <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200">
                        <Heart size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{rel.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(4.5)}
                      </div>
                      <span className="text-sm text-gray-500">(24)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900">₹{rel.price}</span>
                      <span className="text-sm text-gray-500 line-through">₹{Math.round(rel.price * 1.3)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;