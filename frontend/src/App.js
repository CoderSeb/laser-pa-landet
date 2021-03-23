import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import Footer from './components/footer'
import Header from './components/header'

const App = () => {
  return (
    <Router>
    <div>
      <Header />
      <Switch>
        <Route path='/home'>

        </Route>
      </Switch>
      <Footer />
    </div>
    </Router>
  )
}

export default App;
