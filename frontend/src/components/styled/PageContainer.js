import React from 'react'
import styled, { css } from 'styled-components'

const StyledContainer = styled.div`
width: 100%;
min-height: 100vh;
overflow: inherit;
padding: 1em;
height:100%;
background-color: #ccd6ff;
  ${({backImgSrc}) => backImgSrc && css`
    background-image: url(${backImgSrc});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  `}

  ${({height}) => height && css`
    min-height: ${height};
  `}
`

const PageContainer = ({backImgSrc, backImgAlt, children, height}) => {
  return (
    <StyledContainer backImgSrc={backImgSrc} title={backImgAlt} height={height}>
      {children}
    </StyledContainer>
    )
}

export default PageContainer
