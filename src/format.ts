import languageNames from './i18n/languages.pt-BR';
import statusNames from './i18n/status.pt-BR';

export const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString('pt-BR');

export const translateStatus = (status: string): string =>
  statusNames.get(status) || status;

export const getLanguageName = (code: string): string =>
  languageNames.get(code) || code;

export const formatCurrency = (value: number): string =>
  '$' +
  Number(value + 0.001)
    .toLocaleString()
    .slice(0, -1);

export const formatTime = (minutes: number): string => {
  let formatted: string = '';

  if (minutes / 60 >= 1) {
    formatted += `${Math.floor(minutes / 60)}h `;
  }

  formatted += `${minutes % 60}min`;

  return formatted;
};
