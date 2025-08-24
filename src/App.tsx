import React, { useState } from 'react';
import { Activity, AlertCircle, Loader2 } from 'lucide-react';
import Dashboard from './components/Dashboard';
import FilterPanel from './components/FilterPanel';
import { AnvisaRecord, ProcessedData, FilterOptions } from './types/AnvisaData';
import { processAnvisaData } from './utils/dataProcessor';
import { applyFilters, getUniqueAssuntos } from './utils/filterUtils';
import Papa from 'papaparse';

function App() {
  const [data, setData] = useState<ProcessedData | null>(null);
  const [filteredData, setFilteredData] = useState<ProcessedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    assuntos: ['SIMILAR - Registro de Medicamento Similar', 'GENERICO - Registro de Medicamento'],
    situacao: 'all',
    dataInicio: '2020-01-01',
    dataFim: ''
  });
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Auto-load CSV data on component mount
  React.useEffect(() => {
    loadCSVData();
  }, []);

  const loadCSVData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/dados.csv');
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo CSV');
      }
      
      const csvText = await response.text();
      
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          try {
            // Filtra linhas válidas
            const validData = (results.data as AnvisaRecord[]).filter(row => 
              row.empresa_razaoSocial && 
              row.processo_numero && 
              row.situacao_descricao
            );

            if (validData.length === 0) {
              throw new Error('Nenhum dado válido encontrado no arquivo CSV');
            }

            const processedData = processAnvisaData(validData);
            setData(processedData);
            
            // Aplica filtros padrão
            const defaultFilters: FilterOptions = {
              assuntos: ['SIMILAR - Registro de Medicamento Similar', 'GENERICO - Registro de Medicamento'],
              situacao: 'all',
              dataInicio: '2020-01-01',
              dataFim: ''
            };
            
            const filtered = applyFilters(validData, defaultFilters);
            const processedFiltered = processAnvisaData(validData, filtered);
            setFilteredData(processedFiltered);
            setIsLoading(false);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao processar dados');
            setIsLoading(false);
          }
        },
        error: (error) => {
          setError('Erro ao fazer parse do CSV: ' + error.message);
          setIsLoading(false);
        }
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
      const processedFiltered = processAnvisaData(data.rawData, filtered);
      setFilteredData(processedFiltered);
    }
  };

  const handleResetFilters = () => {
    const resetFilters: FilterOptions = {
      assuntos: ['SIMILAR - Registro de Medicamento Similar', 'GENERICO - Registro de Medicamento'],
      situacao: 'all',
      dataInicio: '2020-01-01',
      dataFim: ''
    };
    setFilters(resetFilters);
    
    if (data) {
      const filtered = applyFilters(data.rawData, resetFilters);
      const processedFiltered = processAnvisaData(data.rawData, filtered);
      setFilteredData(processedFiltered);
    }
  };

  const resetData = () => {
    loadCSVData();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Erro ao Carregar Dados</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={resetData}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Dashboard ANVISA
                </h1>
                <p className="text-gray-600">Análise de Registro de Medicamentos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Section */}
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)] p-4">
          <div className="max-w-2xl w-full">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Carregando Dados da ANVISA
              </h2>
              <p className="text-gray-600">
                Processando arquivo CSV com dados de deferimentos e indeferimentos...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="h-6 w-6 text-blue-600 mr-2" />
            <span className="font-semibold text-gray-800">Dashboard Petições de Registro ANVISA</span>
          </div>
          <button
            onClick={resetData}
            className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            <Loader2 className="h-4 w-4 mr-2" />
            Recarregar Dados
          </button>
        </div>
      </div>

      {/* Dashboard */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <FilterPanel
          filters={filters}
          onFiltersChange={handleFiltersChange}
          assuntos={getUniqueAssuntos(data?.rawData || [])}
          onResetFilters={handleResetFilters}
          isExpanded={isFilterExpanded}
          onToggleExpanded={() => setIsFilterExpanded(!isFilterExpanded)}
        />

        {filteredData || data ? (
          <Dashboard data={filteredData || data} />
        ) : (
          <div className="text-center text-gray-600 mt-10">
            Nenhum dado disponível para exibir.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
