import { Props as SearchResult, Genres } from '../components/SearchResult';

export const SEARCH_FETCH_REQUESTED = 'SEARCH_FETCH_REQUESTED';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';

export interface FetchSearchResultsAction {
  type: typeof SEARCH_FETCH_REQUESTED;
  term: string;
}

interface SetSearchResultsAction {
  type: typeof SET_SEARCH_RESULTS;
  results: ApiSearchResult[] | null;
}

export type SearchActionTypes =
  | FetchSearchResultsAction
  | SetSearchResultsAction;

export interface SearchState {
  results: SearchResult[] | null;
}

export interface ApiSearchResult {
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  poster_path: string;
}
