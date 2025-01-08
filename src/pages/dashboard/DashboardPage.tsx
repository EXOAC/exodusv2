import { ShoppingCart, Clock, CreditCard, Activity } from 'lucide-react';
import  {useAuth}  from '../../lib/auth/AuthProvider';
import { useOrders } from '../../hooks/useOrders';
import StatsCard from '../../components/dashboard/StatsCard';
import OrderList from '../../components/dashboard/OrderList';

export default function DashboardPage() {
  const { user } = useAuth();
  const { orders } = useOrders();

  const activeOrders = orders?.filter(order => 
    order.status === 'completed' && new Date(order.expiresAt) > new Date()
  ).length || 0;

  const totalSpent = orders?.reduce((sum, order) => 
    order.status === 'completed' ? sum + order.amount : sum, 0
  ) || 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Welcome back!</h2>
        <p className="text-gray-400">{user?.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Active Orders"
          value={activeOrders}
          icon={ShoppingCart}
        />
        <StatsCard
          title="Total Orders"
          value={orders?.length || 0}
          icon={Clock}
        />
        <StatsCard
          title="Total Spent"
          value={`$${totalSpent.toFixed(2)}`}
          icon={CreditCard}
        />
        <StatsCard
          title="Account Status"
          value="Active"
          icon={Activity}
          color="green"
        />
      </div>

      <div className="bg-white/5 rounded-lg border border-orange-500/20">
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recent Orders</h3>
          <OrderList />
        </div>
      </div>
    </div>
  );
}