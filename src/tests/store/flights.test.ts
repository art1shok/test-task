import expect from 'expect';
import { takeEvery } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import {
  setError,
  getTickets,
  sagaWatcher,
  sagaWorker,
} from '../../store/flights';

import { apiService } from '../../api/apiService';
import { TicketsInfo } from '../../store/flights.types';

const ticketResponse: TicketsInfo = {
  tickets: [
    {
      price: 1120,
      carrier: 'AI',
      segments: [
        {
          origin: 'MAK',
          destination: 'MAV',
          date: '10/03/2017 07:29:46-0700',
          stops: [
            'JAK',
            'DAV',
          ],
          duration: 1200,
        },
        {
          origin: 'MAV',
          destination: 'MAK',
          date: '10/03/2017 07:29:46-0700',
          stops: [
            'DWV',
            'DAV',
          ],
          duration: 1890,
        },
      ],
    },
  ],
  stop: false,
};

describe('Reducer store for actions and sagas', () => {
  const genObject = sagaWatcher();

  it('Should wait for GET_SEARCH_ID action and call sagaWorker', () => {
    expect(genObject.next().value)
      .toEqual(takeEvery('test-task/flights/GET_SEARCH_ID', sagaWorker));
  });

  it('Next iteration should be done', () => {
    expect(genObject.next().done).toBeTruthy();
  });

  it('should load tickets and handle it in case of success',
    async () => {
      const requestedTickets = jest.spyOn(apiService, 'getTickets')
        .mockImplementation(() => Promise.resolve(ticketResponse));

      const dispatched: any[] = [];

      const fakeStore = {
        dispatch: (action: any) => dispatched.push(action),
      };
      await runSaga(fakeStore, sagaWorker).toPromise();
      expect(dispatched[0])
        .toEqual(getTickets(ticketResponse));

      requestedTickets.mockClear();
    });

  it('should handle errors in case of fail',
    async () => {
      const error = 'some error is thrown';

      const requestedTickets = jest.spyOn(apiService, 'getTickets')
        .mockImplementation(() => Promise.reject(new Error(error)));

      const dispatched: any[] = [];

      const fakeStore = {
        dispatch: (action: any) => dispatched.push(action),
      };

      await runSaga(fakeStore, sagaWorker).toPromise();
      expect(dispatched[0])
        .toEqual(setError(error));

      requestedTickets.mockClear();
    });
});
