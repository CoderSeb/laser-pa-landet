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
  min-height: 100vh;
  gap: 1em;
  height: max-content;
`

const BlogContainer = ({children}) => {

  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  )
}

export default BlogContainer
