import React from 'react';
import { motion } from 'framer-motion';

interface ApexLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ApexLogo({ className = '', size = 'md' }: ApexLogoProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      {/* Base logo layer */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-full">
          {/* Neon glow effect */}
          <div 
            className="absolute inset-0 rounded-lg blur-[2px]"
            style={{
              background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.6), transparent 70%)'
            }}
          />
          
          {/* Logo image */}
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <img
              src="https://imgur.com/UuZHXyo.jpg"
              alt="Apex External"
              className="w-full h-full object-cover"
              style={{
                filter: 'brightness(1.2) contrast(1.1)',
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)'
              }}
            />
          </div>

          {/* Pulsing overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20"
            animate={{
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}