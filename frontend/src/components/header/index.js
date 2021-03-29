import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import Navbar from './components/Navbar'
import Burger from './components/Burger'
import useClickRef from '../../hooks/useClickRef'

const StyledHeader = styled.header`
  background-color: ${props => props.theme.colors.light};
  min-height:100px;
`

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const headerRef = useRef()
  useClickRef(headerRef, () => setIsOpen(false))
  return (
    <StyledHeader ref={headerRef}>
      <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
    </StyledHeader>
    )
}

export default Header