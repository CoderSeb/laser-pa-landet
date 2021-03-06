import React, {useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import val from 'validator'

const StyledContainer = styled.div`
  background: ${props => props.theme.colors.accent};
  width: 80%;
  margin: 1rem auto;
  padding: .5em;
  color: ${props => props.theme.colors.main};
  text-align: center;
  min-height: 12rem;

  @media only screen and (max-width: ${props => props.theme.sizes.tablet}) {
    width: 100%;
    margin:1rem 0;
    min-height: 18rem;
  }

  p {
    user-select: all;

    &::selection {
      background: ${props => props.theme.colors.white};
      color: ${props => props.theme.colors.accent};
    }
  }

  input {
    padding: .5em;
    outline: none;
    border: none;
    background: ${props => props.theme.colors.secondary};
    border-radius: 10px;
    margin: 1rem auto;
    display: block;
    font-size: 1.1em;
    min-width: 40%;
    max-char: 40;

    &:focus {
      border: 1px solid ${props => props.theme.colors.black};
    }
  }

  button {
    padding:.5em;
    font-size: 1.1em;
    outline: none;
    border: none;
    background: ${props => props.theme.colors.secondary};
    border-radius: 10px;
    margin: 1rem auto;
    display: block;
    box-shadow: -1px -1px 5px 3px ${props => props.theme.colors.secondary};
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.main};
    border: 1px solid ${props => props.theme.colors.main};
    box-shadow: none;

    &:hover {
    border: none;
    background: ${props => props.theme.colors.secondary};
    box-shadow: -1px -1px 5px 3px ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.black};
    }

    &:active {
      color: ${props => props.theme.colors.main};
      background: ${props => props.theme.colors.black};
      box-shadow: -1px -1px 5px 3px ${props => props.theme.colors.black};
    }
  }
`

const changePass = creds => {
  const bearerToken = `Bearer ${sessionStorage.getItem('lpl-admin-token')}`
  axios({
    method: 'put',
    // eslint-disable-next-line no-undef
    url: `${process.env.REACT_APP_API}${process.env.REACT_APP_API_CHANGE_PASS}`,
    headers: {
      Authorization: bearerToken.replace(/['"]+/g, '')
    },
    data: creds
  }).
  then(response => {
    return response.message
  }).
  catch(err => err.response.data.message)
}


const ChangePass = ({ currentUser }) => {
  const [oldPassphrase, setOldPassphrase] = useState('')
  const [newPassphrase, setNewPassphrase] = useState('')
  const [newPassphraseConfirm, setNewPassphraseConfirm] = useState('')
  const [feedback, setFeedback] = useState('')

  const handleChangePassword = async e => {
    e.preventDefault()
    if (newPassphraseConfirm !== newPassphrase) {
      setFeedback('L??senorden matchar inte!')
    } else if (!val.isStrongPassword(newPassphrase)) {
      setFeedback('Ditt nya l??senord m??ste inneh??lla minst 8 tecken, sm?? och stora bokst??ver, siffror samt minst ett specialtecken.')
    } else {
      const payload = {
        email: currentUser.adminEmail,
        oldPass: oldPassphrase,
        newPass: newPassphrase
      }
      const changedResponse = await changePass(payload)
      if (changedResponse) {
        setFeedback(changedResponse)
      }
    }
  }

  return (
    <StyledContainer>
      <h2>Byt l??senord</h2>
      <form onSubmit={handleChangePassword}>
        <input onChange={e => setOldPassphrase(e.target.value)} type="password" placeholder="Ditt nuvarande l??senord..." name="oldPassphrase" />
        <input onChange={e => setNewPassphrase(e.target.value)} type="password" placeholder="Nytt l??senord..." name="newPassphrase" />
        <input onChange={e => setNewPassphraseConfirm(e.target.value)} type="password" placeholder="Bekr??fta nytt l??senord..." name="newPassphrase" />
        {feedback && <p>{feedback}</p>}
        <button type="submit">Byt l??senord</button>
      </form>
    </StyledContainer>
  )
}

export default ChangePass
