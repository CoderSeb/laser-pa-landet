import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Burger from './components/Burger'
import NavLink from './components/NavLink'
import useClickRef from '../../hooks/useClickRef'
import logo from '../../assets/img/LPL-Brand.png'

const StyledHeader = styled.header`
  background-color: ${props => props.theme.colors.main};
  height:8rem;
  overflow:hidden;

  .logolink {
    padding: 3rem;
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

  const clicked = () => {
    setTimeout(() => {
      setIsOpen(false)
    }, 300)
  }

  return (
    <StyledHeader ref={headerRef}>
      <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen}>
        <NavLink
          linkTo="/"
          linkName="Hem"
          clicked={clicked}
        />
        <NavLink
          linkTo="/behandlingar"
          linkName="Behandlingar"
          clicked={clicked}
        />
        <NavLink
          linkTo="/kontakt"
          linkName="Kontakt"
          clicked={clicked}
        />
        <NavLink
          linkTo="/blog"
          linkName="Blog"
          clicked={clicked}
        />
      </Navbar>
      <Link to="/" className="logoLink"><img className="mainBrand" src={logo} alt="Laser på landet logo" /></Link>
    </StyledHeader>
  )
}

export default Header
