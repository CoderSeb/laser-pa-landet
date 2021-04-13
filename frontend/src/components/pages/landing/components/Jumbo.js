import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'


const StyledJumbo = styled.div`
  width:100%;
  background-color: rgba(204, 214, 255, 0.9);
  text-align:center;
  padding: 2rem;
  font-size: 1.3em;
  position:absolute;
  top:20%;
  left: 50%;
  transform: translate(-50%);
  user-select:none;
  height: 240px;

  @media only screen and (max-width: ${props => props.theme.sizes.desktop}) {
    font-size: 1.1em;
  }

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    font-size: 0.9em;
    top: 15%;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: ${props => props.theme.colors.main};
  transition: all 0.3s ease;
  text-shadow: 1px 2px 7px ${props => props.theme.colors.accent};

  &:hover {
    font-size: 1.5em;
  }

  &:active {
    color: ${props => props.theme.colors.main};
  }
`


const Jumbo = () => {
  return (
    <StyledJumbo>
      <h2>Välkommen till Laser på Landet!</h2>
      <h1>Boka Ditt besök hos oss <strong>idag</strong> och bli av med Din värk!</h1>
      <StyledLink to="/om">Läs mer här</StyledLink>
    </StyledJumbo>
  )
}

export default Jumbo
