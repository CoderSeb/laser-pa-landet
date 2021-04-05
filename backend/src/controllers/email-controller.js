/**
 * Module for the EmailController.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
// import jwt from 'jsonwebtoken'
// import createError from 'http-errors'

/**
 * Encapsulates a controller.
 */
export const EmailController = {
  /**
   * Registers a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async sendEmail (req, res, next) {
    res.json(req.data)
  }
}
