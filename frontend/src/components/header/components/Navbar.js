import React from 'react'
import styled from 'styled-components'
import NavLink from './NavLink'
import logo from '../../../assets/img/LPL-Brand.png'


const StyledNavbar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${(props) => props.theme.colors.light};
  height: 100vh;
  text-align: left;
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

    @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
      display:none;
    }
  }

  a {
    font-size: 2rem;
    padding: 1em 1em;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${(props) => props.theme.colors.dark};
    text-decoration: none;
    transition: color 0.3s linear;
    
    @media (max-width: ${(props) => props.theme.sizes.tablet}) {
      font-size: 1.5rem;
      text-align: center;
    }

    @media only screen and (min-width: ${props => props.theme.sizes.desktop}) {
      font-size: 1em;
      margin:0em 1.5em;
    }

    @media only screen and (max-width: ${props => props.theme.sizes.desktop}) {
      font-size: .8em;
    }

    &:hover {
      color: ${(props) => props.theme.colors.light};
      background-color: ${(props) => props.theme.colors.main};
    }
  }
`


const Navbar = ({isOpen}) => {
  return(
    <StyledNavbar isOpen={isOpen}>
      <img src={logo} alt="Laser på landet logo" />
      <NavLink
      key="homeLink"
      linkTo="/"
      linkName="Hem"
       />
       <NavLink
      key="treatmentsLink"
      linkTo="/behandlingar"
      linkName="Behandlingar"
       />
       <NavLink
      key="about"
      linkTo="/om"
      linkName="Om företaget"
       />
       <NavLink
      key="contactLink"
      linkTo="/kontakt"
      linkName="Kontakt"
       />
       <NavLink
      key="blogLink"
      linkTo="/blog"
      linkName="Blog"
       />
    </StyledNavbar>
  )
}

export default Navbar