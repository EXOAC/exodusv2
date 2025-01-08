import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface MenuItem {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface DropdownProps {
  label: string;
  items: MenuItem[];
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  menuClassName?: string;
}

const Dropdown = ({ label, items, isOpen, onToggle, className = '', menuClassName = '' }: DropdownProps) => {
  return (
    <div className="relative inline-block">
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 transition-colors duration-200 focus:outline-none ${className}`}
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`absolute z-50 mt-2 w-48 rounded-lg shadow-lg bg-black/90 backdrop-blur-sm border border-white/10
                  transition-all duration-200 ease-in-out origin-top-right
                  ${menuClassName}
                  ${
                    isOpen
                      ? 'transform opacity-100 scale-100'
                      : 'transform opacity-0 scale-95 pointer-events-none'
                  }`}
      >
        <div className="py-1">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-orange-500/10
                       hover:text-orange-500 flex items-center gap-2 transition-colors duration-150"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;