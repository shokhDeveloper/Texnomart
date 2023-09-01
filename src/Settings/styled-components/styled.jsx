import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    body{
        margin: 0;
        padding: 0;
    }
    .container{
        max-width: 1500px;
        margin: 0 auto;
        padding: 0 20px;
    } 
`
