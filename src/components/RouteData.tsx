import React, {FC, useMemo} from 'react';
import {
  RouteContainer,
  RouteDataStyled,
  RouteDataContainer,
  RouteDescription
} from '../styled/RouteData.styled';

interface Props {
  way: string;
  date: string;
  duration: number;
  stops: string[];
}

const handleLandingTime =
  (startHours: number, startMinutes: number,
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
      minutes: Minutes
    };
  };

export const RouteData: FC<Props> = ({way, date, duration, stops}) => {
  const hh = new Date(date).getHours();
  const mm = new Date(date).getMinutes();
  const flightHours = Math.floor(duration / 60);
  const flightMinutes = duration % 60;

  const landingTime = handleLandingTime(hh, mm, flightHours, flightMinutes);

  const addZeroes = (time: number) => {
    return time < 10 ? '0' + time : time;
  }

  const formattedTime = useMemo(() =>
      `${addZeroes(hh)}:${addZeroes(mm)} -
       ${addZeroes(landingTime.hours)}:${addZeroes(landingTime.minutes)}`,
    [hh, landingTime.hours, landingTime.minutes, mm]
  )

  return (
    <RouteContainer md={{span: 4}}>
      <RouteDataContainer>
        <RouteDescription>{way}</RouteDescription>
        <RouteDataStyled>
          {formattedTime}
        </RouteDataStyled>
      </RouteDataContainer>

      <RouteDataContainer md={{span: 4}}>
        <RouteDescription>В пути</RouteDescription>
        <RouteDataStyled>
          {`${flightHours}ч ${flightMinutes}м`}
        </RouteDataStyled>
      </RouteDataContainer>

      <RouteDataContainer md={{span: 3}}>
        <RouteDescription>
          {stops.length === 0 ? 'Без пересадок' : stops.length === 1 ? '1 пересадка' : `${stops.length} пересадки`}
        </RouteDescription>
        <RouteDataStyled>{stops.join(', ')}</RouteDataStyled>
      </RouteDataContainer>
    </RouteContainer>
  );
};
