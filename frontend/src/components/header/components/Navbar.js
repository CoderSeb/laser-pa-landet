import React from 'react'
import styled from 'styled-components'
import logo from '../../../assets/img/LPL-Brand.png'
import { Link } from 'react-router-dom'

const StyledNavbar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: start;
  background: inherit;
  text-align: center;
  padding: 1rem;
  height:100%;
  padding-top: 15rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  
  @media (max-width: ${props => props.theme.sizes.mobile}) {
    width: 100%;
    padding-top: 5rem;
  }

  @media (max-width: 1100px;) and (max-height: 500px;) {
    padding-top: 5rem;
  }

  @media only screen and (min-width: ${props => props.theme.sizes.tablet}) {
    position:relative;
    width:100%;
    display:inline-block;
    float:left;
    transform: none;
    text-align: center;
    max-height:6rem;
    padding-top: 1rem;
  }

  .logoLink {
    @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
      display:none;
    }
  }

  img {
    height:60px;
    margin: 1em;
    float:left;
    user-select: none;

    @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
      display:none;
    }
  }
`


const Navbar = ({isOpen, children}) => {
  return (
    <StyledNavbar isOpen={isOpen}>
      <Link className="logoLink" to="/"><img src={logo} alt="Laser på landet logo" /></Link>
      {children}
    </StyledNavbar>
  )
}

export default Navbar
