import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FormGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Ticket } from '../Ticket/Ticket';
import { selectTicketsInfo } from '../../store/selectors';
import { getSearchId } from '../../store/flights';

import {
  Background,
  ButtonContainer,
  CheckboxContainer,
  FilterContainer,
  Image,
  ImageContainer,
  StyledButton,
  StyledCheckbox,
  StyledContainer,
  StyledText,
  TicketsContainer,
} from '../../styled/FlightTable.styled';
import { TicketData } from '../../store/flights.types';

enum Filter {
  All = 'all',
  None = 'none',
  One = 'one',
  Two = 'two',
  Three = 'three',
}

enum SortType {
  Cheapest = 'cheapest',
  Fastest = 'fastest'
}

const filters: Record<string, number> = {
  none: 0,
  one: 1,
  two: 2,
  three: 3,
};

export const FlightTable = () => {
  const [sortType, setSortType] = useState(SortType.Cheapest);
  const history = useHistory();
  const dispatch = useDispatch();
  const ticketsInfo = useSelector(selectTicketsInfo);

  const paramsSet = useMemo(() => {
    const newParamsSet: Record<Filter, boolean> = {
      all: false,
      one: false,
      two: false,
      three: false,
      none: false,
    };

    const paramsArr = history.location.search !== ''
      ? history.location.search.substring(1)
        .split('&')
        .filter((item) => item !== '') as Filter []
      : [];

    paramsArr.forEach((item) => {
      newParamsSet[item] = true;
    });
    return newParamsSet;
  }, [history.location.search]);

  useEffect(() => {
    dispatch(getSearchId());
  }, [dispatch]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = event.target;
      let queryString = '?';

      Object.entries(paramsSet)
        .forEach(([filter, isActive]) => {
          if ((filter === name && !isActive)
          || (filter !== name && isActive)) {
            queryString += `${filter}&`;
          }
        });

      history.push({
        pathname: '/',
        search: queryString,
      });
    },
    [history, paramsSet],
  );

  const sortCheapest = (a: TicketData, b: TicketData) =>
    (a.price > b.price ? 1 : -1);

  const sortFastest = (a: TicketData, b: TicketData) =>
    (a.segments[0].duration > b.segments[0].duration ? 1 : -1);

  const filteredTickets = useMemo(() => {
    if (paramsSet.all || Object.values(paramsSet)
      .every((item) => !item)) {
      return ticketsInfo.tickets;
    }

    return ticketsInfo.tickets
      .filter((ticket: TicketData) => {
        let isAppropriate = false;
        Object.entries(paramsSet)
          .forEach(([filterName, isActive]) => {
            if (isActive
          && ticket.segments
            .every((segment) =>
              segment.stops.length === filters[filterName])) {
              isAppropriate = true;
            }
          });
        return isAppropriate;
      });
  }, [ticketsInfo, paramsSet]);

  const sortedTickets = useMemo(() =>
    filteredTickets.sort(sortType === SortType.Cheapest
      ? sortCheapest : sortFastest),
  [filteredTickets, sortType]);

  const getVariant = (type: SortType) => (sortType === type ? 'primary' : 'light');

  return (
    <Background>
      <StyledContainer>
        <ImageContainer>
          <Image src="../assets/images/plane.svg" alt="plane" />
        </ImageContainer>

        <FilterContainer>
          <CheckboxContainer>
            <StyledText>
              Колличество пересадок
            </StyledText>
            <FormGroup controlId="formBasicCheckbox">
              <StyledCheckbox
                type="checkbox"
                label="Все"
                id="all"
                name="all"
                checked={paramsSet.all}
                onChange={handleChange}
              />
              <StyledCheckbox
                type="checkbox"
                label="Без пересадок"
                id="none"
                name="none"
                checked={paramsSet.none}
                onChange={handleChange}
              />
              <StyledCheckbox
                type="checkbox"
                label="1 пересадка"
                name="one"
                id="one"
                checked={paramsSet.one}
                onChange={handleChange}
              />
              <StyledCheckbox
                type="checkbox"
                label="2 пересадки"
                name="two"
                id="two"
                checked={paramsSet.two}
                onChange={handleChange}
              />
              <StyledCheckbox
                type="checkbox"
                label="3 пересадки"
                name="three"
                id="three"
                checked={paramsSet.three}
                onChange={handleChange}
              />
            </FormGroup>
          </CheckboxContainer>
          <TicketsContainer>
            <ButtonContainer size="lg">
              <StyledButton
                variant={getVariant(SortType.Cheapest)}
                onClick={() => setSortType(SortType.Cheapest)}
              >
                Самый дешевый
              </StyledButton>
              <StyledButton
                variant={getVariant(SortType.Fastest)}
                onClick={() => setSortType(SortType.Fastest)}
              >
                Самый быстрый
              </StyledButton>
            </ButtonContainer>
            {sortedTickets && sortedTickets.slice(0, 5).map((item: any, index: number) => (
              <Ticket
                key={index}
                price={item.price}
                route={item.segments}
              />
            ))}
          </TicketsContainer>
        </FilterContainer>
      </StyledContainer>
    </Background>
  );
};
