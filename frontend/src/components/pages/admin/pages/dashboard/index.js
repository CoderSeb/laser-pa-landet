import React from 'react'
import styled from 'styled-components'
import BlogEditor from './components/BlogEditor'


const StyledContainer = styled.div`
  background: ${props => props.theme.colors.secondary};
  min-height: 100vh;
  padding-bottom:10rem;
  
  h2 {
    text-align: center;
  }
`

const Dashboard = ({ currentUser }) => {

  return (
    <StyledContainer>
      <h2>Inloggad som {currentUser.adminName}</h2>
      <BlogEditor />
    </StyledContainer>
  )
}

export default Dashboard
