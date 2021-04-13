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
  const handleLogout = e => {
    e.preventDefault()
    sessionStorage.removeItem('lpl-admin-token')
    window.location.reload()
  }
  return (
    <StyledContainer>
      <h2>Inloggad som {currentUser.adminName}</h2>
      <button onClick={handleLogout}>Logout</button>
      <BlogEditor />
    </StyledContainer>
  )
}

export default Dashboard
