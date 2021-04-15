import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import axios from 'axios'

const StyledForm = styled.form`
  background: ${props => props.theme.colors.main};
  border-radius: 10px;
  padding:1em;
  width: 900px;
  min-height: 650px;
  margin: 5rem auto;

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
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [serverMessage, setServerMessage] = useState('')

  const maxLength = 600

  const resetForm = () => {
    setFullName('')
    setEmail('')
    setPhone('')
    setSubject('')
    setMessage('')
    setErrors({})
    setCharsLeft(maxLength)
  }

  const handleTextChange = e => {
    const {value} = e.target
    setCharsLeft(maxLength - value.length)
  }

  useEffect(() => {
    setTimeout(() => {
      setServerMessage('')
    }, 3000)
  }, [serverMessage])

  const validateEmail = emailToBeChecked => {
    // From: https://www.codegrepper.com/app/profile.php?id=14164
    const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (emailToBeChecked.match(regexEmail)) {
      return true
    }
    return false
  }

  const validatePhone = numberToBeChecked => {
    const regexPhone = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$/im
    if (numberToBeChecked.match(regexPhone)) {
      return true
    }
    return false
  }

  const validateForm = errList => {
    let isValid = true
    Object.values(errList).forEach(error => {
      if (error) {
        isValid = false
      }
    })
    return isValid
  }

  const handleInputChange = e => {
    e.preventDefault()
    const {name, value} = e.target
    switch (name) {
      case 'fullName':
        errors.fullName = value.length < 3 && 'Vänligen fyll i ditt fullständiga namn.'
        setFullName(value)
        break
      case 'email':
        errors.email = !validateEmail(value) && 'Epost addressen är inte giltig.'
        setEmail(value)
        break
      case 'subject':
        errors.subject = value.length < 3 && 'Ämnet behöver vara minst 3 tecken långt.'
        setSubject(value)
        break
      case 'message':
        errors.message = value.length < 8 && 'Meddelandet behöver vara minst 8 tecken långt.'
        setMessage(value)
        break
      case 'phone':
        if (value.length !== 0) {
          errors.phone = !validatePhone(value) && 'Telefonnumret är ogiltigt.'
        } else {
          errors.phone = false
        }
        setPhone(value)
        break
      default:
        break
    }
    setErrors(errors)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const stateArray = [fullName, email, subject, message]
    stateArray.forEach(element => {
      if (element.length < 1) {
        errors.empty = 'Du behöver fylla i formuläret för att skicka!'
      } else {
        errors.empty = false
      }
      setErrors(errors)
    })
    if (validateForm(errors)) {
      try {
        axios({
          method: "POST",
          url: "http://localhost:5050/api/v1/email",
          headers: {
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
            fullName,
            email,
            phone,
            subject,
            message
          })
        }).then(response => {
          setServerMessage(response.data.status)
          resetForm()
          e.target.reset()
        })
      } catch (err) {
        setServerMessage('Något gick fel, ladda om sidan och försök gärna igen.')
      }
    } else {
      setServerMessage('Vänligen kontrollera dina uppgifter...')
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
          value={fullName}
        />
        {errors.fullName &&
        <span>{errors.fullName}</span>}
        <StyledInput
          placeholder="Epost..."
          type="email"
          name="email"
          onChange={handleInputChange}
          value={email}
        />
        {errors.email &&
        <span>{errors.email}</span>}
        <StyledInput
          placeholder="(Frivilligt) Telefon..."
          type="tel"
          name="phone"
          onChange={handleInputChange}
          value={phone}
        />
        {errors.subject &&
        <span>{errors.phone}</span>}
      </div>
      <div>
        <h3>Ditt meddelande</h3>
        <StyledInput
          placeholder="Ämne"
          type="text"
          name="subject"
          onChange={handleInputChange}
          value={subject}
        />
        {errors.subject &&
        <span>{errors.subject}</span>}
        <StyledTextarea
          placeholder="Meddelande"
          name="message"
          maxLength={maxLength}
          onChange={e => {
            handleTextChange(e)
            handleInputChange(e)
            }}
          value={message} />
        <p>{charsLeft}/{maxLength}</p>
        {errors.message &&
        <span>{errors.message}</span>}
      </div>
      <StyledSubmit type="submit">Skicka meddelande</StyledSubmit>
      {serverMessage.length > 0 && !errors.empty &&
      <span style={{color: "black"}}>{serverMessage}</span>}
      {errors.empty &&
        <span>{errors.empty}</span>}
    </StyledForm>
  )
}

export default ContactForm
