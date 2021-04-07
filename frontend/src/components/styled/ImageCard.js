import React from 'react'
import styled, { css } from 'styled-components'

const StyledContainer = styled.div`
overflow:auto;
margin: 1em;
padding: 1em;
border-radius: 10px;
background-color: gray;
  ${({backImgSrc}) => backImgSrc && css`
    background-image: url(${backImgSrc});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  `}

  ${({portrait}) => portrait && css`
    padding-top: 100%;
  `}

  ${({landscape}) => landscape && css`
    padding-top:62%;
  `}

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
  }

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    margin:1em;
  }

`

const ImageCard = ({backImgSrc, backImgAlt, portrait, landscape, left, right}) => {
  return (
    <StyledContainer
    backImgSrc={backImgSrc}
    title={backImgAlt}
    portrait={portrait}
    landscape={landscape}
    left={left}
    right={right}
    >
    </StyledContainer>
    )
}

export default ImageCard
