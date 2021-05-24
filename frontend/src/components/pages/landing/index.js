import React from 'react'
import styled from 'styled-components'
import laserPic1 from '../../../assets/img/laser-pa-landet/neck_laser-landing.jpg'
import Jumbo from './components/Jumbo'

const StyledLanding = styled.div`
  height: calc(100vh - 20rem);
  background-color: gray;
  background-image: url(${laserPic1});
  filter: saturate(60%);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media only screen and (max-width: ${props => props.theme.sizes.mobile}) {
    height: calc(100vh - 18rem);
  }
`


const Landing = () => {
  return (
    <>
    <StyledLanding>
    </StyledLanding>
    <Jumbo />
    </>
  )
}

export default Landing
