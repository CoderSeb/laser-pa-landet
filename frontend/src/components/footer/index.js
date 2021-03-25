import React from 'react'
import styled from 'styled-components'



const StyledFooter = styled.footer`
  background-color: ${props => props.theme.colors.light};
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 2rem;
  color: ${props => props.theme.colors.dark};
  text-align: center;
`

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <StyledFooter>
      <small>&copy; Copyright {year} Laser på Landet. All Rights Reserved.</small>
    </StyledFooter>
    )
}

export default Footer