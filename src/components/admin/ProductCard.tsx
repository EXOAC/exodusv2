import { motion } from 'framer-motion';
import { Package, Edit, Trash2 } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import StatusBadge from './StatusBadge';
import type { Product } from '../../types/product';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
}

export default function ProductCard({ product, onEdit }: ProductCardProps) {
  const { deleteProduct } = useProducts();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await deleteProduct.mutateAsync(product._id);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 rounded-lg border border-orange-500/20 overflow-hidden"
    >
      {/* Product Image */}
      {product.images?.[0] && (
        <div className="aspect-video relative">
          <img 
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <Package className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-lg font-bold text-white">{product.name}</h3>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-orange-400 transition-colors"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button 
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <p className="text-gray-400 line-clamp-2 mb-4">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <StatusBadge status={product.status} />
          <span className="text-sm text-gray-400">
            {new Date(product.lastUpdated).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}