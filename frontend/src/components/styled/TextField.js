import React from 'react'
import styled, { css } from 'styled-components'

const StyledText = styled.div`
  text-align:center;
  padding:1em;
  white-space: normal;
  border-radius: 10px;
  margin: 1em;
  background: ${props => props.theme.colors.mainTransparent};

  ${({left}) => left && css`
    float: left;
    margin: 1em;
  `}

  ${({right}) => right && css`
    float: right;
    margin: 1em;
  `}

  @media only screen and (min-width: ${props => props.theme.sizes.tablet}) {
    ${({width}) => width && css`
    max-width: ${width};
  `}

  ${({height}) => height && css`
    height: ${height};
  `}
  }

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    margin-top:1em;
    margin-left: 0.1em;
    margin-right:0.1em;
  }

  li {
    margin:1em 1.5em;
    display: inline-block;
    font-weight: bold;
  }
`

const TextField = ({ children, left, right, width, height }) => {
  return (
    <StyledText width={width} left={left} right={right} height={height}>
        {children}
    </StyledText>
  )
}

export default TextField
