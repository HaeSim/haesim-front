import { css } from '@emotion/react';

const globalStyles = css`
  html,
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    font-size: 16px;
    color: #fff;
  }
  body #__next,
  body main {
    flex: 1 1;
    display: flex;
    flex-direction: column;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  li {
    list-style: none;
  }
  ul {
    padding: 0;
  }
  .MuiModal-backdrop {
    backdrop-filter: blur(2px);
  }
`;

export default globalStyles;
