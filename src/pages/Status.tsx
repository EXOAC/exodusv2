import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { Shield, AlertTriangle, RefreshCcw, Lock, Loader2, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductStatus } from '../types';

const statusConfig = {
  undetected: {
    icon: Shield,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    gradient: 'from-green-500 to-emerald-500',
  },
  detected: {
    icon: AlertTriangle,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    gradient: 'from-red-500 to-orange-500',
  },
  testing: {
    icon: Loader2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    gradient: 'from-blue-500 to-cyan-500',
  },
  updating: {
    icon: RefreshCcw,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    gradient: 'from-yellow-500 to-amber-500',
  },
  closed: {
    icon: Lock,
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/20',
    gradient: 'from-gray-500 to-slate-500',
  },
};

export default function StatusPage() {
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600 mb-4">
            System Status
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mb-6" />
          <div className="flex items-center justify-center space-x-8">
            {Object.entries(statusConfig).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <value.icon className={`w-4 h-4 ${value.color}`} />
                <span className="text-gray-400 text-sm capitalize">{key}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.filter(p => p.isActive).map((product, index) => {
            const config = statusConfig[product.status as ProductStatus];
            const Icon = config.icon;

            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-5 rounded-xl blur-xl 
                             group-hover:opacity-10 transition-all duration-500`} />

                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden
                             group-hover:border-white/20 transition-all duration-500">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`p-3 rounded-xl bg-gradient-to-r ${config.gradient}`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${config.color} ${config.bgColor} border ${config.borderColor}`}>
                        {product.status}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Activity className="w-4 h-4" />
                        <span>
                          Last updated: {new Date(product.lastUpdated).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {product.status !== 'closed' && (
                    <div className="p-6 bg-black/20 border-t border-white/5">
                      <Link
                        to={`/product/${product._id}`}
                        className="block text-center py-2 px-4 rounded-lg bg-orange-600/20 text-orange-400 
                                 hover:bg-orange-600 hover:text-white transition-all duration-300 
                                 group-hover:shadow-lg group-hover:shadow-orange-500/20"
                      >
                        View Details
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}