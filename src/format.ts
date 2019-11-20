import languageNames from './i18n/languages.pt-BR';
import statusNames from './i18n/status.pt-BR';

export const formatDate = (date: string): string =>
  new Date(date).toLocaleDateString('pt-BR');

export const translateStatus = (status: string): string =>
  statusNames.get(status) || status;

export const getLanguageName = (code: string): string =>
  languageNames.get(code) || code;
