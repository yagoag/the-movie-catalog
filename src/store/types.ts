import { Props as SearchResult, Genre } from '../components/SearchResult';

export const SEARCH_FETCH_REQUESTED = 'SEARCH_FETCH_REQUESTED';
export const PAGE_FETCH_REQUESTED = 'PAGE_FETCH_REQUESTED';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_MOVIE_GENRES = 'SET_MOVIE_GENRES';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_RESULT_PAGE = 'SET_RESULT_PAGE';
export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
export const SET_VIRTUAL_RESULT_PAGE = 'SET_VIRTUAL_RESULT_PAGE';

export interface FetchSearchResultsAction {
  type: typeof SEARCH_FETCH_REQUESTED;
  term: string;
}

export interface FetchSearchResultPageAction {
  type: typeof PAGE_FETCH_REQUESTED;
  page: number;
}

interface SetSearchTermAction {
  type: typeof SET_SEARCH_TERM;
  term: string;
}

interface SetSearchResultsAction {
  type: typeof SET_SEARCH_RESULTS;
  results: ApiSearchResult[] | null;
}

interface SetMovieGenresAction {
  type: typeof SET_MOVIE_GENRES;
  genres: Genre[];
}

interface SetIsLoadingAction {
  type: typeof SET_IS_LOADING;
  isLoading: boolean;
}

interface SetResultPageAction {
  type: typeof SET_RESULT_PAGE;
  currentPage: number;
}

interface SetTotalPagesAction {
  type: typeof SET_TOTAL_PAGES;
  totalPages: number;
}

interface SetVirtualResultPageAction {
  type: typeof SET_VIRTUAL_RESULT_PAGE;
  virtualPage: number;
}

export type SearchActionTypes =
  | FetchSearchResultsAction
  | FetchSearchResultPageAction
  | SetSearchTermAction
  | SetSearchResultsAction
  | SetMovieGenresAction
  | SetIsLoadingAction
  | SetResultPageAction
  | SetTotalPagesAction
  | SetVirtualResultPageAction;

export interface SearchState {
  term: string;
  results: SearchResult[] | null;
  genres: Map<number, string>;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  virtualPage: number;
}

export interface ApiSearchResult {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  poster_path: string;
}
