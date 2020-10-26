import React from 'react';
import {
  CardHead,
  CardLogo,
  Price,
  TicketWrapper
} from './Ticket.styled';
import logo from '../../assets/images/logo.svg';
import Route from '../Route/Route';

const Ticket = () => {
  return (

    <TicketWrapper>
      <CardHead>
        <Price>
          13 400 Р
        </Price>
        <CardLogo src={logo} alt="logo"/>

      </CardHead>
      <Route />
      <Route />

    </TicketWrapper>
  );
};

export default Ticket;
