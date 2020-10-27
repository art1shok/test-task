import React from 'react';
import {
  CardHead,
  CardLogo,
  Price,
  TicketWrapper
} from '../../styled/Ticket.styled';
import logo from '../../assets/images/logo.svg';
import Way from '../Way/Way';

const Ticket = () => (
  <TicketWrapper>
    <CardHead>
      <Price>
        13 400 Р
      </Price>
      <CardLogo src={logo} alt="logo"/>

    </CardHead>
    <Way/>
    <Way/>

  </TicketWrapper>
);

export default Ticket;
