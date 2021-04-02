import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'

import theme from './theme/theme'
import GlobalStyle from './theme/globalStyle'
import App from './App'

const root = document.getElementById('root')

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
  root
)
