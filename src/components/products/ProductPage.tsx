import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ChevronLeft } from 'lucide-react';
import { useProduct } from '../../hooks/useProduct';
import ProductFeatures from './ProductFeatures';
import ProductGallery from './ProductGallery';
import ProductPricing from './ProductPricing';
import ProductRequirements from './ProductRequirements';
import Loader from '../Loader';

export default function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { product, isLoading } = useProduct(productId);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | UDP Gaming`;
    }
  }, [product]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="text-orange-400 hover:text-orange-300"
          >
            Return home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{product.name}</h1>
                <p className="text-gray-400">{product.description}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Features & Gallery */}
            <div className="lg:col-span-2 space-y-8">
              <ProductFeatures features={product.features} />
              <ProductGallery images={product.images} />
            </div>

            {/* Right Column - Pricing & Requirements */}
            <div className="space-y-8">
              <ProductPricing 
                productId={product._id}
                productName={product.name}
                pricing={product.pricing} 
              />
              <ProductRequirements requirements={product.requirements} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}