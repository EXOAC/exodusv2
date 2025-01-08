import { useAuth } from '../../lib/auth/AuthProvider';
import { LogOut } from 'lucide-react';

export default function AdminHeader() {
  const { logout, user } = useAuth();

  return (
    <header className="bg-black/50 border-b border-orange-500/20 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">{user?.email}</span>
          <button
            onClick={logout}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}