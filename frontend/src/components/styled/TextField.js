import React from 'react'
import styled, { css } from 'styled-components'

const StyledText = styled.div`
  text-align:center;
  padding:1em;
  border-radius: 10px;
  box-shadow: 0 0 5px 1px ${props => props.theme.colors.accent};
  max-width:80%;
  margin: 1em auto;
  background: ${props => props.theme.colors.main};

  ${({left}) => left && css`
    float: left;
    margin: 1em;
  `}

  ${({right}) => right && css`
    float: right;
    margin: 1em;
  `}

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    max-width:90%;
    margin:1em auto;
  }
`

const TextField = ({ children, left, right }) => {
  return (
    <StyledText left={left} right={right}>
    <p>
    {children}
    </p>
    </StyledText>
  )
}

export default TextField;
