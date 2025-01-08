import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import type { ProductPricing } from '../../types/product';

interface ProductPricingProps {
  productId: string;
  productName: string;
  pricing: ProductPricing[];
}

const periodLabels = {
  '2h': '2 Hours',
  'day': '24 Hours',
  'week': '7 Days',
  'month': '30 Days'
} as const;

export default function ProductPricing({ productId, productName, pricing }: ProductPricingProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedPeriod) return;
    
    const option = pricing.find(p => p.period === selectedPeriod);
    if (!option) return;

    addToCart({
      id: productId,
      name: productName,
      period: selectedPeriod,
      price: option.price
    });

    toast.success('Added to cart');
  };

  const handleDigisellerPurchase = (url: string) => {
    window.open(url, '_blank');
  };

  if (!pricing.length) return null;

  return (
    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-6">Select Period</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {pricing.map((option) => (
          <button
            key={option.period}
            onClick={() => setSelectedPeriod(option.period)}
            className={`p-4 rounded-lg border transition-all ${
              selectedPeriod === option.period
                ? 'bg-orange-600/20 border-orange-500 text-orange-400'
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
            }`}
          >
            <div className="text-sm">{periodLabels[option.period]}</div>
            <div className="text-2xl font-bold mt-1">${option.price}</div>
            {option.digisellerUrl && (
              <div className="text-xs text-gray-500 mt-1">Digiseller available</div>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {/* SellSN Button */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedPeriod}
          className="w-full py-3 px-6 rounded-lg font-medium transition-all duration-300
                   bg-gradient-to-r from-orange-500 to-amber-500 text-white
                   hover:shadow-lg hover:shadow-orange-500/25
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Add to Cart</span>
        </button>

        {/* Digiseller Button */}
        {selectedPeriod && pricing.find(p => p.period === selectedPeriod)?.digisellerUrl && (
          <button
            onClick={() => {
              const url = pricing.find(p => p.period === selectedPeriod)?.digisellerUrl;
              if (url) handleDigisellerPurchase(url);
            }}
            className="w-full py-3 px-6 rounded-lg font-medium transition-all duration-300
                     bg-blue-600 text-white hover:bg-blue-700
                     flex items-center justify-center space-x-2"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Pay with Digiseller</span>
          </button>
        )}
      </div>
    </div>
  );
}