import React, { lazy, Suspense } from 'react'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import styled from 'styled-components'
import Footer from './components/footer'
import Header from './components/header'

const Landing = lazy(() => import('./components/pages/landing'))
const Treatments = lazy(() => import('./components/pages/treatments'))
const Admin = lazy(() => import('./components/pages/admin'))
const Contact = lazy(() => import('./components/pages/contact'))
const Blog = lazy(() => import('./components/pages/blog'))
import FourOFour from './components/pages/404'


const StyledFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow:5;
  width:100%;
  height:100%;

  Header {
    order:1
  }

  Footer {
    order: 3;
  }
`

const StyledWrapper = styled.div`
order:2;
flex: 5  1 auto;
padding-bottom:9.5rem;
`

const App = () => {

  return (
    <Router>
      <StyledFlexBox>
        <Header />
        <Suspense fallback={<div>Laddar...</div>}>
        <StyledWrapper>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/blog">
            <Blog />
          </Route>
          <Route exact path="/kontakt">
            <Contact />
          </Route>
          <Route exact path="/behandlingar">
            <Treatments />
          </Route>
          <Route exact path="/admin" component={Admin}>
          </Route>
          <Route render={() => <FourOFour />} />
        </Switch>
        </StyledWrapper>
        </Suspense>
        <Footer />
        </StyledFlexBox>
    </Router>
  )
}

export default App
