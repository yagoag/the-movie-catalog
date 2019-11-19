import {
  SET_SEARCH_RESULTS,
  SearchActionTypes,
  SEARCH_FETCH_REQUESTED,
  ApiSearchResult,
} from './types';

export function fetchSearchResults(term: string): SearchActionTypes {
  return {
    type: SEARCH_FETCH_REQUESTED,
    term,
  };
}

export function setSearchResults(
  results: ApiSearchResult[],
): SearchActionTypes {
  return {
    type: SET_SEARCH_RESULTS,
    results,
  };
}
