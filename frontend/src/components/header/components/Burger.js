import React from 'react'
import styled from 'styled-components'

const StyledBurgerButton = styled.button`
  position: absolute;
  top: 50px;
  left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 120;
  
  &:focus {
    outline: none;
  }

  @media only screen and (min-width: ${props => props.theme.sizes.tablet}) {
    display: none;
  }

  @media only screen and (max-width: ${props => props.theme.sizes.mobile}) {
      top: 2em;
    }
  
  div {
    width: 2rem;
    height: 0.25rem;
    background: ${props => props.theme.colors.black};
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;


    :first-child {
      transform: ${({ isOpen }) => isOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ isOpen}) => isOpen ? '0' : '1'};
      transform: ${({ isOpen}) => isOpen ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`

const Burger = ({isOpen, setIsOpen}) => {
  return (
    <StyledBurgerButton
      isOpen={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      type="button"
      aria-label="burger knapp"
    >
      <div></div>
      <div></div>
      <div></div>
    </StyledBurgerButton>
  )
}

export default Burger
