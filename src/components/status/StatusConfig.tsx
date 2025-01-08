import { ShieldCheck, ShieldAlert, CircleDot, RefreshCw, Lock } from 'lucide-react';
import { ProductStatus, StatusConfig } from '../../types/status';



export const statusConfig: Record<ProductStatus, StatusConfig> = {
  undetected: {
    icon: ShieldCheck,
    text: 'Undetected',
    color: 'text-emerald-500',
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20'
  },
  detected: {
    icon: ShieldAlert,
    text: 'Detected',
    color: 'text-red-500',
    iconColor: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20'
  },
  testing: {
    icon: CircleDot,
    text: 'Testing',
    color: 'text-blue-500',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20'
  },
  updating: {
    icon: RefreshCw,
    text: 'Updating',
    color: 'text-amber-500',
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20'
  },
  closed: {
    icon: Lock,
    text: 'Closed',
    color: 'text-zinc-500',
    iconColor: 'text-zinc-500',
    bgColor: 'bg-zinc-500/10',
    borderColor: 'border-zinc-500/20'
  }
};