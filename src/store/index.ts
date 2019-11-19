import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Props as SearchResult } from '../components/SearchResult';
import {
  SET_SEARCH_RESULTS,
  SearchActionTypes,
  SearchState,
  ApiSearchResult,
} from './types';
import searchSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const INITIAL_STATE: SearchState = {
  results: null,
};

function reducer(
  state = INITIAL_STATE,
  action: SearchActionTypes,
): SearchState {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        results: mapSearchResultsFromApi(action.results),
      };
    default:
      return state;
  }
}

export default createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(searchSaga);

function mapSearchResultsFromApi(
  results: ApiSearchResult[] | null,
): SearchResult[] | null {
  if (results === null) {
    return null;
  }

  return results.map(res => ({
    title: res.title,
    date: res.release_date,
    rating: res.vote_average,
    overview: res.overview,
    genres: res.genre_ids.map(id => ({ id: id, name: id.toString() })),
    posterUrl: res.poster_path,
  }));
}
