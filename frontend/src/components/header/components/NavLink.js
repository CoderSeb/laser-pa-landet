import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

const StyledNavLink = styled(NavLink)`
  white-space: nowrap;
  user-select: none;
  background-color: inherit;
  padding:0.5em 1em;
  color:${props => props.theme.colors.black};
  border-radius:42px;
  display:inline-block;
  cursor:pointer;
  font-size: 1.1em;
  outline:none;
  transition: 0.1s ease;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 0.5rem;
  text-decoration: none;
  transition: color 0.3s linear;
  text-align:center;
  margin:1em 1.5em;
  
  @media (max-width: ${(props) => props.theme.sizes.tablet}) {
    font-size: 1.5rem;
    text-align: center;
  }

  @media only screen and (min-width: ${props => props.theme.sizes.desktop}) {
    font-size: 1em;
  }

  @media only screen and (max-width: ${props => props.theme.sizes.desktop}) {
    font-size: .8em;
  }

  &:hover {
    box-shadow: 0px 0px 3px 1px ${props => props.theme.colors.accent};
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.white};
    text-shadow:0px 1px 0px ${props => props.theme.colors.black};
  }

  &:active {
    background: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.white};
    box-shadow: 0px 0px 5px 1px ${props => props.theme.colors.black};
  }

  .onPage {
    opacity:0.5;
  }
`

const CustomNavLink = ({linkTo, linkName}) => {
  return (
    <StyledNavLink activeClassName="onPage" to={linkTo}>{linkName}</StyledNavLink>
  )
}

export default CustomNavLink