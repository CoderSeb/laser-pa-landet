import React from 'react'
import styled from 'styled-components'
import SocialBar from './components/SocialBar'
import BarContainer from './components/BarContainer'
import fbLogo from '../../assets/img/f_logo_RGB-Hex-Blue_512.webp'
import SocialItem from './components/SocialItem'
import ContactField from './components/ContactField'

const StyledFooter = styled.footer`
  background-color: ${props => props.theme.colors.main};
  position: absolute;
  bottom: 0;
  width: 100%;
  color: ${props => props.theme.colors.black};
  text-align: center;
  box-shadow: 0 0 3px 1px ${props => props.theme.colors.accent};
  margin-top:1em;
  height:9.5rem;
  padding:1rem;

  small {
    position:absolute;
    bottom:5px;
    left:50%;
    transform: translateX(-50%);
    white-space: nowrap;
    user-select: none;
    margin-top:1em;
  }
`

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <StyledFooter>
      <BarContainer>
        <ContactField
          street="Sjörödtorpsvägen 10"
          postal="27297"
          city="Gärsnäs"
        />
        <SocialBar>
          <SocialItem
            title={'Följ oss på Facebook!'}
            linkTo={'https://www.facebook.com/laserpalandet'}
            logo={fbLogo}
            altText={'The facebook \'f\' logo'}
          />
        </SocialBar>
      </BarContainer>
      <small>&copy; Copyright {year} Laser på Landet. All Rights Reserved.</small>
    </StyledFooter>
  )
}

export default Footer
