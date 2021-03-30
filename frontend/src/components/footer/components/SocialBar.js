import React from 'react'
import styled from 'styled-components'


const StyledList = styled.ul`
  background-color: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.dark};
  text-align: center;
  list-style: none;
  align-self: auto;
`

const SocialBar = ({children}) => {
  return (
    <StyledList>
      {children}
    </StyledList>
    )
}

export default SocialBar