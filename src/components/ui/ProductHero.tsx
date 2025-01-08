import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PurchaseLoader from './PurchaseLoader';
import { usePurchase } from '../../hooks/usePurchase';

interface ProductHeroProps {
  title: string;
  description: string;
  onWatchDemo: () => void;
}

export default function ProductHero({ title, description, onWatchDemo }: ProductHeroProps) {
  const { isLoading, handlePurchase, closeLoader } = usePurchase();

  return (
    <>
      <div className="text-center mb-12 sm:mb-20 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4 sm:mb-6"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-6 sm:mb-8"
        >
          {description}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <button 
            onClick={handlePurchase}
            className="px-6 sm:px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
          >
            Purchase Now
          </button>
          <button 
            onClick={onWatchDemo}
            className="px-6 sm:px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-orange-500/20 hover:border-orange-500/50 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10"
          >
            Watch Demo
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isLoading && <PurchaseLoader onClose={closeLoader} />}
      </AnimatePresence>
    </>
  );
}