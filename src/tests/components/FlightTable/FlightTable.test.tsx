import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {
  shallow, configure, ShallowWrapper, ShallowRendererProps,
} from 'enzyme';
import configureStore from 'redux-mock-store';
import * as reactRedux from 'react-redux';
import 'jest-enzyme';

import { Store } from 'redux';
import { FlightTable } from '../../../components';
import { FlightsState } from '../../../store/flights.types';
import {
  StyledButton,
  StyledCheckbox,
} from '../../../styled/FlightTable.styled';

configure({
  adapter: new Adapter(),
});

const initialState : FlightsState = {
  ticketsInfo: {
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
      {
        price: 2213,
        carrier: 'AI',
        segments: [
          {
            origin: 'MAK',
            destination: 'MAV',
            date: '10/03/2017 05:29:46-0700',
            stops: [
              'DAV',
            ],
            duration: 1109,
          },
          {
            origin: 'MAV',
            destination: 'MAK',
            date: '10/03/2017 07:29:46-0700',
            stops: [
              'DWv',
            ],
            duration: 768,
          },
        ],
      },
      {
        price: 720,
        carrier: 'AI',
        segments: [
          {
            origin: 'MAK',
            destination: 'MAV',
            date: '10/03/2017 07:29:46-0700',
            stops: [],
            duration: 220,
          },
          {
            origin: 'MAV',
            destination: 'MAK',
            date: '10/03/2017 07:29:46-0700',
            stops: [],
            duration: 1800,
          },
        ],
      },
      {
        price: 12400,
        carrier: 'AI',
        segments: [
          {
            origin: 'MAK',
            destination: 'MAV',
            date: '10/03/2017 07:29:46-0700',
            stops: [
              'ADW',
              'AWW',
              'AN',
            ],
            duration: 740,
          },
          {
            origin: 'MAV',
            destination: 'MAK',
            date: '10/03/2017 07:29:46-0700',
            stops: [
              'AW',
              'ADD',
              'DWW',
            ],
            duration: 1800,
          },
        ],
      },
    ],
    stop: false,
  },
  error: null,
};

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual<any>('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
    location: {
      search: 'string',
    },
  }),
}));

describe('App component', () => {
  let wrapper: ShallowWrapper<any>;
  let store: Store;

  beforeEach(() => {
    store = configureStore()(initialState);

    jest
      .spyOn(reactRedux, 'useSelector')
      .mockImplementation(() => store.getState().ticketsInfo);

    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => store.dispatch);
    const context = { store };
    wrapper = shallow(
      <FlightTable />,
      context as ShallowRendererProps,
    ).dive();
  });
  it('Flight Table render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Flight Table should have 5 filter checkboxes',
    () => {
      expect(wrapper.find(StyledCheckbox)).toHaveLength(5);
    });

  it('Flight Table should have 2 sorting buttons',
    () => {
      expect(wrapper.find(StyledButton)).toHaveLength(2);
    });

  it('Should have onClick function on the  button',
    () => {
      expect(wrapper.find(StyledButton).at(1).simulate('click')).toHaveLength(1);
    });

  it('Should receive event function on click the checkbox',
    () => {
      expect(wrapper.find(StyledCheckbox).at(1).simulate('event')).toHaveLength(1);
    });
});
