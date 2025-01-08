import { motion } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';
import StatusSelector from '../../components/admin/StatusSelector';
import StatusBadge from '../../components/admin/StatusBadge';
import type { Product } from '../../types/product';

export default function AdminStatusPage() {
  const { products, isLoading } = useProducts();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Product Status Management</h2>
        <p className="text-gray-400">Update and monitor product statuses</p>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto" />
        </div>
      ) : (
        <div className="grid gap-6">
          {products?.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-lg border border-orange-500/20 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white">{product.name}</h3>
                  <p className="text-sm text-gray-400">
                    Last updated: {new Date(product.lastUpdated).toLocaleString()}
                  </p>
                </div>
                <StatusSelector
                  productId={product._id}
                  currentStatus={product.status}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}