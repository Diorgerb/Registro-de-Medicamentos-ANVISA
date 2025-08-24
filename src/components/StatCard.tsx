import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const colorClasses = {
  blue: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    icon: 'text-blue-600',
    border: 'border-blue-200'
  },
  green: {
    bg: 'bg-gradient-to-br from-green-50 to-green-100',
    icon: 'text-green-600',
    border: 'border-green-200'
  },
  red: {
    bg: 'bg-gradient-to-br from-red-50 to-red-100',
    icon: 'text-red-600',
    border: 'border-red-200'
  },
  yellow: {
    bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
    icon: 'text-yellow-600',
    border: 'border-yellow-200'
  },
  purple: {
    bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
    icon: 'text-purple-600',
    border: 'border-purple-200'
  }
};

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  color, 
  trend 
}) => {
  const classes = colorClasses[color];

  return (
    <div className={`
      ${classes.bg} ${classes.border} border rounded-xl p-6
      hover:shadow-lg transition-all duration-200 hover:scale-105
    `}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center mt-2 text-xs ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="font-medium">
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="ml-1 text-gray-500">vs. período anterior</span>
            </div>
          )}
        </div>
        <div className={`${classes.icon}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;