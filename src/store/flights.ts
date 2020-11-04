import { put, call, takeEvery } from 'redux-saga/effects';
import { apiService } from '../api/apiService';
import {
  FlightsActionTypes,
  FlightsState,
  GetTicketsAction,
  SetErrorAction,
  TicketsInfo,
} from './flights.types';

export const SET_ERROR = 'test-task/flights/SET_ERROR';
export const GET_SEARCH_ID = 'test-task/flights/GET_SEARCH_ID';
export const GET_TICKETS = 'test-task/flights/GET_TICKETS';

const initialState: FlightsState = {
  ticketsInfo: {
    tickets: [],
    stop: true,
  },
  error: null,
};

const flightsReducer = (
  state = initialState,
  action: FlightsActionTypes,
): FlightsState => {
  switch (action.type) {
    case GET_SEARCH_ID: {
      return {
        ...state,
      };
    }

    case GET_TICKETS: {
      return {
        ...state,
        ticketsInfo: (action as GetTicketsAction).payload,
      };
    }

    case SET_ERROR: {
      return {
        ...state,
        error: (action as SetErrorAction).payload,
      };
    }

    default:
      return state;
  }
};

export default flightsReducer;

export const getSearchId = () => ({
  type: GET_SEARCH_ID,
});

export const getTickets = (data: TicketsInfo) => ({
  type: GET_TICKETS,
  payload: data,
});

export const setError = (error: any) => ({
  type: SET_ERROR,
  payload: error,
});

export function* sagaWatcher() {
  yield takeEvery(GET_SEARCH_ID, sagaWorker);
}

export function* sagaWorker() {
  try {
    const result = yield call(apiService.getSearchId);
    const data = yield call(() => apiService.getTickets(result.searchId));
    yield put(getTickets(data));
  } catch (error) {
    yield put(setError(error.message));
  }
}
