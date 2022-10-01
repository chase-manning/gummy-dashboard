import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --bg: white;
        --main: #3c3c3c;
        --sub: #999;
        --border: #e5e5e5;
        --primary: #E7A2BF;
        --primary-light: #f8e3eb;
        --primary-dark: #cf7da0;
        --error: red;
        --plain: #FFFFFF;
        --plain-shadow: #E7E4E7;
        --plain-dark: #817D82;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-size: 10px;
        color: var(--main);
        font-family: 'Roboto', sans-serif;
        line-height: 1;
    }

    button {
        background: none;
        border: none;
        outline: none;
    }
    
    input {
        border: none;
        outline: none;
    }

    a {
        text-decoration: none;
    }
`;

const GlobalStyles = (): JSX.Element => {
  return <GlobalStyle />;
};

export default GlobalStyles;
