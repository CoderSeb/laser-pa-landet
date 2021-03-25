import React from 'react'
import styled from 'styled-components'

import NavLinks from './components/NavLinks'


const StyledHeader = styled.header`
  padding: 0.5rem;
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