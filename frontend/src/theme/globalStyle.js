import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html {
  height: 100%;
}

* {
  -moz-box-sizing: border-box;
  -webkit-kit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Palanquin', sans-serif;
  -webkit-font-smoothing: antialiased;
}
`

export default GlobalStyle