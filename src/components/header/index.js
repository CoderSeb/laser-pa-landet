import React from 'react'
import styled from 'styled-components'

import Button from '../styled/Button'

const StyledHeader = styled.header`
  padding: 1rem;
  text-align: center;
  background-color: ${props => props.theme.colors.light};
`

const Header = () => {
  return (
    <StyledHeader>
      <Button>A button</Button>
    </StyledHeader>
    )
}

export default Header