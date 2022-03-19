import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
  
  *, *:after, *:before {
    box-sizing: border-box;
  }
  
  html, body {
    padding: 0;
    margin: 0;
    height: 100%;
    font-family: sans-serif;
    font-size: 14px;
    overflow: hidden;
  }
  
  #root {
    height: 100%;
    width: 100%;
    background-color: #ededed;
  }
`;