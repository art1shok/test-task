import styled from 'styled-components';
import { Button, ButtonGroup, Container, FormCheck } from 'react-bootstrap';

import { colors } from './Variables.styled';

export const Background = styled.div`
  background-color: ${colors.backgroundColor};
  padding: 50px 0;
`;

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  padding-bottom: 50px;
  margin: 0 auto;
`;

export const Image = styled.img`
  width: 100%;
  max-width: 60px;
  max-height: 60px;
`;

export const FilterContainer = styled.div`
  display: flex;
  margin: 0 auto;
`;

export const CheckboxContainer = styled.div`
  width: 232px;
  max-height: 252px;
  margin-right: 20px;
  padding-top: 22px;
  
  background-color: #fff;
  border-radius: 3px;
`;

export const StyledText = styled.h3`
  margin-left: 22px;
  margin-bottom: 11px;
  font-size: 9px;
  line-height: 9px;
  color: #4a4a4a;
  text-transform: uppercase;
`;

export const StyledCheckbox = styled(FormCheck)`
  padding: 10px 22px 6px;

  :hover {
    background-color: ${colors.secondaryBackgroundColor};
  }
  
  & .form-check-label {
      cursor: pointer;

    font-size: 10px;
    line-height: 10px;
    
    color: ${colors.primaryTextColor};
  }
  
  & .form-check-input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  
  & .form-check-input + .form-check-label {
    display: inline-flex;
    align-items: center;
    user-select: none;

  }
  
  & .form-check-input + .form-check-label::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid ${colors.checkboxBorderColor};
    margin-right: 10px;
    border-radius: 1px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }
  
  & .form-check-input:checked + .form-check-label::before {
    border-color: ${colors.blueColor};
    background-image: url('../assets/images/mark.svg');
  }
  
`;

export const TicketsContainer = styled.div`

`;

export const ButtonContainer = styled(ButtonGroup)`
  margin-bottom: 20px;
`;

export const StyledButton = styled(Button)`
  width: 252px;
  
  && {
    font-size: 10px;
  }
`;
