import React, { useState } from 'react';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import Dashboard from '../components/Dashboard';
import FilterPanel from '../components/FilterPanel';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { AnvisaRecord, ProcessedData, FilterOptions } from '../types/AnvisaData';
import { processAnvisaData } from '../utils/dataProcessor';
import { applyFilters, getUniqueAssuntos } from '../utils/filterUtils';
import Papa from 'papaparse';

const DEFAULT_FILTERS: FilterOptions = {
  assuntos: ['SIMILAR - Registro de Medicamento Similar', 'GENERICO - Registro de Medicamento'],
  situacao: 'all',
  dataInicio: '2020-01-01',
  dataFim: '',
};

export function DashboardPage() {
  const [data, setData] = useState<ProcessedData | null>(null);
  const [filteredData, setFilteredData] = useState<ProcessedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  React.useEffect(() => {
    loadCSVData();
  }, []);

  const loadCSVData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/dados.csv');
      if (!response.ok) throw new Error('Erro ao carregar o arquivo CSV');

      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          try {
            const validData = (results.data as AnvisaRecord[]).filter(
              (row) => row.empresa_razaoSocial && row.processo_numero && row.situacao_descricao
            );

            if (validData.length === 0) throw new Error('Nenhum dado válido encontrado');

            const processedData = processAnvisaData(validData);
            setData(processedData);

            const filtered = applyFilters(validData, DEFAULT_FILTERS);
            const processedFiltered = processAnvisaData(validData, filtered);
            setFilteredData(processedFiltered);
            setIsLoading(false);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao processar dados');
            setIsLoading(false);
          }
        },
        error: (err) => {
          setError('Erro ao fazer parse do CSV: ' + err.message);
          setIsLoading(false);
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      setIsLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    if (data) {
      const filtered = applyFilters(data.rawData, newFilters);
      setFilteredData(processAnvisaData(data.rawData, filtered));
    }
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    if (data) {
      const filtered = applyFilters(data.rawData, DEFAULT_FILTERS);
      setFilteredData(processAnvisaData(data.rawData, filtered));
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_32%),linear-gradient(135deg,#f8fafc_0%,#eef6ff_100%)] flex flex-col">
      <Navbar />

      {error && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Erro ao Carregar Dados</h2>
            <p className="text-gray-500 mb-6">{error}</p>
            <button
              onClick={loadCSVData}
              className="bg-brand-navy text-white px-6 py-2 rounded-lg hover:bg-brand-navy-dark transition"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      )}

      {isLoading && !error && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <Loader2 className="h-12 w-12 text-brand-navy animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Carregando Dados da ANVISA</h2>
            <p className="text-gray-500">Processando registros de deferimentos e indeferimentos...</p>
          </div>
        </div>
      )}

      {!isLoading && !error && (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:py-10">
          <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/80 bg-white/80 p-5 shadow-sm shadow-slate-200/70 backdrop-blur md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-950">Dashboard de Petições de Registro ANVISA</h1>
              <p className="text-slate-500 text-sm mt-1">Dados oficiais de deferimentos e indeferimentos de medicamentos</p>
            </div>
            <button
              onClick={loadCSVData}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <RefreshCw size={14} />
              Recarregar
            </button>
          </div>

          <FilterPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            assuntos={getUniqueAssuntos(data?.rawData || [])}
            onResetFilters={handleResetFilters}
            isExpanded={isFilterExpanded}
            onToggleExpanded={() => setIsFilterExpanded(!isFilterExpanded)}
          />

          {filteredData || data ? (
            <Dashboard data={filteredData || data!} />
          ) : (
            <div className="text-center text-gray-500 mt-10">Nenhum dado disponível.</div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
