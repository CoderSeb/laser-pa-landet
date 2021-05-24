import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
overflow:auto;
margin: 1em;
  img {
    width: 100%;
    border-radius: 10px;

    @media only screen and (min-width: ${props => props.theme.sizes.tablet}) {
      width: 65%;
    }
  }
`

const ImageCard = ({backImgSrc, backImgAlt}) => {
  return (
    <StyledContainer
    >
    <img src={backImgSrc} alt={backImgAlt}/>
    </StyledContainer>
    )
}

export default ImageCard
