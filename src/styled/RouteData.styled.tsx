import styled from 'styled-components/macro';

import { colors, device } from './Variables.styled';

export const RouteContainer = styled.div`
 display: flex;
 justify-content: space-between;
 margin-bottom: 20px;
 padding-right: 20px;
 
  @media screen and ${device.tablet} {
   padding-right: 0;
   justify-content: space-around;
  }
`;

export const RouteDataContainer = styled.div`
 min-width: 70px;
 && {
   padding: 0;
   margin: 0; 
 }
  @media screen and ${device.tablet} {
    min-width: calc(100%/3);
    text-align: center;
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
