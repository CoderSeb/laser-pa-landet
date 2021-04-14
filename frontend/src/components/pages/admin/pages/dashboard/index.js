import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import BlogEditor from './components/BlogEditor'
import AddAdmin from './components/AddAdmin'
import ChangePass from './components/ChangePass.js'

const StyledContainer = styled.div`
  background: ${props => props.theme.colors.secondary};
  min-height: 100vh;
  padding-bottom:10rem;
  
  h2 {
    text-align: center;
  }
`

const StyledButton = styled.button`
  padding:.5em;
  font-size: 1.1em;
  outline: none;
  border: none;
  background: ${props => props.theme.colors.secondary};
  border-radius: 10px;
  position: absolute;
  top:8rem;
  right: 2rem;
  box-shadow: -1px -1px 5px 3px ${props => props.theme.colors.secondary};
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.main};
  border: 1px solid ${props => props.theme.colors.main};
  box-shadow: none;
  z-index: 100;

  &:hover {
    border: none;
    background: ${props => props.theme.colors.main};
    box-shadow: -1px -1px 5px 3px ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.black};
    }

  &:active {
    color: ${props => props.theme.colors.main};
    background: ${props => props.theme.colors.black};
    box-shadow: -1px -1px 5px 3px ${props => props.theme.colors.black};
  }

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    left: 0.6rem;
  }
`

const StyledButton02 = styled(StyledButton)`
  position: relative;
  top: auto;
  right: auto;
  margin-left:50%;
  transform: translate(-50%)
`

const Dashboard = ({ currentUser }) => {
  const [logout, setLogout] = useState(false)
  const [showChangePass, setShowChangePass] = useState(false)

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
        <StyledButton onClick={handleLogout}>Logout</StyledButton>
        <BlogEditor />
        <AddAdmin />
        <StyledButton02 type="button" onClick={() => setShowChangePass(prev => !prev)}>Byta lösenord?</StyledButton02>
        {showChangePass && <ChangePass currentUser={currentUser} />}
      </StyledContainer>}
    </>
  )
}

export default Dashboard
