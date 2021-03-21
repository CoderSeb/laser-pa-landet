import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background-color: ${props => props.theme.colors.main};
`


const App = () => {
  return (
    <div>
      <Button>This works!</Button>
    </div>
  )
}

export default App;
