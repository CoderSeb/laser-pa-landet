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
import { AllowedEmail } from '../models/allowedEmail.js'
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
      if (!admin) throw createError(401, 'Fel användaruppgifter!')
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
      const { fullName, email, pass } = await req.body

      // Validate credentials
      if (!fullName || fullName.length < 3) throw createError(400, 'Fullständigt namn krävs!')
      if (!email || !val.isEmail(email)) throw createError(400, 'Epost krävs!')
      if (!val.isStrongPassword(pass)) throw createError(400, 'Ett säkert lösenord krävs! Krav: Minst 8 tecken av stora och små bokstäver, siffror samt symboler.')
      const isAllowed = await AllowedEmail.findOne({ email: email })
      if (!isAllowed) throw createError(401, 'Ej tillåtelse att registrera!')
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
          url: '/api/v1/email',
          data: {
            fullName: user.name,
            email: user.email,
            phone: '',
            subject: 'Administratör skapad!',
            message: `Admin-konto för ${user.name} med epost ${user.email}\nskapades ${user.createdAt}`
          }
        }).catch(err => {
          if (err.code && err.code === 11000) throw createError(400, 'Kontrollera att dina uppgifter stämmer!')
        })
        res.status(201).json({
          message: `Administratörskonto för ${fullName} skapades! Förvara dina uppgifter säkert!`
        })
      }).catch(err => {
        next(err)
      })
    } catch (err) {
      next(err)
    }
  },

  /**
   * Adds an email to AllowedEmail collection.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async addAdmin (req, res, next) {
    try {
      const { email } = await req.body
      const token = await req.headers.authorization
      if (!token) throw createError(401, 'Du är inte inloggad!')
      const validToken = await verifyToken(token.split(' ')[1])
      if (!validToken) throw createError(403, 'Ej behörig att lägga till epost!')
      if (!email || !val.isEmail(email)) throw createError(400, 'En giltig epost krävs!')

      const newAdminEmail = new AllowedEmail({
        email: email
      })

      newAdminEmail.save().then(email => {
        res.status(201).json({
          message: `Epost sparad! ${email.email} kan nu registrera sig som administratör!`
        })
      }).catch(err => {
        console.log(err.message)
        res.status(400).send(createError(400, err.message))
      })
    } catch (err) {
      next(err)
    }
  },

  /**
   * Adds changes password for current user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async adminChangePass (req, res, next) {
    try {
      const { email, oldPass, newPass } = await req.body
      const token = await req.headers.authorization
      const validToken = await verifyToken(token.split(' ')[1])
      if (!validToken) throw createError(403, 'Ej behörig att ändra lösenord!')
      const admin = await Admin.findOne({ email: email })
      if (!admin) throw createError(401, 'Fel användaruppgifter!')
      const isAuth = await admin.valPass(oldPass)
      if (!isAuth || !admin) throw createError(401, 'Fel användaruppgifter!')
      admin.password = newPass
      admin.save().then(newAdmin => {
        res.status(200).json({
          message: `Lösenord bytt för ${newAdmin.email}!`
        })
      }).catch(err => {
        console.log(err.message)
        throw createError(404, 'Lösenordet kunde inte bytas just nu...')
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
export async function verifyToken (token) {
  const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'base64').toString()
  const result = jwt.verify(token, privateKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (!err) {
      return decoded
    }
    return false
  })
  return result
}
