import React from 'react'
import ContactForm from './components/ContactForm'
import ImageCard from '../../styled/ImageCard'
import profilePic from '../../../assets/img/laser-pa-landet/neck_laser.jpg'
import styled, { css } from 'styled-components'


const StyledText = styled.div`
  max-width: 45%;
  background: ${props => props.theme.colors.main};
  padding: 1em;
  border-radius: 10px;
  text-align: center;

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    max-width: 100%;
    width:100%;
  }
`

const StyledContainer = styled.div`
  width: 100%;
  min-height: 80vh;
  overflow: auto;
  padding: 1em;
  padding-bottom: 3rem;
  display: flex;
  background-color: #ccd6ff;
  justify-content: center;
  gap: 1em;
  ${({backImgSrc}) => backImgSrc && css`
    background-image: url(${backImgSrc});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  `}

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    flex-direction: column;
  }
`


const Contact = () => {
  return (
    <StyledContainer>
    <StyledText>
    <h2>Hej!</h2>
    Mitt namn är Michaela Blomquist och jag är laserterapeut, utbildad vid Sjöbo laserklinik. Till vardags arbetar jag som personalchef inom kollektivtrafiken och har min mottagning som deltidssysselsättning.
    <ImageCard portrait backImgSrc={profilePic} />
    Jag har min mottagning på min gård i Sjöröd, vid Gyllebosjöns vackra bokskog på Österlen.<br />Väl mött!
    </StyledText>
    <ContactForm />
    </StyledContainer>
  )
}

export default Contact
