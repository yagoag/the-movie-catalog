import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { SEARCH_FETCH_REQUESTED, FetchSearchResultsAction } from './types';
import { api } from '../services/api';
import { setSearchResults } from './actions';

export function* fetchSearchResults(action: FetchSearchResultsAction) {
  yield delay(1000);
  const { data } = yield call(api.get, '/search/movie', {
    params: { ...api.defaults.params, query: action.term },
  });

  const { results } = data;
  console.log(results);
  yield put(setSearchResults(results));
}

export default function* searchSaga() {
  yield takeLatest(SEARCH_FETCH_REQUESTED, fetchSearchResults);
}
