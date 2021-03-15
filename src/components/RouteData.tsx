import React, { FC, useMemo } from 'react';
import {
  RouteContainer,
  RouteDataStyled,
  RouteDataContainer,
  RouteDescription,
} from '../styled/RouteData.styled';

interface Props {
  way: string;
  date: string;
  duration: number;
  stops: string[];
}

const handleLandingTime = (startHours: number, startMinutes: number,
  flightTimeHours: number, flightTimeMinutes: number) => {
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
    minutes: Minutes,
  };
};

export const RouteData: FC<Props> = ({
  way, date, duration, stops,
}) => {
  const hh = new Date(date).getHours();
  const mm = new Date(date).getMinutes();
  const flightHours = Math.floor(duration / 60);
  const flightMinutes = duration % 60;

  const landingTime = handleLandingTime(hh, mm, flightHours, flightMinutes);

  const addZeroes = (time: number) => (time < 10 ? `0${time}` : time);

  const formattedTime = useMemo(() =>
    `${addZeroes(hh)}:${addZeroes(mm)} - ${addZeroes(landingTime.hours)}:${addZeroes(landingTime.minutes)}`,
  [hh, landingTime.hours, landingTime.minutes, mm]);

  const handleStops = (transfers: string[]) => {
    if (transfers.length === 0) {
      return 'Без пересадок';
    } if (transfers.length === 1) {
      return '1 пересадка';
    }
    return `${transfers.length} пересадки`;
  };

  const transfers = handleStops(stops);

  return (
    <RouteContainer>
      <RouteDataContainer>
        <RouteDescription className="way">{way}</RouteDescription>
        <RouteDataStyled className="time">
          {formattedTime}
        </RouteDataStyled>
      </RouteDataContainer>

      <RouteDataContainer>
        <RouteDescription>В пути</RouteDescription>
        <RouteDataStyled>
          {`${flightHours}ч ${flightMinutes}м`}
        </RouteDataStyled>
      </RouteDataContainer>

      <RouteDataContainer>
        <RouteDescription className="stops">
          {transfers}
        </RouteDescription>
        <RouteDataStyled className="transfers">{stops.join(', ')}</RouteDataStyled>
      </RouteDataContainer>
    </RouteContainer>
  );
};
