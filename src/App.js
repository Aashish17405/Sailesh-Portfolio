import React from 'react';
import Portfolio from './components/Portfolio';
import { Global, css } from '@emotion/react';

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #000000;
    color: white;
  }
`;

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Portfolio />
    </>
  );
}

export default App;
