/**
 * Module for the AdminAuthController.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports

/**
 * Encapsulates a controller.
 */
export const AdminAuthController = {
  /**
   * Registers an admin user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async registerAdmin (req, res, next) {
    res.json({ message: 'Reached admin register' })
  }

  /**
   * Logs in an admin user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async loginAdmin (req, res, next) {
    res.json({ message: 'Reached admin login' })
  }
}
