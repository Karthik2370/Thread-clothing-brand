import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { MOCK_REVIEWS, SIZE_GUIDE } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { gsap } from 'gsap';
import LazyImage from './LazyImage';
import { ShoppingBag, ArrowLeft, Star, Heart, Share2, Truck, Shield, RotateCcw, ChevronDown, ChevronUp, X, Ruler } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
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
      setSelectedImageIndex(0);
    }
  }, [product]);

  // Get current images based on selected color
  const getCurrentImages = () => {
    if (!product || !selectedColor) return [];
    
    // Handle both old array format and new object format
    if (Array.isArray(product.images)) {
      return product.images;
    } else if (product.images && product.images[selectedColor]) {
      return product.images[selectedColor];
    }
    
    // Fallback to first available color images
    const firstColor = Object.keys(product.images || {})[0];
    return firstColor ? product.images[firstColor] : [];
  };

  const currentImages = getCurrentImages();

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Product Not Found</h2>
        <button 
          onClick={() => navigate(-1)} 
          className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Go Back
        </button>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    gsap.to(detailsRef.current?.querySelector('.add-to-cart-btn'), {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    gsap.to(detailsRef.current?.querySelector('.wishlist-btn'), {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedImageIndex(0); // Reset to first image when color changes
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

  const handleReviewSubmit = (rating, review) => {
    console.log('Review submitted:', { productId: id, rating, review });
    setShowReviewModal(false);
    alert('Review submitted successfully!');
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div ref={mainRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={18} className="mr-2" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Images */}
          <div ref={imageRef} className="space-y-4">
            <div className="relative group">
              <LazyImage 
                src={currentImages[selectedImageIndex] || product.image} 
                alt={product.name} 
                className="rounded-lg shadow-lg w-full h-64 sm:h-96 lg:h-[500px] object-cover" 
              />
              <button 
                onClick={handleWishlistToggle}
                className="wishlist-btn absolute top-4 right-4 p-2 sm:p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
              >
                <Heart 
                  size={18} 
                  className={`${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-600 dark:text-gray-400'}`} 
                />
              </button>
              <button className="absolute top-4 left-4 p-2 sm:p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200">
                <Share2 size={18} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            
            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {currentImages.map((image, idx) => (
                <div 
                  key={idx} 
                  className={`aspect-square rounded-lg border-2 transition-colors duration-200 cursor-pointer ${
                    selectedImageIndex === idx ? 'border-black dark:border-white' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedImageIndex(idx)}
                >
                  <LazyImage 
                    src={image} 
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
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white mb-2 transition-colors duration-300">{product.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(averageRating)}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                  </span>
                </div>
                {product.featured && (
                  <span className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-xs font-medium rounded-full w-fit">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-300">{product.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
              <span className="text-2xl sm:text-3xl font-bold text-black dark:text-white transition-colors duration-300">₹{product.price}</span>
              <span className="text-lg text-gray-500 dark:text-gray-400 line-through">₹{Math.round(product.price * 1.3)}</span>
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 text-sm font-medium rounded w-fit">
                23% OFF
              </span>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Color: {selectedColor}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{product.colors.length} colors available</span>
              </div>
              <div className="flex space-x-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                   onClick={() => handleColorChange(color)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-200 ${
                      color === selectedColor ? 'border-black dark:border-white scale-110' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
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
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Size: {selectedSize}</span>
                <button 
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline flex items-center gap-1"
                >
                  <Ruler size={12} />
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 sm:py-3 text-xs sm:text-sm border rounded-lg font-medium transition-all duration-200 ${
                      size === selectedSize 
                        ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black' 
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</span>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-900 dark:text-white"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium text-gray-900 dark:text-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-900 dark:text-white"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="add-to-cart-btn w-full flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium text-base sm:text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 shadow-lg"
              >
                <ShoppingBag size={20} /> Add to Cart - ₹{product.price * quantity}
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                  <Heart 
                    size={16} 
                    className={isInWishlist(product.id) ? 'fill-current text-red-500' : ''} 
                  />
                  <span className="hidden sm:inline">Wishlist</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                  <Share2 size={16} />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Truck size={16} className="text-green-600 dark:text-green-400" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <RotateCcw size={16} className="text-blue-600 dark:text-blue-400" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield size={16} className="text-purple-600 dark:text-purple-400" />
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
              {[
                { id: 'description', label: 'Description' },
                { id: 'reviews', label: `Reviews (${reviews.length})` },
                { id: 'shipping', label: 'Shipping & Returns' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
                    activeTab === id
                      ? 'border-black dark:border-white text-black dark:text-white'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 transition-colors duration-300">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Product Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Features</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li>• Premium 100% cotton blend fabric</li>
                      <li>• Pre-shrunk for consistent fit</li>
                      <li>• Reinforced seams for durability</li>
                      <li>• Tagless design for comfort</li>
                      <li>• Machine washable</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Care Instructions</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
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
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6 mb-6 transition-colors duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-4 sm:space-y-0">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{averageRating.toFixed(1)}</span>
                            <div className="flex items-center space-x-1">
                              {renderStars(averageRating)}
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400">Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
                        </div>
                        <button 
                          onClick={() => setShowReviewModal(true)}
                          className="bg-black dark:bg-white text-white dark:text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 w-full sm:w-auto"
                        >
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
                              <span className="text-sm w-8 text-gray-900 dark:text-white">{rating}★</span>
                              <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                <div 
                                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-6">
                      {(showAllReviews ? reviews : reviews.slice(0, 3)).map(review => (
                        <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-gray-900 dark:text-white">{review.user}</span>
                                {review.verified && (
                                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                                    Verified Purchase
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                  {renderStars(review.rating)}
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(review.date).toLocaleDateString('en-IN')}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">{review.review}</p>
                          <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      ))}
                    </div>

                    {reviews.length > 3 && (
                      <div className="text-center mt-6">
                        <button 
                          onClick={() => setShowAllReviews(!showAllReviews)}
                          className="flex items-center space-x-2 mx-auto px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-900 dark:text-white"
                        >
                          <span>{showAllReviews ? 'Show Less' : `Show All ${reviews.length} Reviews`}</span>
                          {showAllReviews ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Star size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No reviews yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Be the first to review this product</p>
                    <button 
                      onClick={() => setShowReviewModal(true)}
                      className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
                    >
                      Write a Review
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Shipping Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Truck size={20} className="text-green-600 dark:text-green-400 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Free Standard Delivery</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">On orders over ₹2000. Delivered in 2-5 business days.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Truck size={20} className="text-blue-600 dark:text-blue-400 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Express Delivery</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">₹99 for next-day delivery in major cities.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Returns & Exchanges</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <RotateCcw size={20} className="text-purple-600 dark:text-purple-400 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">30-Day Returns</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Free returns within 30 days of purchase.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield size={20} className="text-orange-600 dark:text-orange-400 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Quality Guarantee</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">2-year warranty against manufacturing defects.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-8 text-black dark:text-white transition-colors duration-300">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {related.map((rel) => (
                <div 
                  key={rel.id} 
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group"
                  onClick={() => navigate(`/product/${rel.id}`)}
                >
                  <div className="relative overflow-hidden">
                    <LazyImage 
                      src={rel.image} 
                      alt={rel.name} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute top-3 right-3">
                      <button className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200">
                        <Heart size={16} className="text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{rel.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(4.5)}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">(24)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">₹{rel.price}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">₹{Math.round(rel.price * 1.3)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <SizeGuideModal onClose={() => setShowSizeGuide(false)} />
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <ReviewModal 
          product={product}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleReviewSubmit}
        />
      )}
    </section>
  );
};

// Size Guide Modal Component
const SizeGuideModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
            <Ruler size={20} />
            Size Guide
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
          >
            <X size={20} className="text-gray-900 dark:text-white" />
          </button>
        </div>
        
        {/* Measurement Chart */}
        <div className="mb-6">
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-white text-lg">Measurement Chart</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">All measurements are in inches</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">Size</th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">Chest</th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">Length</th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">Shoulder</th>
                  <th className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-left text-gray-900 dark:text-white font-semibold">Sleeve</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(SIZE_GUIDE.measurements).map(([size, measurements]) => (
                  <tr key={size} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 font-semibold text-gray-900 dark:text-white">{size}</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">{measurements.chest}"</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">{measurements.length}"</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">{measurements.shoulder}"</td>
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-3 text-gray-700 dark:text-gray-300">{measurements.sleeve}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fit Guide */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-white text-lg">Fit Guide</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SIZE_GUIDE.fitGuide.map((guide, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold text-sm">
                    {guide.size}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{guide.size}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{guide.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Measure */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 transition-colors duration-300">
          <h4 className="font-semibold mb-3 text-blue-900 dark:text-blue-200">How to Measure</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-blue-800 dark:text-blue-300 mb-1">Chest</div>
              <div className="text-blue-700 dark:text-blue-400">Measure around the fullest part of your chest</div>
            </div>
            <div>
              <div className="font-medium text-blue-800 dark:text-blue-300 mb-1">Length</div>
              <div className="text-blue-700 dark:text-blue-400">From shoulder seam to bottom hem</div>
            </div>
            <div>
              <div className="font-medium text-blue-800 dark:text-blue-300 mb-1">Shoulder</div>
              <div className="text-blue-700 dark:text-blue-400">From shoulder point to shoulder point</div>
            </div>
            <div>
              <div className="font-medium text-blue-800 dark:text-blue-300 mb-1">Sleeve</div>
              <div className="text-blue-700 dark:text-blue-400">From shoulder seam to sleeve end</div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
          >
            Close Size Guide
          </button>
        </div>
      </div>
    </div>
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
    onSubmit(rating, review);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Write a Review</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
          >
            <X size={20} className="text-gray-900 dark:text-white" />
          </button>
        </div>
        
        <div className="flex items-center space-x-4 mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-12 h-12 object-cover rounded-lg"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">₹{product.price}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
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
                        : 'text-gray-300 dark:text-gray-600'
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Review (Optional)</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
              rows={4}
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-black dark:bg-white text-white dark:text-black py-2 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
            >
              Submit Review
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;