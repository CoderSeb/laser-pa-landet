import React from 'react'
import TextField from '../../styled/TextField'
import PageContainer from '../../styled/PageContainer'
import landingImg from '../../../assets/img/stockphoto/woman-receiving-laser-therapy.jpg&size=1024.jpg'

const Landing = () => {
  return (
    <PageContainer backImgSrc={landingImg} pageImgAlt="Image of a woman receiving laser therapy.">
    <TextField>
      <h1>Welcoem!</h1>
    </TextField>
    </PageContainer>
  )
}

export default Landing
