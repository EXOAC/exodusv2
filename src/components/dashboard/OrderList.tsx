import { motion } from 'framer-motion';
import { ShoppingCart, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10'
  },
  completed: {
    icon: CheckCircle,
    color: 'text-green-400',
    bg: 'bg-green-500/10'
  },
  failed: {
    icon: AlertTriangle,
    color: 'text-red-400',
    bg: 'bg-red-500/10'
  },
  refunded: {
    icon: ShoppingCart,
    color: 'text-gray-400',
    bg: 'bg-gray-500/10'
  }
};

export default function OrderList() {
  const { orders, isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="text-center py-8 text-gray-400">
        No orders found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const config = statusConfig[order.status];
        const Icon = config.icon;

        return (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-lg p-4 border border-orange-500/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${config.bg}`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div>
                  <p className="text-white font-medium">Order #{order._id.slice(-6)}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">${order.amount}</p>
                <p className="text-sm text-gray-400">{order.period}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}