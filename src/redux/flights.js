import { put, call, takeEvery } from 'redux-saga/effects';
import { apiService } from '../api/apiService';

const SET_ERROR = 'test-task/flights/SET_ERROR';
const GET_SEARCH_ID = 'test-task/flights/GET_SEARCH_ID';
const GET_TICKETS = 'test-task/flights/GET_TICKETS';

const initialState = {
  searchId: null,
  ticketsInfo: null,
  error: null
};

const reducer = (state = initialState, action) => {

  const { payload } = action;
  switch (action.type) {

    case GET_SEARCH_ID: {

      return {
        ...state,
        searchId: payload
      };
    }

    case GET_TICKETS: {

      return {
        ...state,
        ticketsInfo: payload
      };
    }

    case SET_ERROR: {

      return {
        ...state,
        error: payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;

export const getSearchId = (data) => ({
  type: GET_SEARCH_ID,
  payload: data
});

export const getTickets = (data) => ({
  type: GET_TICKETS,
  payload: data
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export function * sagaWatcher () {
  yield takeEvery(GET_SEARCH_ID, sagaWorker);
}

export function * sagaWorker () {
  try {
    const result =
      yield call(apiService.getSearchId);
    const data =
      yield call(() => apiService.getTickets(result.searchId));
    yield put(getTickets(data));
  } catch (e) {
    yield put(setError(e));
  }
}
