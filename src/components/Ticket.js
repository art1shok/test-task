import React from 'react';
import { RouteData } from './RouteData';

import {
  CardHead,
  CardLogo,
  Price,
  TicketWrapper
} from '../styled/Ticket.styled';

export const Ticket = ({ price, route }) => (
  <TicketWrapper>
    <CardHead>
      <Price>
        {`${price} Р`}
      </Price>
      <CardLogo src="../../../assets/images/logo.svg" alt="logo"/>
    </CardHead>
    {route && route.map((item, index) => (
        <RouteData
          way={`${item.origin} - ${item.destination}`}
          stops={item.stops}
          date={item.date}
          duration={item.duration}
          key={index}
        />
      )
    )}

  </TicketWrapper>
);

