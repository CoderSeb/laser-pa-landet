import React from 'react'
import styled from 'styled-components'

import NavButton from './NavLinks'
import NavLinks from './NavLinks'


const StyledHeader = styled.header`
  padding: 0.5rem;
  text-align: center;
  background-color: ${props => props.theme.colors.light};
`

const Header = () => {
  return (
    <StyledHeader>
      <NavLinks />
    </StyledHeader>
    )
}

export default Header