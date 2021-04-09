import React from 'react'
import styled from 'styled-components'
import BlogEditor from './components/BlogEditor'


const StyledContainer = styled.div`
  background: ${props => props.theme.colors.secondary};
  min-height: 100vh;
  padding-bottom:10rem;
`

const Dashboard = () => {
  return (
    <StyledContainer>
      <h1>Dashboard page</h1>
      <BlogEditor />
    </StyledContainer>
  )
}

export default Dashboard
