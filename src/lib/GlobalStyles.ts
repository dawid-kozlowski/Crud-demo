import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root{
    --background: #0a0a0a;
    --text: #fafafa;
    --text-muted: #a1a1a1;
    --text-dark: #000000;
    --surface: #171717;
    --surface-light-hover: #afafafff;
    --surface-light: #e5e5e5;
    --border: #2e2e2e;
    --border-muted: #202020;
    --balance: #50C878;
    --error: #b91c1c;

    --radius: 26px;
    --radius-button:14px;
    --font-size: 14px;
    --icon-size: 19px;

    color: var(--text);
    font-weight: 600;
    font-size: var(--font-size);
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: var(--background);
}

body{
    display:flex;
    min-height:100vh;
    width:100vw;
    align-items:center;
    justify-content:center;
    margin:0;
    padding:0;
}

button{
    border: none;
    font-weight: bold;
    font-family:'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: var(--font-size);
}

input{
    border:none;
    background-color: var(--surface);
    padding:0;
    font-family:'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: var(--font-size);
    color: var(--text);
}

select{
    text-align: right;
    border: none;
    color: var(--text-muted);
    transition: color 0.2s ease;
    background-color: var(--surface);
    font-family:'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;

    &:hover{
        cursor: pointer;
        color:var(--text);
    }

    &:focus {
        outline: none;
    }
}
`;
