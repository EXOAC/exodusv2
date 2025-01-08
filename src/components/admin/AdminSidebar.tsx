import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Zap, Activity } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: Zap },
  { name: 'Status', href: '/admin/status', icon: Activity },
  { name: 'Users', href: '/admin/users', icon: Activity },
];

export default function AdminSidebar() {
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
      </nav>
    </aside>
  );
}