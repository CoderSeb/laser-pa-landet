/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const StyledContainer = styled.div`
  background: ${props => props.theme.colors.accent};
  height:80vh;
  padding: 1rem;
`

const StyledForm = styled.form`
  width:30%;
  padding:3rem;
  margin:3rem auto;
  border: 1px dotted black;
  text-align: center;

  input, button {
    display: block;
    font-size: 1.2em;
    border:none;
    padding:.5em;
    border-radius: 10px;
    outline: none;
    margin: 1rem auto;
  }

  input {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.accent};

    &:focus {
      color: ${props => props.theme.colors.black};
    }
  }
`

/**
 * Send Post request to backend login.
 *
 * @param {object} adminCreds as the admin credentials.
 * @return {object} as the response object data.
 */
const adminLogin = async adminCreds => {
  const response = await axios(process.env.REACT_APP_API_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(adminCreds)
  }).then(responseObject => responseObject.data).
  catch(err => err.response.data)
  return response
}

const Login = ({ setTokenState }) => {
  const [email, setEmail] = useState()
  const [passphrase, setPassphrase] = useState()
  const [feedback, setFeedback] = useState('')

  // Remove feedback message after 3 seconds.
  useEffect(() => {
    setTimeout(() => {
      setFeedback('')
    }, 3000)

    return () => {
      setFeedback('')
    }
  }, [feedback])

  // Calls the login method and sets the feedback message.
  const handleLogin = async e => {
    e.preventDefault()
    const loginResponse = await adminLogin({
      email,
      pass: passphrase
    })
    if (loginResponse.message) {
      setFeedback(loginResponse.message)
    } else {
      setFeedback(loginResponse)
    }
    if (loginResponse.token) {
      setTokenState(loginResponse.token)
    }
  }

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleLogin}>
      <h2>Logga in</h2>
        <input placeholder="Epost..." type="email" onChange={e => setEmail(e.target.value)} />
        <input placeholder="Lösenord..." type="password" onChange={e => setPassphrase(e.target.value)} />
        {feedback ? <p>{feedback}</p> : ''}
        <div>
          <button type="submit">Logga in</button>
        </div>
        <small>VARNING: Denna sida är endast till för webbplatsens administratör(er).</small>
      </StyledForm>
    </StyledContainer>
  )
}

export default Login
