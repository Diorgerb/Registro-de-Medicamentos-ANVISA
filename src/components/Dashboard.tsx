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
  const totalEmpresas = Object.keys(data.empresas).length;
  const leadingCompany = Object.entries(data.empresas).sort(([, a], [, b]) => b - a)[0];

  const minimumSampleSize = 3;
  const approvalRateByYear = Object.fromEntries(
    Object.entries(data.timelineData.yearly).map(([year, values]) => {
      const total = values.deferimentos + values.indeferimentos;
      return [year, total > 0 ? Number(((values.deferimentos / total) * 100).toFixed(1)) : 0];
    })
  );
  const monthlyVolume = Object.fromEntries(
    Object.entries(data.timelineData.monthly).map(([month, values]) => [
      month,
      values.deferimentos + values.indeferimentos,
    ])
  );
  const rejectionRateBySubject = Object.fromEntries(
    Object.entries(data.assuntosDetalhes)
      .filter(([, details]) => details.total >= minimumSampleSize)
      .map(([subject, details]) => [subject, Number(((details.indeferimentos / details.total) * 100).toFixed(1))])
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
  );
  const approvalRateByCompany = Object.fromEntries(
    Object.entries(data.empresasDetalhes)
      .filter(([, details]) => details.total >= minimumSampleSize)
      .map(([company, details]) => [company, Number(((details.deferimentos / details.total) * 100).toFixed(1))])
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
  );
  const averageTimeBySubject = Object.fromEntries(
    Object.entries(data.assuntosDetalhes)
      .filter(([, details]) => details.tempoCount >= minimumSampleSize)
      .map(([subject, details]) => [subject, Math.round(details.tempoTotal / details.tempoCount)])
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
  );

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
    <div className="space-y-8">
      {/* Header */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-950 shadow-2xl shadow-slate-200/80">
        <div className="relative px-6 py-8 sm:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.22),transparent_35%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200">Resultados da análise</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Painel executivo de petições ANVISA
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                Visão consolidada de deferimentos, indeferimentos, tempo médio de análise e concentração por detentor da regularização.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-xs text-slate-300">Registros</p>
                <p className="text-xl font-bold text-white">{data.totalRecords.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-xs text-slate-300">Aprovação</p>
                <p className="text-xl font-bold text-emerald-300">{approvalRate}%</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-xs text-slate-300">Empresas</p>
                <p className="text-xl font-bold text-blue-200">{totalEmpresas.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
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
          value={totalEmpresas}
          icon={Building2}
          color="purple"
        />
      </div>

      {/* Timeline Analysis Section */}
      {hasTimelineData && (
        <>
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600 ring-1 ring-blue-100">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Performance no tempo</p>
                <h2 className="text-xl font-semibold text-slate-900">Análise Temporal</h2>
              </div>
            </div>
            
            {/* Trend Cards */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
          <div>
            <LineChart
              data={data.timelineData.yearly}
              title="Evolução Anual - Deferimentos vs Indeferimentos"
              type="yearly"
            />
          </div>

          {/* Average Time with Trend */}
          <div>
            <LineChartWithTrend
              data={Object.fromEntries(
                Object.entries(data.timelineData.monthly).map(([key, val]) => [key, { tempoMedio: Number(val.tempoMedio) }])
              )}
              title="Evolução do Tempo Médio de Análise (Mensal)"
              type="monthly"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BarChart
              data={monthlyVolume}
              title="Volume Mensal de Petições"
              color="rgba(14, 165, 233, 1)"
              maxItems={12}
              valueLabel="Petições"
            />
            <BarChart
              data={approvalRateByYear}
              title="Taxa de Aprovação por Ano"
              color="rgba(16, 185, 129, 1)"
              maxItems={10}
              valueLabel="Taxa de aprovação"
              valueSuffix="%"
              maxY={100}
            />
          </div>
        </>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
            valueLabel="Tempo médio"
            valueSuffix=" dias"
          />
        )}
      </div>

      {/* Companies and Subjects Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BarChart
          data={topEmpresas}
          title="Top 10 Empresas por Quantidade de Petições"
          color="rgba(168, 85, 247, 1)"
          maxItems={10}
          valueLabel="Petições"
        />
        <BarChart
          data={topAssuntos}
          title="Principais Assuntos"
          color="rgba(34, 197, 94, 1)"
          maxItems={8}
          valueLabel="Petições"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <BarChart
          data={rejectionRateBySubject}
          title="Assuntos com Maior Taxa de Indeferimento"
          color="rgba(244, 63, 94, 1)"
          maxItems={8}
          valueLabel="Taxa de indeferimento"
          valueSuffix="%"
          maxY={100}
        />
        <BarChart
          data={approvalRateByCompany}
          title="Empresas com Maior Taxa de Aprovação"
          color="rgba(20, 184, 166, 1)"
          maxItems={8}
          valueLabel="Taxa de aprovação"
          valueSuffix="%"
          maxY={100}
        />
        <BarChart
          data={averageTimeBySubject}
          title="Assuntos com Maior Tempo Médio"
          color="rgba(245, 158, 11, 1)"
          maxItems={8}
          valueLabel="Tempo médio"
          valueSuffix=" dias"
        />
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-blue-100 bg-white/95 p-6 shadow-sm shadow-slate-200/70">
          <div className="flex items-center mb-3">
            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Taxa de Aprovação</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 mb-1">{approvalRate}%</p>
          <p className="text-sm text-gray-600">
            Das petições analisadas são deferidas
          </p>
        </div>

        <div className="rounded-2xl border border-green-100 bg-white/95 p-6 shadow-sm shadow-slate-200/70">
          <div className="flex items-center mb-3">
            <Building2 className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-gray-800">Líder em Protocolos</h3>
          </div>
          <p className="text-sm font-bold text-green-600 mb-1">
            {leadingCompany?.[0]?.substring(0, 32) || 'N/A'}
          </p>
          <p className="text-xs text-gray-600">
            {leadingCompany?.[1] || 0} petições
          </p>
        </div>

        <div className="rounded-2xl border border-purple-100 bg-white/95 p-6 shadow-sm shadow-slate-200/70">
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


    </div>
  );
};

export default Dashboard;
