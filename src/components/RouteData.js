import React from 'react';
import {
  RouteContainer,
  RouteDataStyled,
  RouteDataContainer,
  RouteDescription
} from '../styled/RouteData.styled';

const handleLandingTime = (startHours, startMinutes, flightTimeHours, flightTimeMinutes) => {
  let Hours = startHours + flightTimeHours;
  let Minutes = startMinutes + flightTimeMinutes;

  while (Hours >= 24) {
    Hours -= 24;
  }

  if (Minutes > 60) {
    Minutes -= 60;
  }

  return {
    hours: Hours,
    minutes: Minutes
  };
};

export const RouteData = ({ way, date, duration, stops }) => {
  const hh = new Date(date).getHours();
  const mm = new Date(date).getMinutes();
  const flightHours = Math.floor(duration / 60);
  const flightMinutes = duration %= 60;

  const landingTime = handleLandingTime(hh, mm, flightHours, flightMinutes);

  return (
    <RouteContainer md={{ span: 4 }}>
      <RouteDataContainer>
        <RouteDescription>{way}</RouteDescription>
        <RouteDataStyled>
          {`${hh < 10 ? '0' + hh : hh}:${mm < 10 ? '0' + mm : mm} -
           ${landingTime.hours < 10 ? '0' + landingTime.hours : landingTime.hours}:${
            landingTime.minutes < 10 ? '0' + landingTime.minutes : landingTime.minutes}`}
        </RouteDataStyled>
      </RouteDataContainer>

      <RouteDataContainer md={{ span: 4 }}>
        <RouteDescription>В пути</RouteDescription>
        <RouteDataStyled>
          {`${flightHours}ч ${flightMinutes}м`}
        </RouteDataStyled>
      </RouteDataContainer>

      <RouteDataContainer md={{ span: 3 }}>
        <RouteDescription>
          {stops.length === 0 ? 'Без пересадок' : stops.length === 1 ? '1 пересадка' : `${stops.length} пересадки`}
        </RouteDescription>
        <RouteDataStyled>{stops.join(', ')}</RouteDataStyled>
      </RouteDataContainer>
    </RouteContainer>
  );
};
