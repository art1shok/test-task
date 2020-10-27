import React, { useCallback, useEffect, useMemo } from 'react';
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

import plane from '../../assets/images/plane.svg';

import { FormGroup } from 'react-bootstrap';
import Ticket from '../Ticket/Ticket';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectTicketsInfo } from '../../store/selectors';
import { getSearchId } from '../../store/flights';

const FlightTable = () => {

  const history = useHistory();
  const info = useSelector(selectTicketsInfo);
  const dispatch = useDispatch();

  const paramsArr = useMemo(() => {
    return history.location.search !== ''
      ? history.location.search.substring(1)
        .split('&')
        .filter(item => item !== '')
      : [];
  }, [history.location.search]);

  useEffect(() => {
    dispatch(getSearchId());
  }, [dispatch]);

  const handleChange = useCallback((e) => {
    const { name } = e.target;
    let queryString = '?';

    const foundIndex = paramsArr.findIndex(item => item === name);
    if (foundIndex === -1) {
      queryString += `${name}&`;
    }
    paramsArr.forEach((item, index) => {
      if (index !== foundIndex) {
        queryString += `${item}&`;
      }
    });

    history.push({
      pathname: '/',
      search: queryString
    });
  }, [history, paramsArr]);

  if(info) {
    console.log(info);
  }

  return (
    <Background>
      <StyledContainer>
        <ImageContainer>
          <Image src={plane} alt="plane"/>
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
                name='all'
                onChange={handleChange}
              />
              <StyledCheckbox
                type="checkbox"
                label="Без пересадок"
                id="none"
                name="none"
                onChange={handleChange}
              />
              <StyledCheckbox
                type="checkbox"
                label="1 пересадка"
                name="one"
                id="one"

                onChange={handleChange}
              />
              <StyledCheckbox
                type="checkbox"
                label="2 пересадки"
                name="two"
                id="two"
                onChange={handleChange}
              />
              <StyledCheckbox
                type="checkbox"
                label="3 пересадки"
                name="three"
                id="three"
                onChange={handleChange}
              />
            </FormGroup>
          </CheckboxContainer>
          <TicketsContainer>
            <ButtonContainer size="lg">
              <StyledButton variant="primary">
                Самый дешевый
              </StyledButton>
              <StyledButton variant="light">
                Самый быстрый
              </StyledButton>
            </ButtonContainer>
            {/*here should be map of tickets*/}
            <Ticket/>
            <Ticket/>
            <Ticket/>
            <Ticket/>
            <Ticket/>
          </TicketsContainer>
        </FilterContainer>
      </StyledContainer>
    </Background>
  );
};

export default FlightTable;
