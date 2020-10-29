import styled from 'styled-components';

import { colors } from './Variables.styled';

export const TicketWrapper = styled.div`
  padding: 30px 50px 20px 20px;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 3px;
`;

export const CardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

export const Price = styled.h2`
  font-size: 18px;
  margin-bottom: 0;
  line-height: 18px;
  color: ${colors.blueColor};
`;

export const CardLogo = styled.img`
  width: 100%;
  max-width: 110px;
  max-height: 36px;
`;
