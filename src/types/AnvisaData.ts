export interface AnvisaRecord {
  empresa_cnpj: string;
  empresa_razaoSocial: string;
  processo_numero: string;
  peticao_expediente: string;
  peticao_dataEntrada: string;
  assunto_descricao: string;
  situacao_descricao: string;
  peticao_dataPublicacao: string;
  Tempo_Peticao: string;
}

export interface ProcessedData {
  totalRecords: number;
  deferimentos: number;
  indeferimentos: number;
  averageTime: number;
  empresas: { [key: string]: number };
  assuntos: { [key: string]: number };
  temposPorSituacao: { [key: string]: number[] };
  timelineData: {
    monthly: { [key: string]: { deferimentos: number; indeferimentos: number } };
    yearly: { [key: string]: { deferimentos: number; indeferimentos: number } };
  };
  trends: {
    deferimentosTrend: 'increasing' | 'decreasing' | 'stable';
    indeferimentosTrend: 'increasing' | 'decreasing' | 'stable';
    trendPercentage: number;
  };
  rawData: AnvisaRecord[];
}

export interface FilterOptions {
  assuntos: string[];
  situacao: 'all' | 'deferido' | 'indeferido';
  dataInicio: string;
  dataFim: string;
}