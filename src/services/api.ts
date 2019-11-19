import axios, { AxiosInstance } from 'axios';

const { REACT_APP_API_TOKEN } = process.env;

export const api: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: { Authorization: `Bearer ${REACT_APP_API_TOKEN}` },
  params: { language: 'pt-BR' },
});
