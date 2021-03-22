import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html {
  height: 100%;
}

@font-face {
  font-family: 'Palanquin';
  src: local('Palanquin'), url(../fonts/Palanquin-Regular.ttf) format('truetype');
  }

* {
  font-family: Palanquin, serif;
  margin: 0;
  padding: 0;
  border: 0;
}
`

export default GlobalStyle