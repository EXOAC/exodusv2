import React from 'react';
import ProductCard from '../components/ProductCard/ProductCard';
import { products } from '../data/products';

export default function Features() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">
            Our Products
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Choose the perfect solution for your needs. All our products come with 24/7 support and regular updates.
          </p>
        </div>
        
        <div className="relative">
          {/* Gradient masks for scroll indicators */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          {/* Scrollable container */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
              {products.map((product) => (
                <div key={product.href} className="w-[360px] flex-shrink-0">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}