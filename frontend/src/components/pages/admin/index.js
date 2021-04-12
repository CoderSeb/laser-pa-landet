import React from 'react'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'

import useToken from './components/useToken'
import Login from './pages/auth/Login'
import Dashboard from './pages/dashboard'

const Admin = () => {
  const { tokenState, setTokenState, verifyToken } = useToken()
  const isValidToken = verifyToken()
  if (!tokenState || !isValidToken) {
    return <Login setTokenState={setTokenState} />
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/admin">
          <Dashboard currentUser={isValidToken} />
        </Route>
      </Switch>
    </Router>
  )
}

export default Admin
