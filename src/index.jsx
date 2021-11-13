import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components/macro';
// import ProgressBar from "@ramonak/react-progress-bar";
import { GlobalStyle, globalTheme } from './theme/globalStyle';
import Todo from './components/Todo';


ReactDOM.render(
  <ThemeProvider theme={globalTheme}>
    <GlobalStyle />
    <Todo />
    {/* <ProgressBar completed={10} /> */}
  </ThemeProvider>,
  document.getElementById('root'),
);
