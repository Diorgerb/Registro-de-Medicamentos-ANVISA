import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TrendCardProps {
  title: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  percentage: number;
  description: string;
}

const TrendCard: React.FC<TrendCardProps> = ({ title, trend, percentage, description }) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'decreasing':
        return <TrendingDown className="h-5 w-5 text-red-600" />;
      default:
        return <Minus className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'increasing':
        return 'from-green-50 to-emerald-100 border-green-200';
      case 'decreasing':
        return 'from-red-50 to-red-100 border-red-200';
      default:
        return 'from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const getTrendText = () => {
    switch (trend) {
      case 'increasing':
        return 'Em alta';
      case 'decreasing':
        return 'Em baixa';
      default:
        return 'Estável';
    }
  };

  const getPercentageColor = () => {
    switch (trend) {
      case 'increasing':
        return 'text-green-600';
      case 'decreasing':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`bg-gradient-to-br ${getTrendColor()} border rounded-xl p-6 hover:shadow-lg transition-all duration-200`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {getTrendIcon()}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className={`text-lg font-bold ${getPercentageColor()}`}>
            {getTrendText()}
          </span>
          {percentage > 0 && (
            <span className={`text-sm ${getPercentageColor()}`}>
              ({percentage.toFixed(1)}%)
            </span>
          )}
        </div>
        
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default TrendCard;