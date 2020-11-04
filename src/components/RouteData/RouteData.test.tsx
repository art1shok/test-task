import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'jest-styled-components';

import { RouteData } from './RouteData';
import {
  RouteContainer,
} from '../../styled/RouteData.styled';

configure({ adapter: new Adapter() });

const ticket = {
  origin: 'MAK',
  destination: 'MAV',
  date: '10/03/2017 07:29:46-0700',
  stops: [
    'JAK',
    'DAV',
  ],
  duration: 1200,
};

describe('should render RouteData component', () => {
  let component: any = null;
  beforeEach(() => {
    component = shallow(
      <RouteData
        way={`${ticket.origin} - ${ticket.destination}`}
        date={ticket.date}
        duration={ticket.duration}
        stops={ticket.stops}
      />,
    );
  });

  it('RouteData component renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should contain container', () => {
    const container = component.find(RouteContainer);
    expect(container.length).toBe(1);
  });

  it('should contain correct format way', () => {
    const route = 'MAK - MAV';
    const way = component.find('.way');
    expect(way.text()).toBe(route);
  });

  it('should contain correct format time', () => {
    const time = '17:29 - 13:29';
    const container = component.find('.time');
    expect(container.text()).toBe(time);
  });

  it('should contain transfers count', () => {
    const count = '2 пересадки';
    const container = component.find('.stops');
    expect(container.text()).toBe(count);
  });

  it('should contain transfers cities', () => {
    const transfers = 'JAK, DAV';
    const container = component.find('.transfers');
    expect(container.text()).toBe(transfers);
  });
});
