/**
 * Module for the AdminAuthController.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import createError from 'http-errors'
import val from 'validator'
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
      if (!pass || pass.length < 8) throw createError(400, 'Lösenord krävs!')
    } catch (err) {
      next(err)
    }
  }
}
