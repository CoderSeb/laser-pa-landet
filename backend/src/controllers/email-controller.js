/**
 * Module for the EmailController.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import nodemailer from 'nodemailer'
import createError from 'http-errors'
import val from 'validator'

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
    try {
      const { fullName, email, phone, subject, message } = await req.body

      // Input validation
      if (!fullName || fullName.length < 1 || fullName.length > 50) throw createError(400, 'Kontrollera ditt namn!')
      if (!email || !val.isEmail(email) || email.length > 50) throw createError(400, 'Kontrollera din epost!')
      if (!subject || subject.length < 3 || subject.length > 100) throw createError(400, 'Kontrollera din ämnesbeskrivning!')
      if (!message || message.length < 5 || message.length > 600) throw createError(400, 'Kontrollera ditt meddelande!')

      const transport = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE_NAME,
        host: process.env.EMAIL_SERVICE_HOST,
        port: process.env.EMAIL_SERVICE_PORT,
        secure: process.env.EMAIL_SERVICE_SECURE,
        auth: {
          user: process.env.NODE_ENV !== 'production' ? process.env.DEV_EMAIL_USER_NAME : process.env.EMAIL_USER_NAME,
          pass: process.env.NODE_ENV !== 'production' ? process.env.DEV_EMAIL_PASSWORD : process.env.EMAIL_PASSWORD
        },
        tls: {
          rejectUnAuthorized: true
        }
      })

      const content = `<div style="background: #ccd6ff; padding: 0px .5em .5em .5em;">
    <h3>Nytt epost från Laser på landet!</h3>\n
    <span>Namn: <code>${fullName}</code></span><br />
    <span>Epost: <a href="mailto:${email}">${email}</a></span><br />
    <span>Telefon: <code>${phone !== 'undefined' ? phone : ''}</code></span><br />
    <p>Meddelande: <pre>${message}</pre></p></div>`

      const mailOptions = {
        from: `${fullName} ${email}`,
        to: process.env.EMAIL_USER_NAME,
        subject: subject,
        html: content
      }

      await transport.sendMail(mailOptions, (err, data) => {
        if (err) {
          res.status(400).json({ message: 'Något gick fel, ladda om sidan och försök gärna igen.' })
        } else {
          res.status(200).json({ message: 'Ditt meddelande är skickat!' })
        }
      })
    } catch (err) {
      next(err)
    }
  }
}
