import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Activity } from 'lucide-react';

const navigation = [
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Status', href: '/admin/status', icon: Activity },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-black/40 backdrop-blur-sm border-r border-white/10">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  relative group flex items-center px-4 py-3 text-sm font-medium rounded-xl
                  transition-all duration-300
                  ${isActive 
                    ? 'text-orange-500' 
                    : 'text-white/60 hover:text-white'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-orange-500/10 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon 
                  className={`
                    mr-3 h-5 w-5 transition-all duration-300
                    ${isActive ? 'text-orange-500' : 'text-white/60 group-hover:text-white'}
                  `}
                />
                <span className="relative">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}