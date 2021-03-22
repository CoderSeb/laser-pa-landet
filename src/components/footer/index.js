import React from 'react'
import styled from 'styled-components'

import NavList from './components/navlist'

const StyledFooter = styled.footer`
  background-color: ${props => props.theme.colors.main};
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 2rem;
  color: ${props => props.theme.colors.secondary};
  text-align: center;
`

const Footer = () => {
  return (
    <StyledFooter>
      <NavList />
    </StyledFooter>
    )
}

export default Footer