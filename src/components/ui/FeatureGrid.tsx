import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  details: string[];
  index: number;
}

function FeatureBox({ icon: Icon, title, description, gradient, details, index }: FeatureProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="w-full"
    >
      <div className="group relative flex flex-col bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-orange-500/30">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500/70" />
        </div>
        
        <h3 className="text-lg sm:text-xl font-medium text-white/90 mb-2">{title}</h3>
        <p className="text-sm sm:text-base text-white/60 mb-4">{description}</p>
        
        <div className="grid grid-cols-2 gap-2 mt-auto">
          {details.map((detail, i) => (
            <div
              key={i}
              className="px-2 sm:px-3 py-1.5 bg-white/5 rounded-lg text-xs sm:text-sm text-white/70 transition-colors duration-300 group-hover:bg-orange-500/10 group-hover:text-orange-500/90"
            >
              {detail}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface FeatureGridProps {
  features: {
    icon: LucideIcon;
    title: string;
    description: string;
    gradient: string;
    details: string[];
  }[];
}

export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
      {features.map((feature, index) => (
        <FeatureBox key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}