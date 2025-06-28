import React, { useState, useEffect, useRef } from 'react';
import { Filter } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from './ProductCard';
import { useStaggerAnimation } from '../hooks/useGSAP';

const ProductGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const gridRef = useRef();
  const headerRef = useRef();

  useStaggerAnimation('.product-grid', '.product-card');

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <section id="products" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 transition-colors duration-300">
            Our Collection
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
            Carefully curated pieces that define modern minimalism. 
            Each design tells a story of quality and simplicity.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12 px-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                selectedCategory === category.id
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg transform scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105'
              }`}
            >
              <span className="hidden sm:inline">{category.name} ({category.count})</span>
              <span className="sm:hidden">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div 
          ref={gridRef}
          className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="product-card">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredProducts.length > 6 && (
          <div className="text-center mt-12">
            <button className="bg-transparent border-2 border-black dark:border-white text-black dark:text-white px-6 sm:px-8 py-3 sm:py-4 font-medium hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 transform hover:scale-105">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;