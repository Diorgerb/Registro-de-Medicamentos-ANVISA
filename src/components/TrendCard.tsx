import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TrendCardProps {
  title: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  percentage: number;
  description: string;
}

const TrendCard: React.FC<TrendCardProps> = ({ title, trend, percentage, description }) => {
  const trendConfig = {
    increasing: {
      icon: TrendingUp,
      label: 'Em alta',
      text: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      accent: 'from-emerald-500 to-teal-500',
    },
    decreasing: {
      icon: TrendingDown,
      label: 'Em baixa',
      text: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      accent: 'from-rose-500 to-orange-500',
    },
    stable: {
      icon: Minus,
      label: 'Estável',
      text: 'text-slate-600',
      bg: 'bg-slate-50',
      border: 'border-slate-100',
      accent: 'from-slate-400 to-slate-500',
    },
  }[trend];

  const Icon = trendConfig.icon;

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-sm shadow-slate-200/70 ring-1 ring-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/80">
      <div className={`mb-5 h-1.5 w-20 rounded-full bg-gradient-to-r ${trendConfig.accent}`} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Indicador de tendência</p>
          <h3 className="mt-1 font-semibold text-slate-900">{title}</h3>
        </div>
        <div className={`${trendConfig.bg} ${trendConfig.border} rounded-2xl border p-3 ${trendConfig.text}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-5 flex items-end gap-2">
        <span className={`text-2xl font-bold ${trendConfig.text}`}>{trendConfig.label}</span>
        {percentage > 0 && (
          <span className={`pb-1 text-sm font-semibold ${trendConfig.text}`}>{percentage.toFixed(1)}%</span>
        )}
      </div>

      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
};

export default TrendCard;
