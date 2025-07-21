import { Global, css } from '@emotion/react';

export const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        font-size: 16px;
        line-height: 1.5;
      }

      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f8f9fa;
        color: #333;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      h1, h2, h3, h4, h5, h6 {
        font-weight: 600;
        line-height: 1.2;
        margin-bottom: 0.5rem;
      }

      p {
        margin-bottom: 1rem;
      }

      button {
        cursor: pointer;
        border: none;
        outline: none;
        font-family: inherit;
      }

      input, textarea, select {
        font-family: inherit;
        font-size: inherit;
      }

      a {
        color: #007bff;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
    `}
  />
); 