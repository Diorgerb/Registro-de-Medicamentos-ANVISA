import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartWithTrendProps {
  data: { [key: string]: { tempoMedio: number } }; // Ex: { '2025-01': { tempoMedio: 45 } }
  title: string;
  type: 'monthly' | 'yearly';
}

const LineChartWithTrend: React.FC<LineChartWithTrendProps> = ({ data, title, type }) => {
  const sortedKeys = Object.keys(data).sort();

  const formatLabel = (key: string) => {
    if (type === 'monthly') {
      const [year, month] = key.split('-');
      const monthNames = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ];
      return `${monthNames[parseInt(month) - 1]}/${year}`;
    }
    return key;
  };

  // Calcular linha de tendência (simples regressão linear)
  const n = sortedKeys.length;
  const xValues = sortedKeys.map((_, i) => i + 1);
  const yValues = sortedKeys.map(key => data[key].tempoMedio);

  const xMean = xValues.reduce((a, b) => a + b, 0) / n;
  const yMean = yValues.reduce((a, b) => a + b, 0) / n;

  const numerator = xValues.reduce((sum, x, i) => sum + (x - xMean) * (yValues[i] - yMean), 0);
  const denominator = xValues.reduce((sum, x) => sum + (x - xMean) ** 2, 0);
  const slope = numerator / denominator;
  const intercept = yMean - slope * xMean;

  const trendData = xValues.map(x => slope * x + intercept);

  const chartData = {
    labels: sortedKeys.map(formatLabel),
    datasets: [
      {
        label: 'Tempo Médio (dias)',
        data: yValues,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 7,
      },
      {
        label: 'Tendência',
        data: trendData,
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: false,
        borderDash: [5, 5],
        tension: 0,
        pointRadius: 0,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
            family: 'Inter, system-ui, sans-serif'
          },
          usePointStyle: true,
          pointStyle: 'circle',
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
          title: (context: TooltipItem<'line'>[]) => {
            return `Período: ${context[0].label}`;
          },
          label: (context: TooltipItem<'line'>) => {
            return `${context.dataset.label}: ${context.raw.toFixed(1)} dias`;
          }
        }
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
        grid: {
          color: 'rgba(148, 163, 184, 0.18)',
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, system-ui, sans-serif'
          }
        }
      },
    },
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-sm shadow-slate-200/70 ring-1 ring-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/80">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Série histórica</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChartWithTrend;
