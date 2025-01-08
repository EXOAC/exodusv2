import React from 'react';
import { statusConfig } from './StatusConfig';

// Явный массив возможных статусов
const productStatuses = ['undetected', 'detected', 'testing', 'updating', 'closed'] as const;

export default function StatusLegend() {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      {productStatuses.map((status) => {
        const config = statusConfig[status];
        return (
          <div key={status} className="flex items-center space-x-2">
            <span className={`w-4 h-4 rounded-full ${config.bgColor}`}></span>
            <span className="text-gray-300">{config.text}</span>
          </div>
        );
      })}
    </div>
  );
}
