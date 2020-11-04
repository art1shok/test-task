import React from 'react';
import { configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import { Provider } from 'react-redux';
import { FlightTable } from './FlightTable';
import { store } from '../../store';

import {
  Image,
} from '../../styled/FlightTable.styled';

configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('should render FlightTable component ', () => {
  let component: any = null;
  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <FlightTable />
      </Provider>,
    );
  });

  it('Ticket component renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should contain logo', () => {
    const image = component.find(Image);
    expect(image.length).toBe(1);
  });
});
