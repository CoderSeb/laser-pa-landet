import React from 'react'
import styled from 'styled-components'


const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto;
  margin-bottom: 20px;
`

const BarContainer = ({children}) => {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
    )
}

export default BarContainer