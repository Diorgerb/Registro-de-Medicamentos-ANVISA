import React from 'react';
import { Filter, Calendar, FileText, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { FilterOptions } from '../types/AnvisaData';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  assuntos: string[];
  onResetFilters: () => void;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  assuntos,
  onResetFilters,
  isExpanded,
  onToggleExpanded
}) => {
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleAssuntosChange = (assunto: string, checked: boolean) => {
    const newAssuntos = checked 
      ? [...filters.assuntos, assunto]
      : filters.assuntos.filter(a => a !== assunto);
    
    onFiltersChange({
      ...filters,
      assuntos: newAssuntos
    });
  };

  const hasActiveFilters = filters.assuntos.length > 0 || 
                          filters.situacao !== 'all' || 
                          filters.dataInicio !== '' || 
                          filters.dataFim !== '';

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-8">
      {/* Filter Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggleExpanded}
      >
        <div className="flex items-center space-x-3">
          <Filter className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">Filtros</h3>
          {hasActiveFilters && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              Filtros ativos
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onResetFilters();
              }}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 transition-colors"
              title="Limpar filtros"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
          <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Assuntos Filter - Multiple Selection */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FileText className="h-4 w-4 mr-1" />
                Assuntos
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2">
                {assuntos.map((assunto) => (
                  <label key={assunto} className="flex items-center text-xs">
                    <input
                      type="checkbox"
                      checked={filters.assuntos.includes(assunto)}
                      onChange={(e) => handleAssuntosChange(assunto, e.target.checked)}
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="truncate" title={assunto}>
                      {assunto.length > 30 ? `${assunto.substring(0, 30)}...` : assunto}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Situação Filter */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <CheckCircle className="h-4 w-4 mr-1" />
                Resultado
              </label>
              <select
                value={filters.situacao}
                onChange={(e) => handleFilterChange('situacao', e.target.value as 'all' | 'deferido' | 'indeferido')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">Todos os resultados</option>
                <option value="deferido">
                  <span className="flex items-center">
                    Apenas Deferidos
                  </span>
                </option>
                <option value="indeferido">
                  <span className="flex items-center">
                    Apenas Indeferidos
                  </span>
                </option>
              </select>
            </div>

            {/* Data Início Filter */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                Data Início
              </label>
              <input
                type="date"
                value={filters.dataInicio}
                onChange={(e) => handleFilterChange('dataInicio', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {/* Data Fim Filter */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                Data Fim
              </label>
              <input
                type="date"
                value={filters.dataFim}
                onChange={(e) => handleFilterChange('dataFim', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {filters.assuntos.map((assunto) => (
                  <span key={assunto} className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {assunto.length > 25 ? `${assunto.substring(0, 25)}...` : assunto}
                    <button
                      onClick={() => handleAssuntosChange(assunto, false)}
                      className="ml-1 hover:text-blue-600"
                    >
                      <XCircle className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {filters.situacao !== 'all' && (
                  <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {filters.situacao === 'deferido' ? 'Deferidos' : 'Indeferidos'}
                    <button
                      onClick={() => handleFilterChange('situacao', 'all')}
                      className="ml-1 hover:text-green-600"
                    >
                      <XCircle className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filters.dataInicio && (
                  <span className="inline-flex items-center bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    Início: {new Date(filters.dataInicio).toLocaleDateString('pt-BR')}
                    <button
                      onClick={() => handleFilterChange('dataInicio', '')}
                      className="ml-1 hover:text-purple-600"
                    >
                      <XCircle className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filters.dataFim && (
                  <span className="inline-flex items-center bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                    Fim: {new Date(filters.dataFim).toLocaleDateString('pt-BR')}
                    <button
                      onClick={() => handleFilterChange('dataFim', '')}
                      className="ml-1 hover:text-orange-600"
                    >
                      <XCircle className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;