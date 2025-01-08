import React from 'react';
import { ShieldCheck, ShieldAlert, CircleDot, RefreshCw, Lock } from 'lucide-react';
import { Status, StatusConfig } from './types';

const statusConfig: Record<Status, StatusConfig> = {
  undetected: {
    icon: ShieldCheck,
    text: 'Undetected',
    color: 'text-emerald-500/90',
    hoverColor: 'group-hover:text-emerald-400',
  },
  detected: {
    icon: ShieldAlert,
    text: 'Detected',
    color: 'text-red-500/90',
    hoverColor: 'group-hover:text-red-400',
  },
  testing: {
    icon: CircleDot,
    text: 'Testing',
    color: 'text-blue-500/90',
    hoverColor: 'group-hover:text-blue-400',
  },
  updating: {
    icon: RefreshCw,
    text: 'Updating',
    color: 'text-amber-500/90',
    hoverColor: 'group-hover:text-amber-400',
  },
  closed: {
    icon: Lock,
    text: 'Closed',
    color: 'text-zinc-500/90',
    hoverColor: 'group-hover:text-zinc-400',
  },
};

interface StatusIndicatorProps {
  status: Status;
}

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
      <div className="relative">
        <div 
          className="absolute -inset-4 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(249,115,22,0.2), transparent 70%)`
          }}
        />
        <StatusIcon 
          className={`relative z-10 ${config.color} ${config.hoverColor} transform group-hover:scale-125 transition-all duration-500`}
          size={28}
        />
      </div>
      <span className={`text-sm font-medium ${config.color} ${config.hoverColor} transition-colors duration-300`}>
        {config.text}
      </span>
    </div>
  );
}