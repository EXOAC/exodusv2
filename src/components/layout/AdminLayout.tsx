// scr/components/layout/AdminLayout.tsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Shield, Activity } from 'lucide-react';
import { logout } from '../../lib/api/auth';

const navigation = [
  { name: 'Status', href: '/admin/status', icon: Activity }
];

export default function SimpleAdminLayout() {
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-white">Admin Panel</span>
            </div>

            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="px-4 py-2 text-white/80 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </div>
    </div>
  );
}