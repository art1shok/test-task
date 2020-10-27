import React from 'react';
import {
  RouteContainer,
  RouteData,
  RouteDataContainer,
  RouteDescription
} from '../../styled/Route.styles';

const Way = () => (
  <RouteContainer md={{ span: 4 }}>
    <RouteDataContainer>
      <RouteDescription>MOW - HKT</RouteDescription>
      <RouteData>10:45 - 08:00</RouteData>
    </RouteDataContainer>

    <RouteDataContainer md={{ span: 4 }}>
      <RouteDescription>В пути</RouteDescription>
      <RouteData>21ч 45м</RouteData>
    </RouteDataContainer>

    <RouteDataContainer md={{ span: 3 }}>
      <RouteDescription>2 пересадки</RouteDescription>
      <RouteData>HKG, JNB</RouteData>
    </RouteDataContainer>
  </RouteContainer>
);

export default Way;
