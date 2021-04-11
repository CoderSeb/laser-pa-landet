/**
 * Module for the AdminAuthController.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import createError from 'http-errors'
import val from 'validator'
import { Admin } from '../models/admin.js'

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
    res.json({ message: 'Reached admin login' })
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
      if (!fullName || fullName.length < 5) throw createError(400, 'Fullständigt namn krävs!')
      if (!email || !val.isEmail(email)) throw createError(400, 'Epost krävs!')
      if (!pass || !val.isStrongPassword(pass)) throw createError(400, 'Ett säkert lösenord krävs! Krav: Minst 8 tecken av stora och små bokstäver, siffror samt symboler')

      const newAdmin = new Admin({
        name: fullName,
        email: email,
        password: pass
      })

      newAdmin.save().then(user => {
        res.status(201).json({
          message: `Administratorskonto för ${fullName} skapades! Förvara dina uppgifter säkert!`
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
