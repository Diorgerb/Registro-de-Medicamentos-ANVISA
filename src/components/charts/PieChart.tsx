import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: { [key: string]: number };
  title: string;
  colors: string[];
}

const PieChart: React.FC<PieChartProps> = ({ data, title, colors }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: colors,
        borderColor: '#ffffff',
        borderWidth: 4,
        hoverBorderWidth: 6,
        spacing: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '62%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
            family: 'Inter, system-ui, sans-serif'
          }
        }
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
          label: (context: TooltipItem<'doughnut'>) => {
            const values = context.dataset.data as number[];
            const rawValue = Number(context.raw);
            const total = values.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? ((rawValue / total) * 100).toFixed(1) : '0.0';
            return `${context.label}: ${rawValue} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-sm shadow-slate-200/70 ring-1 ring-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/80">
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Composição</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="h-72">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;