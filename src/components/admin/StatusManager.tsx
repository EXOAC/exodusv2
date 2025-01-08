import React from 'react';
import { Shield } from 'lucide-react';
import { useStatus } from '../../context/StatusContext';
import type { ProductStatus } from '../../types/status';
import { statusConfig } from '../status/StatusConfig';

interface StatusManagerProps {
  productName: string;
  currentStatus: ProductStatus;
}

export default function StatusManager({ productName, currentStatus }: StatusManagerProps) {
  const { updateProductStatus } = useStatus();
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleStatusUpdate = async (newStatus: ProductStatus) => {
    try {
      setIsUpdating(true);
      await updateProductStatus(productName, newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-orange-500" />
        <h3 className="text-xl font-medium text-white/90">{productName}</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.entries(statusConfig).map(([status, config]) => {
          const isActive = status === currentStatus;
          

          return (
            <button
              key={status}
              onClick={() => handleStatusUpdate(status as ProductStatus)}
              disabled={isUpdating || isActive}
              className={`
                relative flex items-center justify-center gap-2 px-4 py-3 
                rounded-xl border backdrop-blur-sm transition-all duration-300
                ${config.bgColor} ${config.borderColor}
                ${isActive ? 'scale-105 shadow-lg' : ''}
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              
              <span className={`font-medium ${config.color}`}>{config.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}