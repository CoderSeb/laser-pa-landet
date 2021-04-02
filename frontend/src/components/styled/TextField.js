import React from 'react'
import styled, { css } from 'styled-components'

const StyledText = styled.div`
  text-align:center;
  padding:1em;
  white-space: normal;
  border-radius: 10px;
  box-shadow: 0 0 5px 1px ${props => props.theme.colors.accent};
  margin: 1em;
  background: ${props => props.theme.colors.main};

  ${({left}) => left && css`
    float: left;
    margin: 1em;
  `}

  ${({right}) => right && css`
    float: right;
    margin: 1em;
  `}

  ${({width}) => width && css`
    max-width: ${width};
  `}

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    margin:1em;
  }
`

const TextField = ({ children, left, right, width }) => {
  return (
    <StyledText width={width} left={left} right={right}>
      <p>
        {children}
      </p>
    </StyledText>
  )
}

export default TextField
