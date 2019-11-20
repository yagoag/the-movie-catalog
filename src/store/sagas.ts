import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import {
  SEARCH_FETCH_REQUESTED,
  PAGE_FETCH_REQUESTED,
  FetchSearchResultsAction,
  SearchState,
  FetchSearchResultPageAction,
} from './types';
import { api } from '../services/api';
import {
  setSearchResults,
  setMovieGenres,
  setIsLoading,
  setResultPage,
  setTotalResults,
  setSearchTerm,
  setVirtualPage,
} from './actions';

function getGenres(state: SearchState): Map<number, string> {
  return state.genres;
}

export function* fetchSearchResults(action: FetchSearchResultsAction) {
  yield put(setSearchTerm(action.term));

  if (action.term === '') {
    yield put(setSearchResults(null));
  } else {
    yield put(setIsLoading(true));

    if (!(yield select(getGenres)).keys().length) {
      const genres = yield call(api, '/genre/movie/list', {
        params: { ...api.defaults.params },
      });
      yield put(setMovieGenres(genres.data.genres));
      // TODO: The results are paged, we might need to go over all of them.
      // In that case, it might be better to separate this call into another
      // action, and maybe run it and store in local storage so we don't need
      // to repeat it every single time the page reloads.
    }

    yield delay(500);
    const { data } = yield call(api.get, '/search/movie', {
      params: { ...api.defaults.params, query: action.term },
    });

    const { results, page, total_results } = data;

    yield put(setResultPage(page));
    yield put(setVirtualPage(1));
    yield put(setTotalResults(total_results));
    yield put(setSearchResults(results));
  }

  yield put(setIsLoading(false));
}

export function* fetchSearchResultPage(action: FetchSearchResultPageAction) {
  yield put(setIsLoading(true));

  const term = yield select(state => state.term);

  const { data } = yield call(api.get, '/search/movie', {
    params: { ...api.defaults.params, query: term, page: action.page },
  });

  const { results, page, total_results } = data;

  yield put(setResultPage(page));
  yield put(setTotalResults(total_results));
  yield put(setSearchResults(results));
  yield put(setIsLoading(false));
}

export default function* searchSaga() {
  yield takeLatest(SEARCH_FETCH_REQUESTED, fetchSearchResults);
  yield takeLatest(PAGE_FETCH_REQUESTED, fetchSearchResultPage);
}
