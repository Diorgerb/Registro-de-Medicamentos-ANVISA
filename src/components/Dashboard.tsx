import React from 'react';
import { 
  FileCheck, 
  FileX, 
  Clock, 
  Building2, 
  BookOpen,
  TrendingUp,
  Calendar,
  BarChart3
} from 'lucide-react';
import { ProcessedData } from '../types/AnvisaData';
import { getTopItems } from '../utils/dataProcessor';
import StatCard from './StatCard';
import PieChart from './charts/PieChart';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import StackedBarChart from './charts/StackedBarChart';
import TrendCard from './TrendCard';
import LineChartWithTrend from './charts/LineChartWithTrend';

interface DashboardProps {
  data: ProcessedData;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const approvalRate = data.totalRecords > 0 
    ? ((data.deferimentos / data.totalRecords) * 100).toFixed(1) 
    : '0';

  const topEmpresas = getTopItems(data.empresas, 10);
  const topAssuntos = getTopItems(data.assuntos, 8);

  const statusData = {
    'Deferimentos': data.deferimentos,
    'Indeferimentos': data.indeferimentos,
  };

  // Calculate average processing time by status
  const avgTimeByStatus = Object.entries(data.temposPorSituacao).reduce((acc, [status, times]) => {
    const avg = times.reduce((sum, time) => sum + time, 0) / times.length;
    acc[status] = Math.round(avg);
    return acc;
  }, {} as { [key: string]: number });

  // Check if we have timeline data
  const hasTimelineData = Object.keys(data.timelineData.monthly).length > 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Resultados da Análise
        </h1>
        <p className="text-gray-600">
          {data.totalRecords.toLocaleString()} registros encontrados
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          title="Total de Registros"
          value={data.totalRecords}
          icon={BookOpen}
          color="blue"
        />
        <StatCard
          title="Deferimentos"
          value={data.deferimentos}
          subtitle={`${approvalRate}% do total`}
          icon={FileCheck}
          color="green"
        />
        <StatCard
          title="Indeferimentos"
          value={data.indeferimentos}
          subtitle={`${(100 - parseFloat(approvalRate)).toFixed(1)}% do total`}
          icon={FileX}
          color="red"
        />
        <StatCard
          title="Tempo Médio"
          value={`${Math.round(data.averageTime)}`}
          subtitle="dias para análise"
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Detentores da regularização"
          value={Object.keys(data.empresas).length}
          icon={Building2}
          color="purple"
        />
      </div>

      {/* Timeline Analysis Section */}
      {hasTimelineData && (
        <>
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Análise Temporal</h2>
            </div>
            
            {/* Trend Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <TrendCard
                title="Tendência de Deferimentos"
                trend={data.trends.deferimentosTrend}
                percentage={data.trends.trendPercentage}
                description="Baseado nos últimos 6 meses de dados"
              />
              <TrendCard
                title="Tendência de Indeferimentos"
                trend={data.trends.indeferimentosTrend}
                percentage={data.trends.trendPercentage}
                description="Comparação entre períodos recentes"
              />
            </div>
          </div>

          {/* Timeline Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <LineChart
              data={data.timelineData.monthly}
              title="Evolução Mensal - Deferimentos vs Indeferimentos"
              type="monthly"
            />
            <StackedBarChart
              data={data.timelineData.monthly}
              title="Distribuição Percentual Mensal"
            />
          </div>

          {/* Yearly Evolution */}
          <div className="mb-8">
            <LineChart
              data={data.timelineData.yearly}
              title="Evolução Anual - Deferimentos vs Indeferimentos"
              type="yearly"
            />
          </div>

          {/* Average Time with Trend */}
              <div className="mb-8">
                <LineChartWithTrend
                  data={Object.fromEntries(
                    Object.entries(data.timelineData.monthly).map(([key, val]) => [key, { tempoMedio: val.tempoMedio }])
                  )}
                  title="Evolução do Tempo Médio de Análise (Mensal)"
                  type="monthly"
                />
              </div>
            </>
          )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Status Distribution */}
        <PieChart
          data={statusData}
          title="Distribuição de Situações"
          colors={[
            'rgba(34, 197, 94, 0.8)', // Green for approvals
            'rgba(239, 68, 68, 0.8)',  // Red for rejections
          ]}
        />

        {/* Average Time by Status */}
        {Object.keys(avgTimeByStatus).length > 0 && (
          <BarChart
            data={avgTimeByStatus}
            title="Tempo Médio por Situação (dias)"
            color="rgba(59, 130, 246, 1)"
          />
        )}
      </div>

      {/* Companies and Subjects Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BarChart
          data={topEmpresas}
          title="Top 10 Empresas por Quantidade de Petições"
          color="rgba(168, 85, 247, 1)"
          maxItems={10}
        />
        <BarChart
          data={topAssuntos}
          title="Principais Assuntos"
          color="rgba(34, 197, 94, 1)"
          maxItems={8}
        />
      </div>

      {/* Additional Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center mb-3">
            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Taxa de Aprovação</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 mb-1">{approvalRate}%</p>
          <p className="text-sm text-gray-600">
            Das petições analisadas são deferidas
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center mb-3">
            <Building2 className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Líder em Protocolos</h3>
          </div>
          <p className="text-sm font-bold text-green-600 mb-1">
            {Object.entries(data.empresas).sort(([,a], [,b]) => b - a)[0]?.[0]?.substring(0, 25) || 'N/A'}
          </p>
          <p className="text-xs text-gray-600">
            {Object.entries(data.empresas).sort(([,a], [,b]) => b - a)[0]?.[1] || 0} petições
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center mb-3">
            <BarChart3 className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Tendência Geral</h3>
          </div>
          <p className="text-2xl font-bold text-purple-600 mb-1">
            {data.trends.deferimentosTrend === 'increasing' ? 'Positiva' : 
             data.trends.deferimentosTrend === 'decreasing' ? 'Negativa' : 'Estável'}
          </p>
          <p className="text-sm text-gray-600">
            Deferimentos {data.trends.deferimentosTrend === 'increasing' ? 'em alta' : 
                        data.trends.deferimentosTrend === 'decreasing' ? 'em baixa' : 'estáveis'}
          </p>
        </div>
      </div>

          {/* Footer */}
          <div className="mt-12">
            <footer className="bg-gray-800 text-center py-6 rounded-t-xl border-t border-gray-700">
              <span className="text-gray-300">
                Made with ☕ by{' '}
                <a
                  href="https://diorgerb.github.io/Portfolio/"
                  className="underline hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Diórger B.
                </a>
              </span>
            </footer>
          </div>

    </div>
  );
};

export default Dashboard;
