/* eslint-disable no-console */
import { useState } from 'react'
import jwt from 'jsonwebtoken'

export default function useToken () {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('lpl-admin-token')
    const token = JSON.parse(tokenString)
    return token
  }

  const [tokenState, setTokenState] = useState(getToken())

  const saveToken = token => {
    sessionStorage.setItem('lpl-admin-token', JSON.stringify(token))
    setTokenState(token)
  }

  const verifyToken = () => {
    // eslint-disable-next-line no-undef
    const publicKey = atob(process.env.REACT_APP_PUBLIC_KEY)
    const tokenToCheck = getToken()
    console.log(tokenToCheck)
    console.log(publicKey)
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
