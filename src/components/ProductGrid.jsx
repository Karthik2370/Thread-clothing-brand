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
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Our Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Carefully curated pieces that define modern minimalism. 
            Each design tells a story of quality and simplicity.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-black text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div 
          ref={gridRef}
          className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
            <button className="bg-transparent border-2 border-black text-black px-8 py-4 font-medium hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;