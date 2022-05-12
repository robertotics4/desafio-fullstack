import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --white: #FFFFFF;
    --background: #F2F3F5;
    --titles: #2E384D;
    --placeholders: #B9B9B9;
    --texts: #666666;
    --errors: #e52e4d;
    --success: #33cc95;
    --blue-400: #6933ff;
    --blue-500: #5429cc;
    --blue-900: #363f5f;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }
    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-family: 'Roboto Slab', sans-serif;
    font-weight: 600;
  }

  button {
    cursor: pointer;
    font-weight: 700;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
