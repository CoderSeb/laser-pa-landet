import React from 'react'
import styled from 'styled-components'


const StyledList = styled.ul`
  background-color: inherit;
  color: ${props => props.theme.colors.black};
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
