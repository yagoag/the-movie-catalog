import { Props as SearchResult, Genre } from '../components/SearchResult';

export const SEARCH_FETCH_REQUESTED = 'SEARCH_FETCH_REQUESTED';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_MOVIE_GENRES = 'SET_MOVIE_GENRES';
export const SET_IS_LOADING = 'SET_IS_LOADING';

export interface FetchSearchResultsAction {
  type: typeof SEARCH_FETCH_REQUESTED;
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

interface SetIsLoading {
  type: typeof SET_IS_LOADING;
  isLoading: boolean;
}

export type SearchActionTypes =
  | FetchSearchResultsAction
  | SetSearchResultsAction
  | SetMovieGenresAction
  | SetIsLoading;

export interface SearchState {
  results: SearchResult[] | null;
  genres: Map<number, string>;
  isLoading: boolean;
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
