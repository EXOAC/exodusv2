import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Wrench, Shield } from 'lucide-react';

const tabConfig = {
  aimbot: {
    icon: Target,
    gradient: 'from-orange-500 to-amber-500',
  },
  visuals: {
    icon: Eye,
    gradient: 'from-amber-500 to-orange-500',
  },
  misc: {
    icon: Wrench,
    gradient: 'from-orange-500 to-amber-500',
  },
};

interface ProductFeaturesProps {
  features: string[];
}

export default function ProductFeatures({ features }: ProductFeaturesProps) {
  const [activeTab, setActiveTab] = useState('features');

  return (
    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-6">Features</h3>
      
      <div className="space-y-4">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="flex items-center space-x-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-gray-400">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}