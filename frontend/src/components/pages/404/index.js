import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledFourOFour = styled.div`
  text-align: center;
  position:absolute;
  top: 0;
  left: 0;
  background: ${props => props.theme.colors.accent};
  height:100vh;
  width: 100vw;
  opacity: 0.9;
  z-index: 150;

  h2 {
    user-select: none;
    transform: translate(0, 20vh);
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1.1em;
  color: white;
  position: absolute;
  top:0;
  left: 50%;
  transform: translate(-50%, 25vh);

  &:hover {
    text-decoration: underline;
  }

  &:active {
    color: black;
  }
`

const FourOFour = () => {
  return (
    <StyledFourOFour>
      <h2>Titta! Här finns ingenting!</h2>
      <StyledLink to="/">Tillbaka till startsidan?</StyledLink>
    </StyledFourOFour>
  )
}

export default FourOFour
