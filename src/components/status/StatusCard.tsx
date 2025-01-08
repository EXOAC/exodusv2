import React from 'react';
import { statusConfig } from './StatusConfig';

export interface StatusCardProps {
  id: string;
  name: string;
  status: 'undetected' | 'detected' | 'testing' | 'updating' | 'closed';
  icon: string; // URL иконки из базы данных
  lastUpdated: string;
  activeUsers: number;
  href: string;
}

export default function StatusCard({
  id,
  name,
  status,
  icon,
  lastUpdated,
  activeUsers,
  href,
}: StatusCardProps) {
  return (
    <div
      key={id}
      className="border border-orange-500 bg-black/40 rounded-lg p-4 flex flex-col items-start"
    >
      <div className="flex items-center gap-4">
        {/* Используем иконку из базы данных */}
        <div className="rounded-full p-2 bg-gray-800">
          <img
            src={icon}
            alt={`${name} icon`}
            className="w-10 h-10 object-contain rounded-full"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="text-sm text-gray-400">Last updated: {lastUpdated}</p>
          <p className="text-sm text-gray-400">{activeUsers} active users</p>
        </div>
      </div>
      <a
        href={href}
        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg text-center w-full"
      >
        View Product
      </a>
    </div>
  );
}