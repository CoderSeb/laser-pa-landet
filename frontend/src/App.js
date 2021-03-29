import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import Footer from './components/footer'
import Header from './components/header'

import Landing from './components/pages/landing'
import About from './components/pages/about'
import Treatments from './components/pages/treatments'
import Contact from './components/pages/contact'
import Blog from './components/pages/blog'
import Admin from './components/pages/admin'

const App = () => {
  return (
    <Router>
    <div>
      <Header />
      <Switch>
        <Route path='/blog'>
          <Blog />
        </Route>
        <Route path='/kontakt'>
          <Contact />
        </Route>
        <Route path='/behandlingar'>
          <Treatments />
        </Route>
        <Route path='/om'>
          <About />
        </Route>
        <Route path='/admin'>
          <Admin />
        </Route>
        <Route path='/'>
          <Landing />
        </Route>
        
      </Switch>
      <Footer />
    </div>
    </Router>
  )
}

export default App;
