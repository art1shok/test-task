import React from 'react';
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
} from './FlightTable.styled';

import plane from '../../assets/images/plane.svg';

import { FormGroup } from 'react-bootstrap';
import Ticket from '../Ticket/Ticket';

const FlightTable = () => {
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
              <StyledCheckbox type="checkbox" label="Все" id="all"/>
              <StyledCheckbox type="checkbox" label="Без пересадок" id="none"/>
              <StyledCheckbox type="checkbox" label="1 пересадка" id="one"/>
              <StyledCheckbox type="checkbox" label="2 пересадки" id="two"/>
              <StyledCheckbox type="checkbox" label="3 пересадки" id="three"/>
            </FormGroup>
          </CheckboxContainer>
          <TicketsContainer >
            <ButtonContainer size="lg" >
              <StyledButton variant="primary">
                Самый дешевый
              </StyledButton>
              <StyledButton variant="light">
                Самый быстрый
              </StyledButton>
            </ButtonContainer>
            {/*here should be map of tickets*/}
            <Ticket />
            <Ticket />
            <Ticket />
            <Ticket />
            <Ticket />
          </TicketsContainer>
        </FilterContainer>
      </StyledContainer>
    </Background>
  );
};

export default FlightTable;
