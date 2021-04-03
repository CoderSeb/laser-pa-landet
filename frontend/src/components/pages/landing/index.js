import React from 'react'
import TextField from '../../styled/TextField'
import PageContainer from '../../styled/PageContainer'
import landingImg from '../../../assets/img/stockphoto/woman-receiving-laser-therapy.jpg&size=1024.jpg'

const Landing = () => {
  return (
    <PageContainer backImgSrc={landingImg} pageImgAlt="Image of a woman receiving laser therapy.">
    <TextField width="50%" left>
    <h2>Hej!<br /></h2>
    <h4>Mitt namn är Michaela Blomquist och jag är laserterapeut, utbildad vid Sjöbo laserklinik. Till vardags arbetar jag som personalchef inom kollektivtrafiken och har min mottagning som deltidssysselsättning. Jag har min mottagning på min gård i Sjöröd, vid Gyllebosjöns vackra bokskog på Österlen.<br />Väl mött!</h4>
    </TextField>
    </PageContainer>
  )
}

export default Landing
