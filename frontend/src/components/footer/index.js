import React from 'react'
import styled from 'styled-components'
import SocialBar from './components/SocialBar'
import BarContainer from './components/BarContainer'
import fbLogo from '../../assets/img/f_logo_RGB-Hex-Blue_512.webp'
import SocialItem from './components/SocialItem'

const StyledFooter = styled.footer`
  background-color: ${props => props.theme.colors.light};
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 2rem;
  color: ${props => props.theme.colors.dark};
  text-align: center;

  small {
    position:absolute;
    bottom:5px;
    left:50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }
`

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <StyledFooter>
    <BarContainer>
      <SocialBar>
        <SocialItem
          title={"Följ oss på Facebook!"}
          linkTo={"https://www.facebook.com/laserpalandet"}
          logo={fbLogo}
          altText={"The facebook 'f' logo"}
         />
      </SocialBar>
    </BarContainer>
      <small>&copy; Copyright {year} Laser på Landet. All Rights Reserved.</small>
    </StyledFooter>
    )
}

export default Footer