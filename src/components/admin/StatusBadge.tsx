import { Shield, AlertTriangle, RefreshCcw, Lock, Loader2 } from 'lucide-react';
import type { ProductStatus } from '../../types/product';

const statusConfig = {
  undetected: {
    icon: Shield,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  detected: {
    icon: AlertTriangle,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
  updating: {
    icon: RefreshCcw,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
  },
  testing: {
    icon: Loader2,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  closed: {
    icon: Lock,
    color: 'text-gray-400',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/20',
  }
};

interface StatusBadgeProps {
  status: ProductStatus;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${config.bg} ${config.border} ${className}`}>
      <Icon className={`w-4 h-4 ${config.color}`} />
      <span className={config.color}>{status}</span>
    </div>
  );
}