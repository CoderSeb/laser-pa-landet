import React from 'react'
import ContactForm from './components/ContactForm'
import ImageCard from '../../styled/ImageCard'
import profilePic from '../../../assets/img/laser-pa-landet/michaela_profile.jpg'
import styled, { css } from 'styled-components'


const StyledText = styled.div`
  max-width: 45%;
  background: ${props => props.theme.colors.main};
  padding: 1em;
  border-radius: 10px;
  text-align: center;
  user-select: none;

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    max-width: 100%;
    width:100%;
  }
`

const StyledContainer = styled.div`
  width: 100%;
  height: fit-content;
  overflow: auto;
  padding: 1em;
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
    <ImageCard backImgSrc={profilePic} />
     Mottagningen ligger i Sjöröd, vid Gyllebosjöns vackra bokskog på Österlen.<br />Väl mött!
    </StyledText>
    <ContactForm />
    </StyledContainer>
  )
}

export default Contact
