import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton = forwardRef<HTMLButtonElement, TabButtonProps>(
  ({ active, onClick, children }, ref) => {
    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-300 ${
          active 
            ? 'text-white' 
            : 'text-white/70 hover:text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.button>
    );
  }
);

TabButton.displayName = 'TabButton';

export default TabButton;