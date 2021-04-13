import React from 'react'
import styled, { css } from 'styled-components'

const StyledContainer = styled.div`
width: 100%;
min-height: 80vh;
overflow: auto;
padding: 1em;
height: fit-content;
background-color: #ccd6ff;
  ${({backImgSrc}) => backImgSrc && css`
    background-image: url(${backImgSrc});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  `}

  ${({backColor}) => backColor && css`
    background-color: ${backColor};
  `}

  ${({height}) => height && css`
    min-height: ${height};
  `}
`

const PageContainer = ({backImgSrc, backImgAlt, children, height, backColor}) => {
  return (
    <StyledContainer backColor={backColor} backImgSrc={backImgSrc} title={backImgAlt} height={height}>
      {children}
    </StyledContainer>
    )
}

export default PageContainer
