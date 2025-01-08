import React from 'react';
import { motion } from 'framer-motion';

interface ApexGameLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ApexGameLogo({ className = '', size = 'md' }: ApexGameLogoProps) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-full">
          {/* Hexagonal background */}
          <div 
            className="absolute inset-0"
            style={{
              background: '#E6443C',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              boxShadow: '0 0 10px rgba(230, 68, 60, 0.5)'
            }}
          />
          
          {/* White "A" symbol */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-[70%] h-[70%] bg-white"
              style={{
                clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
                transform: 'scale(0.85)'
              }}
            />
          </div>

          {/* Inner triangle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-[30%] h-[30%] bg-[#E6443C]"
              style={{
                clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
                transform: 'translateY(-15%)'
              }}
            />
          </div>

          {/* Subtle gradient overlay */}
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}