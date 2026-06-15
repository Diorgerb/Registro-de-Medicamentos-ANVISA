import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: { [key: string]: number };
  title: string;
  color: string;
  maxItems?: number;
  valueLabel?: string;
  valueSuffix?: string;
  maxY?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, title, color, maxItems = 10, valueLabel = 'Quantidade', valueSuffix = '', maxY }) => {
  // Sort and limit data
  const sortedEntries = Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxItems);

  const chartData = {
    labels: sortedEntries.map(([key]) => 
      key.length > 30 ? key.substring(0, 30) + '...' : key
    ),
    datasets: [
      {
        label: valueLabel,
        data: sortedEntries.map(([, value]) => value),
        backgroundColor: color.replace('1)', '0.78)'),
        borderColor: color,
        borderWidth: 1,
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.94)',
        titleFont: {
          size: 14,
          family: 'Inter, system-ui, sans-serif'
        },
        bodyFont: {
          size: 12,
          family: 'Inter, system-ui, sans-serif'
        },
        callbacks: {
          label: (context: TooltipItem<'bar'>) => `${context.dataset.label}: ${Number(context.raw).toLocaleString('pt-BR')}${valueSuffix}`,
        },
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          font: {
            size: 10,
            family: 'Inter, system-ui, sans-serif'
          }
        }
      },
      y: {
        beginAtZero: true,
        max: maxY,
        grid: {
          color: 'rgba(148, 163, 184, 0.18)',
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, system-ui, sans-serif'
          },
          callback: (value: string | number) => `${value}${valueSuffix}`,
        }
      },
    },
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-sm shadow-slate-200/70 ring-1 ring-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/80">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Análise comparativa</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-900">{title}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Top {sortedEntries.length}</span>
      </div>
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;