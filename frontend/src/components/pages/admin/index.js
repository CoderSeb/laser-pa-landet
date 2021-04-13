import React, { useState, useEffect } from 'react'

import useToken from './components/useToken'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard'

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const { tokenState, setTokenState, verifyToken } = useToken()
  const isValidToken = verifyToken()

  useEffect(() => {
    if (!tokenState || !isValidToken) {
      setLoggedIn(false)
    } else {
      setTimeout(() => {
        setLoggedIn(true)
      }, 1500)
    }
  }, [tokenState, isValidToken])

  return (
    <>
      {loggedIn ? <Dashboard currentUser={isValidToken} /> : <Login setTokenState={setTokenState} />}
    </>
  )
}

export default Admin
