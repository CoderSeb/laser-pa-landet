import React from 'react'
import styled, { css } from 'styled-components'

const StyledContainer = styled.div`
width: 100%;
min-height: 100vh;
overflow:auto;
padding: 1em;
background-color: #ccd6ff;
  ${({backImgSrc}) => backImgSrc && css`
    background-image: url(${backImgSrc});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  `}
`

const PageContainer = ({backImgSrc, backImgAlt, children}) => {
  return (
    <StyledContainer backImgSrc={backImgSrc} title={backImgAlt}>
      {children}
    </StyledContainer>
    )
}

export default PageContainer
