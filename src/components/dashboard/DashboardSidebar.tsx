import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Clock, Settings } from 'lucide-react';
import { useAuth } from '../../lib/auth/AuthProvider';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
  { name: 'Subscriptions', href: '/dashboard/subscriptions', icon: Clock },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardSidebar() {
  const { isAdmin } = useAuth();

  return (
    <aside className="w-64 min-h-screen bg-black/50 border-r border-orange-500/20">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'text-gray-400 hover:bg-white/5'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
        
        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'text-gray-400 hover:bg-white/5'
              }`
            }
          >
            <Settings className="w-5 h-5" />
            <span>Admin Panel</span>
          </NavLink>
        )}
      </nav>
    </aside>
  );
}