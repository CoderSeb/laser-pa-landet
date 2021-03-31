import React from 'react'
import styled from 'styled-components'
import logo from '../../../assets/img/LPL-Brand.png'


const StyledNavbar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${(props) => props.theme.colors.light};
  height: 100vh;
  text-align: center;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  
  @media (max-width: ${(props) => props.theme.sizes.mobile}) {
    width: 100%;
  }

  @media only screen and (min-width: ${props => props.theme.sizes.tablet}) {
    position:relative;
    min-height:100px;
    width:100%;
    display:inline-block;
    float:left;
    transform: none;
    text-align: center;
    margin-bottom: 1em;
    max-height:150px;
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
  return(
    <StyledNavbar isOpen={isOpen}>
      <img src={logo} alt="Laser på landet logo" />
      {children}
    </StyledNavbar>
  )
}

export default Navbar