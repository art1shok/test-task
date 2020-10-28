import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Ticket } from './Ticket';
// import { selectTicketsInfo } from '../redux/selectors';
import { getSearchId } from '../redux/flights';
import { ticket } from '../mocks/ticket.mock'

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
} from '../styled/FlightTable.styled';

const filters = {
  none: 0,
  one: 1,
  two: 2,
  three: 3,
};

export const FlightTable = () => {
  const [sortType, setSortType] = useState('cheapest');
  const history = useHistory();
  const dispatch = useDispatch();
  // TODO: remove comments when API is working
  //const info = useSelector(selectTicketsInfo);
  const info = ticket;

  const paramsSet = useMemo(() => {
    const newParamsSet = {
      all: false,
      one: false,
      two: false,
      three: false,
      none: false,
    };

    const paramsArr = history.location.search !== ''
      ? history.location.search.substring(1)
        .split('&')
        .filter(item => item !== '')
      : [];

    paramsArr.forEach(item => {
      newParamsSet[item] = true;
    })
    return newParamsSet;

  }, [history.location.search]);

  useEffect(() => {
    dispatch(getSearchId());
  }, [dispatch]);

  const handleChange = useCallback((e) => {
    const { name } = e.target;
    let queryString = '?';

    Object.entries(paramsSet).forEach(([filter, isActive], index) => {
      if ((filter === name && !isActive) || (filter !== name && isActive)) {
        queryString += `${filter}&`;
      }
    });

    history.push({
      pathname: '/',
      search: queryString
    });
  }, [history, paramsSet]);

  const sortCheapest = (a, b) => a.price > b.price ? 1 : -1;

  const sortFastest = (a, b) => a.segments[0].duration > b.segments[0].duration ? 1 : -1;

  const filteredTickets = useMemo(() => {
    if (paramsSet['all'] || Object.values(paramsSet).every(item => !item)) {
      return info;
    }

    return info.filter((ticket) => {
        let isAppropriate = false;
        Object.entries(paramsSet).forEach(([filterName, isActive]) => {
          if (isActive && ticket.segments.every(segment => segment.stops.length === filters[filterName])) {
            isAppropriate = true;
          }
        });
        return isAppropriate;
      }
    );

  }, [info, paramsSet]);

  const sortedTickets = useMemo(() =>
      filteredTickets.sort(sortType === 'cheapest' ? sortCheapest : sortFastest),
    [filteredTickets, sortType]
  );


  const getVariant = (type) => sortType === type ? 'primary' : 'light';

  return (
    <Background>
      <StyledContainer>
        <ImageContainer>
          <Image src="../assets/images/plane.svg" alt="plane"/>
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
                checked={paramsSet['all']}
                onChange={handleChange}
              />
              <StyledCheckbox
                type="checkbox"
                label="Без пересадок"
                id="none"
                name="none"
                checked={paramsSet['none']}
                onChange={handleChange}
              />
              <StyledCheckbox
                type="checkbox"
                label="1 пересадка"
                name="one"
                id="one"
                checked={paramsSet['one']}
                onChange={handleChange}
              />
              <StyledCheckbox
                type="checkbox"
                label="2 пересадки"
                name="two"
                id="two"
                checked={paramsSet['two']}
                onChange={handleChange}
              />
              <StyledCheckbox
                type="checkbox"
                label="3 пересадки"
                name="three"
                id="three"
                checked={paramsSet['three']}
                onChange={handleChange}
              />
            </FormGroup>
          </CheckboxContainer>
          <TicketsContainer>
            <ButtonContainer size="lg">
              <StyledButton
                variant={getVariant('cheapest')}
                onClick={() => setSortType('cheapest')}
              >
                Самый дешевый
              </StyledButton>
              <StyledButton
                variant={getVariant('fastest')}
                onClick={() => setSortType('fastest')}
              >
                Самый быстрый
              </StyledButton>
            </ButtonContainer>
            {sortedTickets && sortedTickets.slice(0, 5).map((item, index) => (
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
