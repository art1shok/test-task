import React, { FC } from 'react';
import { RouteData } from '../RouteData/RouteData';

import {
  CardHead,
  CardLogo,
  Price,
  TicketWrapper,
} from '../../styled/Ticket.styled';
import { Segment } from '../../store/flights.types';

interface Props {
  price: number;
  route: [
    Segment,
    Segment
  ]
}

export const Ticket: FC<Props> = ({ price, route }) => (
  <TicketWrapper id="wrapper">
    <CardHead>
      <Price id="price">
        {`${price.toLocaleString()} Р` }
      </Price>
      <CardLogo
        src="../../../assets/images/logo.svg"
        alt="logo"
        id="img"
      />
    </CardHead>
    {route && route.map((item: any, index: number) => (
      <RouteData
        way={`${item.origin} - ${item.destination}`}
        stops={item.stops}
        date={item.date}
        duration={item.duration}
        key={index}
      />
    ))}
  </TicketWrapper>
);
