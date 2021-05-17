/* eslint-disable no-console */
import { useState } from 'react'
import jwt from 'jsonwebtoken'

export default function useToken () {
  // Function that grabs the token from the sessionStorage.
  const getToken = () => {
    const tokenString = sessionStorage.getItem('lpl-admin-token')
    const token = JSON.parse(tokenString)
    return token
  }

  // State and state setter.
  const [tokenState, setTokenState] = useState(getToken())

  // Saves token to sessionStorage and also sets the state.
  const saveToken = token => {
    sessionStorage.setItem('lpl-admin-token', JSON.stringify(token))
    setTokenState(token)
  }

  // Verifies the token, returns the decoded token if verified.
  const verifyToken = () => {
    // eslint-disable-next-line no-undef
    const publicKey = atob(process.env.REACT_APP_PUBLIC_KEY)
    const tokenToCheck = getToken()
    const result = jwt.verify(tokenToCheck, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        return false
      }
      return decoded
    })
    return result
  }

  return {
    setTokenState: saveToken,
    tokenState,
    verifyToken
  }
}
