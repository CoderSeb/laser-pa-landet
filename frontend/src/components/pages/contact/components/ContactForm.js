import React, { useState } from 'react'
import styled, { css } from 'styled-components'

const StyledForm = styled.form`
  background: ${props => props.theme.colors.main};
  border-radius: 10px;
  padding:1em;
  width: 600px;
  min-height: 600px;
  margin: 1em auto;
  h2 {
    text-align: center;
    margin-bottom:1rem;
  }

  p {
    float:right;
  }

  @media only screen and (min-width: ${props => props.theme.sizes.tablet}) {
    ${({left}) => left && css`
    float: left;
    margin: 1em;
  `}

  ${({right}) => right && css`
    float: right;
    margin: 1em;
  `}
  }

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    margin: 1em auto;
    max-width: 90%;
  }
`

const StyledInput = styled.input`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.black};
  border: none;
  outline:none;
  width:60%;
  margin:1em auto;
  padding: .5em;
  font-size: 1em;
  border-radius:8px;
  transition: all 0.4s ease-in-out;

  &:focus {
    width:100%;
    box-shadow: 0 0 3px 1px ${props => props.theme.colors.accent};
  }
`

const StyledTextarea = styled.textarea`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.black};
  border: none;
  outline:none;
  width:100%;
  margin:auto;
  padding: .5em;
  font-size: 1em;
  border-radius:8px;
  resize: none;
  height: 120px;
  transition: all 0.4s ease-in-out;

  &:focus {
    height:250px;
    box-shadow: 0 0 3px 1px ${props => props.theme.colors.accent};
  }
`

const StyledSubmit = styled.button`
  white-space: nowrap;
  user-select: none;
  background-color: ${props => props.theme.colors.white};
  padding:0.5em 1em;
  color:${props => props.theme.colors.black};
  border-radius:42px;
  display:inline-block;
  cursor:pointer;
  font-size: 1.1em;
  outline:none;
  transition: 0.1s ease;
  font-size: 1em;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s linear;
  text-align:center;
  margin: 1em auto;
  border: 1px solid ${props => props.theme.colors.accent};

  &:hover {
    box-shadow: 0px 0px 3px 1px ${props => props.theme.colors.accent};
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.white};
  }

  &:active {
    background: ${props => props.theme.colors.black};
    box-shadow: 0px 0px 5px 1px ${props => props.theme.colors.black};
    border: 1px solid ${props => props.theme.colors.black};
  }

`


const ContactForm = ({right, left}) => {
  const [
charsLeft,
setCharsLeft
] = useState(0)
  const maxLength = 600
  const handleChange = e => {
    const {value} = e.target
    setCharsLeft(maxLength - value.length)
  }
  return (
    <StyledForm right={right} left={left}>
      <h2>Kontaktformulär</h2>
      <div>
        <h3>Dina uppgifter</h3>
        <StyledInput
          placeholder="För- och efternamn..."
          type="text"
        />
        <StyledInput
          placeholder="Epost..."
          type="email"
        />
        <StyledInput
          placeholder="Telefon inkl. eventuellt riktnummer..."
          type="tel"
        />
      </div>
      <div>
        <h3>Ditt meddelande</h3>
        <StyledInput
          placeholder="Ämne"
          type="text"
        />
        <StyledTextarea
          placeholder="Meddelande"
          maxLength={maxLength}
          onChange={handleChange} />
        <p>{charsLeft}/{maxLength}</p>
      </div>
      <StyledSubmit>Skicka meddelande</StyledSubmit>
    </StyledForm>
  )
}

export default ContactForm
