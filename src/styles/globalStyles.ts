import { css } from '@emotion/react';

const globalStyles = css`
  html,
  body {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    font-size: 16px;
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
  /* scroll bar가 영역을 차지하지 않고, 투명하게 보이도록 설정 */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

export default globalStyles;
