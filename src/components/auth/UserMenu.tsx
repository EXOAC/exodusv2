import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../lib/auth/AuthProvider';

export function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:text-white transition-colors">
        <span>{user.name}</span>
        <User className="w-4 h-4" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg">
          <div className="p-1">
          <Menu.Item>
              {({ active }) => (
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
                    active ? 'bg-orange-500/10 text-orange-500' : 'text-white/80'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Dashboard
                </Link>
              )}
            </Menu.Item>
            
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/settings"
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
                    active ? 'bg-orange-500/10 text-orange-500' : 'text-white/80'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              )}
            </Menu.Item>
            
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => logout()}
                  className={`w-full flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
                    active ? 'bg-orange-500/10 text-orange-500' : 'text-white/80'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}