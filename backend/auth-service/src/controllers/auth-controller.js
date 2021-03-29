/**
 * Module for the AuthenticationController.
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
export class AuthenticationController {
  /**
   * Registers a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async registerUser (req, res, next) {
    res.json('Reached register path')
  }

  /**
   * Logs in a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async loginUser (req, res, next) {
    res.json('Reached login path')
  }
}

// /**
//  * Function that returns a json web token containing the data given.
//  *
//  * @param {object} tokenData - As the data to be contained within the token.
//  * @returns {string} - The json web token.
//  */
// async function generateToken (tokenData) {
//   const signOptions = {
//     expiresIn: '1h',
//     algorithm: 'RS256'
//   }
//   const privateKey = Buffer.from(process.env.PRIVATE_KEY64, 'base64')
//   return jwt.sign(tokenData, privateKey, signOptions)
// }
