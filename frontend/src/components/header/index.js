import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import Navbar from './components/Navbar'
import Burger from './components/Burger'
import useClickRef from '../../hooks/useClickRef'
import logo from '../../assets/img/LPL-Brand.png'

const StyledHeader = styled.header`
  background-color: ${props => props.theme.colors.light};
  min-height:100px;

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
  const [isOpen, setIsOpen] = useState(false)
  const headerRef = useRef()
  useClickRef(headerRef, () => setIsOpen(false))
  return (
    <StyledHeader ref={headerRef}>
      <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <img className="mainBrand" src={logo} alt="Laser på landet logo" />
    </StyledHeader>
    )
}

export default Header