import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`${color} rounded-xl p-6 shadow-lg transition-transform hover:scale-105 cursor-pointer`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-100 opacity-80">{title}</p>
        <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      </div>
      <div className="text-white opacity-80">{icon}</div>
    </div>
  </div>
);