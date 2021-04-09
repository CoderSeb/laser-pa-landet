import React from 'react'
import PageContainer from '../../styled/PageContainer'
import ImageCard from '../../styled/ImageCard'
import laserPic1 from '../../../assets/img/laser-pa-landet/neck_laser.jpg'
import Jumbo from './components/Jumbo'

const Landing = () => {
  return (
    <PageContainer>
    <Jumbo />
    <ImageCard backImgSrc={laserPic1} portrait />
    </PageContainer>
  )
}

export default Landing
