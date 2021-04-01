import React from 'react'
import styled from 'styled-components'

const StyledText = styled.div`
  background: ${props => props.theme.colors.main};
  text-align:center;
  padding:1em;
  margin:1em;
  border-radius: 10px;
  box-shadow: 0 0 5px 1px ${props => props.theme.colors.accent};
  max-width:60%;
  float: right;

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    max-width:90%;
    margin:1em auto;
    float: initial;
  }
`

const TextField = ({children, sidePos}) => {
  return (
    <StyledText>
    <p>
    {children}
    </p>
    </StyledText>
  )
}

export default TextField;
