import {
  SET_SEARCH_RESULTS,
  SearchActionTypes,
  SEARCH_FETCH_REQUESTED,
  ApiSearchResult,
  SET_MOVIE_GENRES,
  SET_IS_LOADING,
} from './types';
import { Genre } from '../components/SearchResult';

export function fetchSearchResults(term: string): SearchActionTypes {
  return {
    type: SEARCH_FETCH_REQUESTED,
    term,
  };
}

export function setSearchResults(
  results: ApiSearchResult[] | null,
): SearchActionTypes {
  return {
    type: SET_SEARCH_RESULTS,
    results,
  };
}

export function setMovieGenres(genres: Genre[]): SearchActionTypes {
  return {
    type: SET_MOVIE_GENRES,
    genres,
  };
}

export function setIsLoading(isLoading: boolean): SearchActionTypes {
  return {
    type: SET_IS_LOADING,
    isLoading,
  };
}
