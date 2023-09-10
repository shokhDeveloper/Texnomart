import { createGlobalStyle, styled } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        scroll-behavior: smooth;
    }
    body{
        margin: 0;
        padding: 0;
    }
    .border-transparent{
        border: 1px solid transparent;
        outline: 1px solid transparent;
    }
    .container{
        max-width: 1500px;
        margin: 0 auto;
        padding: 0 20px;
    } 
    header *{
    margin: 0;
    padding: 0;
    }
    .error{
        color: crimson;
    }

`
export const Button = styled.button`
    padding: 0.5rem 1rem;
    background: ${({type}) => type ===  "yellow" ? "#FBC100": type === "black" ? "#000": type === "light"? "#fff" : "transparent" };
    border: ${({type}) => type === "yellow" ? "1px solid transparent": "1px solid #FBC100"} ;
    color: ${({type}) => type === "black" ? "#fcc200" :"#333333" } ;
    font-size: ${({type}) => type === "yellow" ? "17px": "20px"};
`
export const GoogleBtn = styled.button`
    padding: 0.7rem 2.2rem;
    background: #fff;
    background-size: 30px ;
    background-position: calc(100%);
    background-repeat: no-repeat;
    margin-top: 1rem;
    letter-spacing: 1px;
    padding-left: 0.5rem;
    border: 1px solid #9e9d9d;
    border-radius: 4px;
`