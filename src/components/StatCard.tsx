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
    bg: 'bg-white/95',
    icon: 'text-blue-600',
    border: 'border-blue-100'
  },
  green: {
    bg: 'bg-white/95',
    icon: 'text-green-600',
    border: 'border-green-100'
  },
  red: {
    bg: 'bg-white/95',
    icon: 'text-red-600',
    border: 'border-red-100'
  },
  yellow: {
    bg: 'bg-white/95',
    icon: 'text-yellow-600',
    border: 'border-yellow-100'
  },
  purple: {
    bg: 'bg-white/95',
    icon: 'text-purple-600',
    border: 'border-purple-100'
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
      ${classes.bg} ${classes.border} border rounded-2xl p-6 shadow-sm shadow-slate-200/70 ring-1 ring-white/70
      transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/80
    `}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-950 mb-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-400">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center mt-2 text-xs ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span className="font-medium">
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="ml-1 text-slate-400">vs. período anterior</span>
            </div>
          )}
        </div>
        <div className={`${classes.icon} rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;