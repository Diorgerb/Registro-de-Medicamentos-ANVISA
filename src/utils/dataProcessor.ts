import { AnvisaRecord, ProcessedData } from '../types/AnvisaData';
import { format, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const processAnvisaData = (data: AnvisaRecord[], filteredData?: AnvisaRecord[]): ProcessedData => {
  const dataToProcess = filteredData || data;
  
  const processed: ProcessedData = {
    totalRecords: dataToProcess.length,
    deferimentos: 0,
    indeferimentos: 0,
    averageTime: 0,
    empresas: {},
    assuntos: {},
    temposPorSituacao: {},
    timelineData: {
      monthly: {},
      yearly: {}
    },
    trends: {
      deferimentosTrend: 'stable',
      indeferimentosTrend: 'stable',
      trendPercentage: 0
    },
    rawData: data
  };

  let totalTime = 0;
  let validTimeRecords = 0;

  dataToProcess.forEach(record => {
    const isDeferimento = record.situacao_descricao === "Foi publicado o deferimento do processo ou da petição.";
    const isIndeferimento = record.situacao_descricao === "Foi publicado o indeferimento do processo ou da petição.";
    
    if (isDeferimento) {
      processed.deferimentos++;
    } else if (isIndeferimento) {
      processed.indeferimentos++;
    }

    // Process timeline data
    const publicationDate = record.peticao_dataPublicacao;
    if (publicationDate) {
      try {
        const date = parseISO(publicationDate);
        if (isValid(date)) {
          const monthKey = format(date, 'yyyy-MM', { locale: ptBR });
          const yearKey = format(date, 'yyyy', { locale: ptBR });

          // Initialize monthly data
          if (!processed.timelineData.monthly[monthKey]) {
            processed.timelineData.monthly[monthKey] = { deferimentos: 0, indeferimentos: 0, tempoMedio: [] };
          }

          // Initialize yearly data
          if (!processed.timelineData.yearly[yearKey]) {
            processed.timelineData.yearly[yearKey] = { deferimentos: 0, indeferimentos: 0, tempoMedio: [] };
          }

          // Count by timeline
          if (isDeferimento) {
            processed.timelineData.monthly[monthKey].deferimentos++;
            processed.timelineData.yearly[yearKey].deferimentos++;
          } else if (isIndeferimento) {
            processed.timelineData.monthly[monthKey].indeferimentos++;
            processed.timelineData.yearly[yearKey].indeferimentos++;
          }
        }
      } catch (error) {
        console.warn('Invalid date format:', publicationDate);
      }
    }

    // Count by company
    const empresa = record.empresa_razaoSocial;
    if (empresa) {
      processed.empresas[empresa] = (processed.empresas[empresa] || 0) + 1;
    }

    // Count by subject
    const assunto = record.assunto_descricao;
    if (assunto) {
      processed.assuntos[assunto] = (processed.assuntos[assunto] || 0) + 1;
    }

    // Calculate time statistics
    const tempo = parseFloat(record.Tempo_Peticao);
    if (!isNaN(tempo) && tempo > 0) {
      totalTime += tempo;
      validTimeRecords++;

      // Group times by situation for more detailed analysis
      if (!processed.temposPorSituacao[record.situacao_descricao]) {
        processed.temposPorSituacao[record.situacao_descricao] = [];
      }
      processed.temposPorSituacao[record.situacao_descricao].push(tempo);

      // Add to monthly/yearly tempoMedio arrays
      if (publicationDate) {
        const date = parseISO(publicationDate);
        if (isValid(date)) {
          const monthKey = format(date, 'yyyy-MM', { locale: ptBR });
          const yearKey = format(date, 'yyyy', { locale: ptBR });
          processed.timelineData.monthly[monthKey].tempoMedio.push(tempo);
          processed.timelineData.yearly[yearKey].tempoMedio.push(tempo);
        }
      }
    }
  });

  processed.averageTime = validTimeRecords > 0 ? totalTime / validTimeRecords : 0;

  // Finalize tempoMedio: calcular média para cada mês e ano
  Object.keys(processed.timelineData.monthly).forEach(month => {
    const tempos = processed.timelineData.monthly[month].tempoMedio;
    processed.timelineData.monthly[month].tempoMedio = tempos.length
      ? tempos.reduce((a,b)=>a+b,0)/tempos.length
      : 0;
  });

  Object.keys(processed.timelineData.yearly).forEach(year => {
    const tempos = processed.timelineData.yearly[year].tempoMedio;
    processed.timelineData.yearly[year].tempoMedio = tempos.length
      ? tempos.reduce((a,b)=>a+b,0)/tempos.length
      : 0;
  });

  // Calculate trends
  processed.trends = calculateTrends(processed.timelineData.monthly);
  return processed;
};

const calculateTrends = (monthlyData: { [key: string]: { deferimentos: number; indeferimentos: number } }) => {
  const sortedMonths = Object.keys(monthlyData).sort();
  
  if (sortedMonths.length < 2) {
    return {
      deferimentosTrend: 'stable' as const,
      indeferimentosTrend: 'stable' as const,
      trendPercentage: 0
    };
  }

  const recentMonths = sortedMonths.slice(-6);
  const firstHalf = recentMonths.slice(0, Math.ceil(recentMonths.length / 2));
  const secondHalf = recentMonths.slice(Math.ceil(recentMonths.length / 2));

  const firstHalfDef = firstHalf.reduce((sum, month) => sum + monthlyData[month].deferimentos, 0);
  const firstHalfIndef = firstHalf.reduce((sum, month) => sum + monthlyData[month].indeferimentos, 0);
  const firstHalfTotal = firstHalfDef + firstHalfIndef;
  
  const secondHalfDef = secondHalf.reduce((sum, month) => sum + monthlyData[month].deferimentos, 0);
  const secondHalfIndef = secondHalf.reduce((sum, month) => sum + monthlyData[month].indeferimentos, 0);
  const secondHalfTotal = secondHalfDef + secondHalfIndef;

  const firstHalfDefRate = firstHalfTotal > 0 ? (firstHalfDef / firstHalfTotal) * 100 : 0;
  const secondHalfDefRate = secondHalfTotal > 0 ? (secondHalfDef / secondHalfTotal) * 100 : 0;
  
  const firstHalfIndefRate = firstHalfTotal > 0 ? (firstHalfIndef / firstHalfTotal) * 100 : 0;
  const secondHalfIndefRate = secondHalfTotal > 0 ? (secondHalfIndef / secondHalfTotal) * 100 : 0;

  const defTrendPercentage = secondHalfDefRate - firstHalfDefRate;
  const indefTrendPercentage = secondHalfIndefRate - firstHalfIndefRate;

  return {
    deferimentosTrend: defTrendPercentage > 5 ? 'increasing' : defTrendPercentage < -5 ? 'decreasing' : 'stable',
    indeferimentosTrend: indefTrendPercentage > 5 ? 'increasing' : indefTrendPercentage < -5 ? 'decreasing' : 'stable',
    trendPercentage: Math.abs(defTrendPercentage)
  } as const;
};

export const getTopItems = (items: { [key: string]: number }, limit: number = 10) => {
  return Object.entries(items)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};
