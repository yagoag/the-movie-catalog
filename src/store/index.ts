import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Props as SearchResult } from '../components/SearchResult';
import {
  SET_SEARCH_RESULTS,
  SET_MOVIE_GENRES,
  SearchActionTypes,
  SearchState,
  ApiSearchResult,
  SET_IS_LOADING,
  SET_RESULT_PAGE,
  SET_TOTAL_RESULTS,
  SET_VIRTUAL_RESULT_PAGE,
  SET_SEARCH_TERM,
} from './types';
import searchSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
export const INITIAL_STATE: SearchState = {
  term: '',
  results: null,
  genres: new Map<number, string>(),
  isLoading: false,
  currentPage: 1,
  totalResults: 0,
  virtualPage: 1,
};

function reducer(
  state = INITIAL_STATE,
  action: SearchActionTypes,
): SearchState {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return { ...state, term: action.term };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        results: mapSearchResultsFromApi(action.results, state.genres),
      };
    case SET_MOVIE_GENRES:
      return {
        ...state,
        genres: action.genres.reduce((map, genre) => {
          map.set(genre.id, genre.name);
          return map;
        }, new Map<number, string>()),
      };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SET_RESULT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_RESULTS:
      return { ...state, totalResults: action.totalResults };
    case SET_VIRTUAL_RESULT_PAGE:
      return { ...state, virtualPage: action.virtualPage };
    default:
      return state;
  }
}

export default createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(searchSaga);

function mapSearchResultsFromApi(
  results: ApiSearchResult[] | null,
  genres: Map<number, string>,
): SearchResult[] | null {
  if (results === null) {
    return null;
  }

  return results.map(res => ({
    id: res.id,
    title: res.title,
    date: res.release_date,
    rating: res.vote_average,
    overview: res.overview,
    genres: res.genre_ids.map(id => ({ id: id, name: genres.get(id) || '' })),
    posterUrl: res.poster_path,
  }));
}
