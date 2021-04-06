import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'

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

  span {
    color: red;
    display:block;
    margin-top: 0;
    margin-bottom: 1em;
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
    max-width: 100%;
  }
`

const StyledInput = styled.input`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.black};
  border: none;
  outline:none;
  width:60%;
  margin:.5em auto;
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
  const [charsLeft, setCharsLeft] = useState(0)
  const [errors, setErrors] = useState({})
  const [fullName, setFullName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const [subject, setSubject] = useState(null)
  const [message, setMessage] = useState(null)

  const maxLength = 600

  const handleTextChange = e => {
    const {value} = e.target
    setCharsLeft(maxLength - value.length)
  }

  const validateEmail = emailToBeChecked => {
    // From: https://www.codegrepper.com/app/profile.php?id=14164
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (emailToBeChecked.match(regexEmail)) {
      return true
    }
    return false
  }

  const validateForm = errList => {
    let isValid = true
    Object.values(errList).forEach(error => error === null && (isValid = false))
    return isValid
  }

  const handleInputChange = e => {
    e.preventDefault()
    const {name, value} = e.target
    switch (name) {
      case 'fullName':
        errors.fullName = value.length < 3 ? 'Vänligen fyll i ditt fullständiga namn.' : null
        setFullName(value)
        break
      case 'email':
        errors.email = validateEmail(value) ? null : 'Epost addressen är inte giltig.'
        setEmail(value)
        break
      case 'subject':
        errors.subject = value.length < 3 ? 'Ämnet behöver vara minst 3 tecken långt.' : null
        setSubject(value)
        break
      case 'message':
        errors.message = value.length < 8 ? 'Meddelandet behöver vara minst 8 tecken långt.' : null
        setMessage(value)
        break
      case 'phone':
        setPhone(value)
        break
      default:
        break
    }
    setErrors(errors)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (validateForm(errors)) {
      try {
        axios({
          method: "POST",
          url: "http://localhost:5050/api/v1/email",
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            fullName,
            email,
            phone,
            subject,
            message
          }
        }).then(response => {
          // eslint-disable-next-line no-console
          console.log(response.config.data)
        })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.message)
      }
    }
  }

  return (
    <StyledForm right={right} left={left} onSubmit={handleSubmit} method="POST">
      <h2>Kontaktformulär</h2>
      <div>
        <h3>Dina uppgifter</h3>
        <StyledInput
          placeholder="För- och efternamn..."
          type="text"
          name="fullName"
          onChange={handleInputChange}
        />
        {errors.fullName !== null &&
        <span>{errors.fullName}</span>}
        <StyledInput
          placeholder="Epost..."
          type="email"
          name="email"
          onChange={handleInputChange}
        />
        {errors.email !== null &&
        <span>{errors.email}</span>}
        <StyledInput
          placeholder="(Frivilligt) Telefon..."
          type="tel"
          name="phone"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <h3>Ditt meddelande</h3>
        <StyledInput
          placeholder="Ämne"
          type="text"
          name="subject"
          onChange={handleInputChange}
        />
        {errors.subject !== null &&
        <span>{errors.subject}</span>}
        <StyledTextarea
          placeholder="Meddelande"
          name="message"
          maxLength={maxLength}
          onChange={e => {
            handleTextChange(e)
            handleInputChange(e)
            }} />
        <p>{charsLeft}/{maxLength}</p>
        {errors.message !== null &&
        <span>{errors.message}</span>}
      </div>
      <StyledSubmit type="submit">Skicka meddelande</StyledSubmit>
    </StyledForm>
  )
}

export default ContactForm
