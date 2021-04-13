/**
 * Module for the AdminAuthController.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import createError from 'http-errors'
import val from 'validator'
import jwt from 'jsonwebtoken'
import { Admin } from '../models/admin.js'
import axios from 'axios'

/**
 * Encapsulates a controller.
 */
export const AdminAuthController = {
  /**
   * Logs in an admin user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async loginAdmin (req, res, next) {
    try {
      const { email, pass } = await req.body
      // Validate input
      if (!email || !val.isEmail(email)) throw createError(400, 'En giltig epost krävs för att logga in!')
      if (!pass) throw createError(400, 'Lösenord krävs!')
      // Find the user
      const admin = await Admin.findOne({ email: email })
      const isAuth = await admin.valPass(pass)
      // If no user or wrong password
      if (!admin || !isAuth) throw createError(401, 'Fel användaruppgifter!')
      // Token data
      const tokenData = {
        adminEmail: admin.email,
        adminName: admin.name.split(' ')[0]
      }
      // Generate token
      const newToken = await generateToken(tokenData)
      // Send token
      res.json({
        message: 'Lyckad inloggning!',
        token: newToken
      })
    } catch (err) {
      next(err)
    }
  },

  /**
   * Registers an admin user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async registerAdmin (req, res, next) {
    try {
      const { fullName, email, pass, token } = await req.body
      // Validate token
      const validToken = await verifyToken(token)
      if (!validToken) throw createError(403, 'Ej behörig att skapa användare!')
      // Validate credentials
      if (!fullName || fullName.length < 3) throw createError(400, 'Fullständigt namn krävs!')
      if (!email || !val.isEmail(email)) throw createError(400, 'Epost krävs!')
      if (!val.isStrongPassword(pass)) throw createError(400, 'Ett säkert lösenord krävs! Krav: Minst 8 tecken av stora och små bokstäver, siffror samt symboler.')
      // Create new admin object
      const newAdmin = new Admin({
        name: fullName,
        email: email,
        password: pass
      })
      // Save new admin
      newAdmin.save().then(user => {
        axios({
          method: 'post',
          url: 'http://localhost:5050/api/v1/email',
          data: {
            fullName: user.name,
            email: user.email,
            phone: '',
            subject: 'Administratör skapad!',
            message: `Admin-konto för ${user.name} med epost ${user.email}\nskapades ${user.createdAt}`
          }
        }).catch(err => {
          console.log(err.message)
        })
        res.status(201).json({
          message: `Administratörskonto för ${fullName} skapades! Förvara dina uppgifter säkert!`
        })
      }).catch(err => {
        console.log(err.message)
        res.status(400).send(createError(400, 'Ops! Något gick fel...'))
      })
    } catch (err) {
      next(err)
    }
  }
}

/**
 * Function that returns a json web token containing the data given.
 *
 * @param {object} tokenData - As the data to be contained within the token.
 * @returns {string} - The json web token.
 */
async function generateToken (tokenData) {
  const signOptions = {
    expiresIn: '1h',
    algorithm: 'RS256'
  }
  const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'base64').toString()
  return jwt.sign(tokenData, privateKey, signOptions)
}

/**
 * Function that returns a decoded web token if verified.
 *
 * @param {object} token - As the json web token.
 * @returns {string} - The decoded web token.
 */
async function verifyToken (token) {
  const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'base64').toString()
  const result = jwt.verify(token, privateKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (!err) {
      return decoded
    }
    return false
  })
  return result
}
