import React from 'react'
import styled from 'styled-components'

const StyledList = styled.ul`
  color: ${props => props.theme.colors.secondary};
  list-style-type: none;
`



const NavList = () => {
  return (
    <StyledList>
      <li>This is a list item</li>
    </StyledList>
    )
}

export default NavList