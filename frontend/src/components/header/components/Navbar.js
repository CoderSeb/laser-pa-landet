import React from 'react'
import styled from 'styled-components'
import NavLink from './NavLink'


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

  a {
    font-size: 2rem;
    padding: 1em 1em;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${(props) => props.theme.colors.dark};
    text-decoration: none;
    transition: color 0.3s linear;
    
    @media (max-width: ${(props) => props.theme.sizes.mobile}) {
      font-size: 1.5rem;
      text-align: center;
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
      <NavLink
      key="homeLink"
      linkTo="/"
      linkName="Hem"
       />
       <NavLink
      key="treatmentsLink"
      linkTo="/behandingar"
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