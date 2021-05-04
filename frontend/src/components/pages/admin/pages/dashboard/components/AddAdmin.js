import React, {useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'

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
    margin: 1rem;
    display: inline-block;
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
    display: inline-block;
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


const AddAdmin = () => {
  const [email, setEmail] = useState()
  const [feedback, setFeedback] = useState('')

  const handleSaveAdmin = e => {
    e.preventDefault()
    const bearerToken = `Bearer ${sessionStorage.getItem('lpl-admin-token')}`
    const payload = {
      email
    }

    axios({
      method: 'post',
      // eslint-disable-next-line no-undef
      url: process.env.REACT_APP_API_ADD_ADMIN,
      headers: {
        Authorization: bearerToken.replace(/['"]+/g, '')
      },
      data: payload
    }).
    then(response => {
      setFeedback(response.data.message)
    }).
    catch(err => {
      if (err.response) {
        setFeedback(err.response.data.message)
      }
      setFeedback(err.message)
    })
  }


  return (
    <StyledContainer>
      <h2>Lägg till administratör</h2>
        <form onSubmit={handleSaveAdmin}>
        <p>{`** ${feedback} **`}</p>
          <input onChange={e => setEmail(e.target.value)} name="email" type="email" placeholder="Epost..." />
          <button type="submit">Spara epost</button>
        </form>
    </StyledContainer>
  )
}

export default AddAdmin
