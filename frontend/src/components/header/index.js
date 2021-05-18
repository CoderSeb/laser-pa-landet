import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import Navbar from './components/Navbar'
import Burger from './components/Burger'
import NavLink from './components/NavLink'
import useClickRef from '../../hooks/useClickRef'
import logo from '../../assets/img/LPL-Brand.png'

const StyledHeader = styled.header`
  background-color: ${props => props.theme.colors.main};
  height:7rem;
  overflow:hidden;
  z-index: 100;

  .logolink {
    padding: 3rem;
    z-index:150;
  }

  @media only screen and (max-width: ${props => props.theme.sizes.mobile}) {
      height: 6rem;
  }

  .mainBrand {
    height:60px;
    max-width: 50%;
    margin: 1em;
    float:right;

    @media only screen and (min-width: ${props => props.theme.sizes.tablet}) {
      display:none;
    }

    @media only screen and (max-width: ${props => props.theme.sizes.mobile}) {
      height: 40px;
      margin-top: 2em;
    }
  }
`

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const headerRef = useRef()

  useClickRef(headerRef, () => setIsOpen(false))

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
          linkTo="/kontakt"
          linkName="Kontakt"
        />
        <NavLink
          linkTo="/blog"
          linkName="Blog"
        />
      </Navbar>
      <a href="/" className="logolink"><img className="mainBrand" src={logo} alt="Laser på landet logo" /></a>
    </StyledHeader>
  )
}

export default Header
