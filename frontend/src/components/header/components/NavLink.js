import styled from 'styled-components'
import {Link} from 'react-router-dom'

const StyledNavLink = styled(Link)`
  white-space: nowrap;
  user-select: none;
  background-color: ${props => props.theme.colors.light};
  padding:0.5em 1em;
  color:${props => props.theme.colors.dark};
  border-radius:42px;
  display:inline-block;
  cursor:pointer;
  text-decoration:none;
  margin:1rem;
  font-size: 1.1em;
  transition: 0.1s ease;
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

const NavLink = ({linkTo, linkName}) => {
  return (
    <StyledNavLink to={linkTo} className="navLink">{linkName}</StyledNavLink>
  )
}

export default NavLink