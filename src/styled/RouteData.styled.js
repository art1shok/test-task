import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';

import { colors } from './Variables.styled';

export const RouteContainer = styled(Row)`
 padding-left: 15px;
 margin-bottom: 20px;
`;

export const RouteDataContainer = styled(Col)`
 && {
   padding: 0;
   margin: 0;
 }
`;

export const RouteDescription = styled.h3`
  margin-bottom: 10px;
  font-size: 9px;
  line-height: 9px;
  color: ${colors.secondaryTextColor};
`;

export const RouteDataStyled = styled.h3`
  margin-bottom: 0;
  font-size: 10px;
  line-height: 10px;  
  color: ${colors.primaryTextColor};
`;





