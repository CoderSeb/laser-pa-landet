import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html, body {
  height: 100%;
}

#root {
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

  &::selection {
      background: ${props => props.theme.colors.accent};
      color: ${props => props.theme.colors.white};
    }
}

/* Works on Firefox */
* {
  scrollbar-width: thick;
  scrollbar-color: ${props => props.theme.colors.accent} ${props => props.theme.colors.secondary};
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 15px;
  margin: 5px;
}

*::-webkit-scrollbar-track {
  background: ${props => props.theme.colors.secondary};
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb {
  background-color: ${props => props.theme.colors.accent};
  border-radius: 10px;
  border: 1px solid  ${props => props.theme.colors.main};
}


body {
min-height:100vh;
}
`

export default GlobalStyle
