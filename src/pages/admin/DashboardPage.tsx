import { motion } from 'framer-motion';
import { Users, ShoppingCart, Activity, Settings } from 'lucide-react';

const stats = [
  { name: 'Total Users', value: '1,234', icon: Users },
  { name: 'Active Orders', value: '56', icon: ShoppingCart },
  { name: 'System Status', value: 'Online', icon: Activity },
  { name: 'Last Update', value: '5m ago', icon: Settings },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
        <p className="text-gray-400">Monitor and manage your system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-lg p-6 border border-orange-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 rounded-lg border border-orange-500/20">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white">Recent Orders</h3>
            <div className="mt-4 space-y-4">
              {/* Add order list here */}
              <div className="text-center text-gray-400 py-4">
                No recent orders
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg border border-orange-500/20">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white">System Status</h3>
            <div className="mt-4 space-y-4">
              {/* Add status list here */}
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Server Status</span>
                <span className="text-green-400">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">API Status</span>
                <span className="text-green-400">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Database Status</span>
                <span className="text-green-400">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}