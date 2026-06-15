import { AnvisaRecord, FilterOptions } from '../types/AnvisaData';
import { parseISO, isValid, isAfter, isBefore, isSameDay } from 'date-fns';

export const applyFilters = (data: AnvisaRecord[], filters: FilterOptions): AnvisaRecord[] => {
  return data.filter(record => {
    // Filter by assuntos (multiple selection)
    if (filters.assuntos.length > 0 && !filters.assuntos.includes(record.assunto_descricao)) {
      return false;
    }

    // Filter by situacao
    if (filters.situacao !== 'all') {
      const isDeferimento = record.situacao_descricao === "Foi publicado o deferimento do processo ou da petição.";
      const isIndeferimento = record.situacao_descricao === "Foi publicado o indeferimento do processo ou da petição.";
      
      if (filters.situacao === 'deferido' && !isDeferimento) {
        return false;
      }
      if (filters.situacao === 'indeferido' && !isIndeferimento) {
        return false;
      }
    }

    // Filter by date range
    if (filters.dataInicio || filters.dataFim) {
      const publicationDate = record.peticao_dataPublicacao;
      if (!publicationDate) return false;

      try {
        const recordDate = parseISO(publicationDate);
        if (!isValid(recordDate)) return false;

        if (filters.dataInicio) {
          const startDate = parseISO(filters.dataInicio);
          if (isValid(startDate) && isBefore(recordDate, startDate) && !isSameDay(recordDate, startDate)) {
            return false;
          }
        }

        if (filters.dataFim) {
          const endDate = parseISO(filters.dataFim);
          if (isValid(endDate) && isAfter(recordDate, endDate) && !isSameDay(recordDate, endDate)) {
            return false;
          }
        }
      } catch (error) {
        return false;
      }
    }

    return true;
  });
};

export const getUniqueAssuntos = (data: AnvisaRecord[]): string[] => {
  const assuntos = new Set<string>();
  data.forEach(record => {
    if (record.assunto_descricao && record.assunto_descricao.trim()) {
      assuntos.add(record.assunto_descricao);
    }
  });
  return Array.from(assuntos).sort();
};