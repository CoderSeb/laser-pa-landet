import styled from 'styled-components'
import {Link} from 'react-router-dom'

const NavLinksContainer = styled.ul`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
`

const NavLink = styled(Link)`
  background-color: ${props => props.theme.colors.light};
  padding:0.5em 1em;
  color:${props => props.theme.colors.dark};
  border-radius:42px;
  display:inline-block;
  cursor:pointer;
  text-decoration:none;
  margin:1rem;
  font-size: 1.1em;
  transition: 0.2s ease-in-out;
  text-shadow:0px 1px 0px ${props => props.theme.colors.dark};

  &:hover {
    box-shadow: 0px 0px 3px 1px ${props => props.theme.colors.main};
    background: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.light};
    text-shadow:0px 1px 0px ${props => props.theme.colors.dark};
  }

  &:active {
    background: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.light};
    box-shadow: 0px 0px 5px 1px ${props => props.theme.colors.dark};
  }
`

export const links = ['om', 'behandlingar', 'kontakt', 'blog']
function checkLink(link) {
  link === 'om' ? link = 'om företaget' : link = link
  return link.charAt(0).toUpperCase() + link.slice(1)
}


const NavLinks = () => {
  return (
    <NavLinksContainer>
    <li key="hem">
      <NavLink to="/" className="navLink">Hem</NavLink>
    </li>
    {links.map(link => (
      <li key={link}>
        <NavLink to={`/${link}`} className="navLink">{checkLink(link)}</NavLink>
      </li>
    ))}
    </NavLinksContainer>
  )
}

export default NavLinks