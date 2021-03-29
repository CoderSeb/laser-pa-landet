import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {
  BrowserRouter as Router
} from 'react-router-dom'


import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Dashboard from './pages/dashboard'

const Admin = () => {
  return (
    <Router>
    <Switch>
      <Route path='/admin/login'>
        <Login />
      </Route>
      <Route path='/admin/signup'>
        <SignUp />
      </Route>
      <Route path='/admin/dashboard'>
        <Dashboard />
      </Route>
      <Route path='/'>
      <div>
        <h1>Admin page</h1>
      </div>
      </Route>
    </Switch>
    </Router>
    
  )
}

export default Admin;
