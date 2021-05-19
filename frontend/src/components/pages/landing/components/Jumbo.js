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
    height: 200px;
  }

  @media only screen and (max-width: ${props => props.theme.sizes.mobile}) {
    font-size: 0.8em;
    height: 220px;
    top:12%;
  }

  @media only screen and (max-width: ${props => props.theme.sizes.smallMobile}) {
    font-size: 0.7em;
    height: 220px;
  }

  @media only screen and (max-width: 290px;) {
    font-size: 0.6em;
    height: 240px;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  color: ${props => props.theme.colors.main};
  font-size: 1.3em;
  transition: all 0.1s ease;
  padding: 0em 1em;
  border-radius: 6px;
  background: ${props => props.theme.colors.accent};

  &:hover {
    text-decoration: underline;
    color: ${props => props.theme.colors.accent};
    background: ${props => props.theme.colors.main};

  }

  &:active {
    background: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.main};
  }

  &:focus {
    background: ${props => props.theme.colors.black};
    color: ${props => props.theme.colors.main};       
  }
`


const Jumbo = () => {
  return (
    <StyledJumbo>
      <h2>Välkommen till Laser på Landet!</h2>
      <h1>Boka Ditt besök hos oss <strong>idag</strong> och bli av med Din värk!</h1>
      <StyledLink to="/behandlingar">Läs mer här &gt;</StyledLink>
    </StyledJumbo>
  )
}

export default Jumbo
