/**
 * Module for the EmailController.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import nodemailer from 'nodemailer'

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
    const { fullName, email, phone, subject, message } = await req.body

    const transport = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE_NAME,
      host: process.env.EMAIL_SERVICE_HOST,
      port: process.env.EMAIL_SERVICE_PORT,
      secure: process.env.EMAIL_SERVICE_SECURE,
      auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        rejectUnAuthorized: true
      }
    })

    const content = `<h3>Email från användare av Laser på landet!</h3>\nNamn: ${fullName} \nEpost: ${email} \nTelefon: ${phone}\nMeddelande: ${message}`

    const mailOptions = {
      from: `${fullName} ${email}`,
      to: process.env.EMAIL_USER_NAME,
      subject: subject,
      html: content
    }

    await transport.sendMail(mailOptions, (err, data) => {
      if (err) {
        res.json({ status: err.message })
      } else {
        res.json({ status: 'Ditt meddelande är skickat!' })
      }
    })
  }
}
