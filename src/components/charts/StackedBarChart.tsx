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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface StackedBarChartProps {
  data: { [key: string]: { deferimentos: number; indeferimentos: number } };
  title: string;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data, title }) => {
  const sortedKeys = Object.keys(data).sort();
  
  const formatLabel = (key: string) => {
    const [year, month] = key.split('-');
    const monthNames = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
    return `${monthNames[parseInt(month) - 1]}/${year}`;
  };

  // Calculate percentages for each month
  const percentageData = sortedKeys.map(key => {
    const total = data[key].deferimentos + data[key].indeferimentos;
    if (total === 0) return { deferimentos: 0, indeferimentos: 0 };
    
    return {
      deferimentos: (data[key].deferimentos / total) * 100,
      indeferimentos: (data[key].indeferimentos / total) * 100
    };
  });

  const chartData = {
    labels: sortedKeys.map(formatLabel),
    datasets: [
      {
        label: 'Deferimentos (%)',
        data: percentageData.map(item => item.deferimentos),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
        borderRadius: {
          topLeft: 4,
          topRight: 4,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
      {
        label: 'Indeferimentos (%)',
        data: percentageData.map(item => item.indeferimentos),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        borderRadius: {
          topLeft: 0,
          topRight: 0,
          bottomLeft: 4,
          bottomRight: 4,
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
          pointStyle: 'rect',
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
          family: 'Inter, system-ui, sans-serif'
        },
        bodyFont: {
          size: 12,
          family: 'Inter, system-ui, sans-serif'
        },
        callbacks: {
          title: (context: any) => {
            return `Período: ${context[0].label}`;
          },
          label: (context: any) => {
            const monthKey = sortedKeys[context.dataIndex];
            const monthData = data[monthKey];
            const total = monthData.deferimentos + monthData.indeferimentos;
            const count = context.datasetIndex === 0 ? monthData.deferimentos : monthData.indeferimentos;
            
            return `${context.dataset.label}: ${context.raw.toFixed(1)}% (${count}/${total})`;
          },
          footer: (context: any) => {
            const monthKey = sortedKeys[context[0].dataIndex];
            const monthData = data[monthKey];
            const total = monthData.deferimentos + monthData.indeferimentos;
            return `Total de registros: ${total}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
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
        stacked: true,
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, system-ui, sans-serif'
          },
          callback: function(value: any) {
            return value + '%';
          }
        }
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
      
      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="font-medium text-gray-700">Taxa Média de Deferimento</span>
            </div>
            <span className="text-lg font-bold text-green-600">
              {(() => {
                const totalDef = Object.values(data).reduce((sum, item) => sum + item.deferimentos, 0);
                const totalAll = Object.values(data).reduce((sum, item) => sum + item.deferimentos + item.indeferimentos, 0);
                return totalAll > 0 ? ((totalDef / totalAll) * 100).toFixed(1) : '0';
              })()}%
            </span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
              <span className="font-medium text-gray-700">Taxa Média de Indeferimento</span>
            </div>
            <span className="text-lg font-bold text-red-600">
              {(() => {
                const totalIndef = Object.values(data).reduce((sum, item) => sum + item.indeferimentos, 0);
                const totalAll = Object.values(data).reduce((sum, item) => sum + item.deferimentos + item.indeferimentos, 0);
                return totalAll > 0 ? ((totalIndef / totalAll) * 100).toFixed(1) : '0';
              })()}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackedBarChart;