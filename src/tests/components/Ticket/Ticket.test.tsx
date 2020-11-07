import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import 'jest-enzyme';

import { Ticket } from '../../../components';
import { Segment } from '../../../store/flights.types';
import { CardLogo, Price, TicketWrapper } from '../../../styled/Ticket.styled';

configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true,
});

const ticket = {
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
};

describe('should render Ticket component', () => {
  let component: any = null;
  beforeEach(() => {
    component = shallow(
      <Ticket price={ticket.price} route={ticket.segments as [Segment, Segment]} />,
    );
  });
  it('Ticket component renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('should contain wrapper', () => {
    const wrapper = component.find(TicketWrapper);
    expect(wrapper.length).toBe(1);
  });

  it('should contain correct format price', () => {
    const ticketPrice = '1,120 Р';
    const price = component.find(Price);

    expect(price.text()).toBe(ticketPrice.toLocaleString());
  });

  it('should contain logo', () => {
    const image = component.find(CardLogo);
    expect(image.length).toBe(1);
  });
});
