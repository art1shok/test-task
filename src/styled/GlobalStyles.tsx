import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after { 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  input {
    outline: none;
  }
  
  button {
    outline: none;
    border: none;
  }  
`;

export default GlobalStyles;
