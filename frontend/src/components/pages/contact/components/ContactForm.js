import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const StyledForm = styled.form`
  background: ${props => props.theme.colors.light};
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
`

const StyledInput = styled.input`
  background: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.light};
  border: none;
  outline:none;
  width:60%;
  margin:1em auto;
  padding: .5em;
  font-size: 1em;
  border-radius:8px;
  box-shadow: 0 0 3px 1px ${props => props.theme.colors.main};
  transition: all 0.4s ease-in-out;

  &:focus {
    width:100%;
  }

  &::selection {
    background: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.main};
  }
`

const StyledTextarea = styled.textarea`
  background: ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.light};
  border: none;
  outline:none;
  width:100%;
  margin:auto;
  padding: .5em;
  font-size: 1em;
  border-radius:8px;
  box-shadow: 0 0 3px 1px ${props => props.theme.colors.main};
  resize: none;
  height: 120px;
  transition: all 0.4s ease-in-out;

  &:focus {
    height:250px;
  }

  &::selection {
    background: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.main};
  }
`

const StyledSubmit = styled.button`
  white-space: nowrap;
  user-select: none;
  background-color: ${props => props.theme.colors.light};
  padding:0.5em 1em;
  color:${props => props.theme.colors.dark};
  border-radius:42px;
  display:inline-block;
  cursor:pointer;
  font-size: 1.1em;
  transition: 0.1s ease;
  font-size: 1em;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s linear;
  text-align:center;
  margin: 1em auto;
  border: 1px solid ${props => props.theme.colors.main};

  &:hover {
    box-shadow: 0px 0px 3px 1px ${props => props.theme.colors.main};
    background: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.light};
    text-shadow:0px 1px 0px ${props => props.theme.colors.dark};
  }

  &:active {
    background: ${props => props.theme.colors.dark};
    color: ${props => props.theme.colors.light};
    box-shadow: 0px 0px 5px 1px ${props => props.theme.colors.dark};
  }

`



const ContactForm = () => {
  const [charsLeft, setCharsLeft] = useState(0)
  const maxLength = 600
  const handleChange = (e) => {
    const {value} = e.target
    setCharsLeft(maxLength - value.length)
  }
  return (
    <StyledForm>
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

export default ContactForm;
