import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
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
  const [logout, setLogout] = useState(false)

  useEffect(() => {
    if (logout) {
      sessionStorage.removeItem('lpl-admin-token')
    }
  }, [logout])

  const handleLogout = e => {
    e.preventDefault()
    setLogout(true)
  }

  return (
    <>
    {logout ? <Redirect to="/admin" />
    : <StyledContainer>
        <h2>Inloggad som {currentUser.adminName}</h2>
        <button onClick={handleLogout}>Logout</button>
        <BlogEditor />
      </StyledContainer>}
    </>
  )
}

export default Dashboard
