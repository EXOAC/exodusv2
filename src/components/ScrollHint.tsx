import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="flex flex-col items-center gap-3 mb-20"
    >
      <div className="relative w-8 h-16 rounded-full border-2 border-orange-500/30 flex items-center justify-center">
        <motion.div
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-3 h-3 rounded-full bg-orange-500/70"
        />
      </div>
      <span className="text-orange-500/50 text-base font-medium">Scroll</span>
    </motion.div>
  );
}