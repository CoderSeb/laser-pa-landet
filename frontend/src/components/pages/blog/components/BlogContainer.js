import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  background: inherit;
  border-radius: 10px;
  padding: 1em;
  margin: 0.5em auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: center-top;
  max-width:100%;
  gap: 1em;
  height:auto;
`

const BlogContainer = ({children}) => {

  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  )
}

export default BlogContainer
