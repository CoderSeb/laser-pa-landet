import React from 'react'
import styled from 'styled-components'

const StyledItem = styled.li`
  font-size:1em;

  img {
    height:1em;
    transform: translateY(0.1em)
  }

  a {
    text-decoration: none;
    background-color: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.dark};
    user-select: none;
  &:hover {
    font-weight:bold;
  }
  &:active {
    color: ${props => props.theme.colors.main};
  }
  }
`

const SocialItem = ({linkTo, logo, altText, title}) => {
  return (
    <StyledItem>
        <a href={linkTo} target="_blank" rel="noreferrer"><img src={logo} alt={altText} /> {title}</a>
    </StyledItem>
    )
}

export default SocialItem


