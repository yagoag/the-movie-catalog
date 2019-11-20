import {
  SET_SEARCH_RESULTS,
  SearchActionTypes,
  SEARCH_FETCH_REQUESTED,
  ApiSearchResult,
  SET_MOVIE_GENRES,
  SET_IS_LOADING,
  SET_RESULT_PAGE,
  SET_TOTAL_RESULTS,
  SET_SEARCH_TERM,
  SET_VIRTUAL_RESULT_PAGE,
  PAGE_FETCH_REQUESTED,
} from './types';
import { Genre } from '../components/SearchResult';

export function setSearchTerm(term: string): SearchActionTypes {
  return {
    type: SET_SEARCH_TERM,
    term,
  };
}

export function fetchSearchResults(term: string): SearchActionTypes {
  return {
    type: SEARCH_FETCH_REQUESTED,
    term,
  };
}

export function fetchSearchResultPage(page: number): SearchActionTypes {
  return {
    type: PAGE_FETCH_REQUESTED,
    page,
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

export function setResultPage(currentPage: number): SearchActionTypes {
  return {
    type: SET_RESULT_PAGE,
    currentPage,
  };
}

export function setTotalResults(totalResults: number): SearchActionTypes {
  return {
    type: SET_TOTAL_RESULTS,
    totalResults,
  };
}

export function setVirtualPage(virtualPage: number): SearchActionTypes {
  return {
    type: SET_VIRTUAL_RESULT_PAGE,
    virtualPage,
  };
}
