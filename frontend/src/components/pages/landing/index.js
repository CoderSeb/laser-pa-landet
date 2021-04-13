import React from 'react'
import styled from 'styled-components'
import laserPic1 from '../../../assets/img/laser-pa-landet/neck_laser-landing.jpg'
import Jumbo from './components/Jumbo'

const StyledLanding = styled.div`
  background-color: gray;
  background-image: url(${laserPic1});
  height: 100%;
  min-height: 80vh;
  min-width: 100%;
  filter: saturate(60%);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
