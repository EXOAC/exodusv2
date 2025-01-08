import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  isProductsOpen: boolean;
  onToggleProducts: () => void;
  onClose: () => void;
}

export default function MobileMenu({ 
  isOpen, 
  isProductsOpen, 
  onToggleProducts,
  onClose
}: MobileMenuProps) {
  if (!isOpen) return null;

  const handleNavigation = (callback?: () => void) => {
    onClose();
    if (callback) callback();
  };

  return (
    <div className="fixed inset-x-0 top-20 z-40 bg-black/40 backdrop-blur-md border-t border-white/10">
      <div className="px-4 py-2 space-y-1">
        <Link
          to="/"
          onClick={() => handleNavigation()}
          className="block w-full text-left px-4 py-3 rounded-lg text-white/90 hover:text-orange-500 hover:bg-white/5 transition-all duration-200"
        >
          Home
        </Link>
        <button
          onClick={() => handleNavigation(onToggleProducts)}
          className="w-full text-left px-4 py-3 rounded-lg text-white/90 hover:text-orange-500 hover:bg-white/5 transition-all duration-200 flex items-center justify-between"
        >
          <span>Products</span>
          <ChevronDown 
            size={16} 
            className={`transform transition-transform duration-300 ${
              isProductsOpen ? 'rotate-180 text-orange-500' : ''
            }`}
          />
        </button>
        <Link
          to="/status"
          onClick={() => handleNavigation()}
          className="block w-full text-left px-4 py-3 rounded-lg text-white/90 hover:text-orange-500 hover:bg-white/5 transition-all duration-200"
        >
          Status
        </Link>
      </div>
    </div>
  );
}