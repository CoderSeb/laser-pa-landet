/* eslint-disable no-undef */
import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import val from 'validator'

const StyledContainer = styled.div`
  background: ${props => props.theme.colors.accent};
  height:100vh;
  padding: 1rem;
`

const StyledForm = styled.form`
  width:30%;
  padding:1rem;
  margin:3rem auto;
  border: 1px dotted black;
  text-align: center;

  @media only screen and (max-width: ${props => props.theme.sizes.desktop}) {
    width: 80%;
    padding: .5em;
  }

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    width: 100%;
  }

  @media only screen and (max-width: ${props => props.theme.sizes.mobile}) {
    width: 100%;
    margin: 1rem auto;
  }

  input, button {
    display: block;
    font-size: 1.2em;
    border:none;
    padding:.5em;
    border-radius: 10px;
    outline: none;
    margin: 1rem auto;
    min-width: 70%;
  }

  small, h2 {
    user-select: none;
  }

  .feedbackP {
    color:yellow;
    user-select:none;
  }

  input {
    background: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.accent};

    &:focus {
      color: ${props => props.theme.colors.black};
    }
  }

  button {
    &:hover {
      background: black;
      color: white;
    }

    &:active {
      opacity: 0.7;
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
  const loginUrl = `${process.env.REACT_APP_API}${process.env.REACT_APP_API_LOGIN}`
  const response = await axios(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(adminCreds)
  }).then(responseObject => responseObject.data).
  catch(err => err.response.data)
  return response
}

/**
 * Send Post request to backend registration.
 *
 * @param {object} adminCreds as the admin credentials.
 * @return {object} as the response object data.
 */
 const adminSignUp = async adminCreds => {
  const signUpUrl = `${process.env.REACT_APP_API}${process.env.REACT_APP_API_REGISTER}`
  const response = await axios(signUpUrl, {
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
  const [showLogin, setShowLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [fullName, setFullName] = useState('')
  const [passphraseConfirm, setPassphraseConfirm] = useState('')
  const [feedback, setFeedback] = useState('')

  // Calls the login method and sets the feedback message.
  const handleLogin = async e => {
    e.preventDefault()
    if (!email || !val.isEmail(email.toString())) {
      setFeedback('Eposten ??r inte giltig.')
    } else {
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
  }

  const handleSignUp = async e => {
    e.preventDefault()
    const passwordMatch = passphrase === passphraseConfirm
    if (!email || !val.isEmail(email.toString())) {
      setFeedback('Eposten ??r inte giltig.')
    } else if (!passwordMatch) {
      setFeedback('L??senorden matchar inte!')
    } else if (!val.isStrongPassword(passphrase)) {
      setFeedback('L??senordet beh??ver inneh??lla minst 8 tecken, stora och sm?? bokst??ver, siffror samt minst ett specialtecken.')
    } else if (!fullName) {
      setFeedback('Fullst??ndigt namn kr??vs!')
    } else {
      const payload = {
        fullName,
        email,
        pass: passphrase
      }
      const registerResponse = await adminSignUp(payload)
      setShowLogin(true)
      if (registerResponse.message) {
        setFeedback(registerResponse.message)
      } else {
        setFeedback(registerResponse)
      }
    }
  }

  return (
    <StyledContainer>
      <StyledForm onSubmit={showLogin ? handleLogin : handleSignUp}>
      {showLogin ? <h2>Logga in</h2> : <h2>Registrera</h2>}
      {showLogin ? null : <input placeholder="Fullst??ndigt namn..." type="text" onChange={e => setFullName(e.target.value)} />}
        <input placeholder="Epost..." type="email" onChange={e => setEmail(e.target.value)} />
        <input placeholder="L??senord..." type="password" onChange={e => setPassphrase(e.target.value)} />
      {showLogin ? null : <input placeholder="Bekr??fta l??senord..." type="password" onChange={e => setPassphraseConfirm(e.target.value)} />}
        {feedback ? <p className="feedbackP">{feedback}</p> : ''}
        <div>
          <button type="submit">{showLogin ? 'Logga in' : 'Registrera'}</button>
          <button type="button" onClick={() => setShowLogin(prev => !prev)}>{showLogin ? 'Byt till formul??r f??r registrering' : 'Byt till formul??r f??r inloggning'}</button>
        </div>
        <small>VARNING: Denna sida ??r endast till f??r webbplatsens administrat??r(er).</small>
      </StyledForm>
    </StyledContainer>
  )
}

export default Login
