// src/utils/dateUtils.ts
import { formatInTimeZone } from 'date-fns-tz'
import { ptBR } from 'date-fns/locale'

/**
 * Recebe uma ISO string em UTC (por exemplo "2025-07-05T04:25:45.943162Z")
 * e formata no fuso de São Paulo, em pt-BR.
 *
 * @param isoString string ISO/UTC
 * @param pattern   padrão de formatação (date-fns), ex: "dd/MM/yyyy" ou "d 'de' MMMM 'de' yyyy"
 */
export function formatDateInBrazil(
  isoString: string,
  pattern: string = "dd/MM/yyyy"
): string {
  // date-fns-tz aceita Date | string como primeiro parâmetro
  return formatInTimeZone(
    isoString,
    "America/Sao_Paulo",
    pattern,
    { locale: ptBR }
  )
}
