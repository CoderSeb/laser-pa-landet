import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import Navbar from './components/Navbar'
import Burger from './components/Burger'
import NavLink from './components/NavLink'
import useClickRef from '../../hooks/useClickRef'
import logo from '../../assets/img/LPL-Brand.png'

const StyledHeader = styled.header`
  background-color: ${props => props.theme.colors.main};
  min-height:100px;
  overflow:hidden;
  box-shadow: 0 0 3px 1px ${props => props.theme.colors.accent};

  .mainBrand {
    height:60px;
    margin: 1em;
    float:right;

    @media only screen and (min-width: ${props => props.theme.sizes.tablet}) {
      display:none;
    }
  }
`

const Header = () => {
  const [
isOpen,
setIsOpen
] = useState(false)
  const headerRef = useRef()
  useClickRef(
headerRef,
() => setIsOpen(false)
)
  return (
    <StyledHeader ref={headerRef}>
      <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen}>
        <NavLink
          linkTo="/"
          linkName="Hem"
        />
        <NavLink
          linkTo="/behandlingar"
          linkName="Behandlingar"
        />
        <NavLink
          linkTo="/om"
          linkName="Om företaget"
        />
        <NavLink
          linkTo="/kontakt"
          linkName="Kontakt"
        />
        <NavLink
          linkTo="/blog"
          linkName="Blog"
        />
      </Navbar>
      <img className="mainBrand" src={logo} alt="Laser på landet logo" />
    </StyledHeader>
  )
}

export default Header
