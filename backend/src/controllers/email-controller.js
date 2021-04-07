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

    const content = `<div style="background: #ccd6ff; padding: 0px .5em .5em .5em;">
    <h3>Nytt email från användare av Laser på landet!</h3>\n
    <span>Namn: <code>${fullName}</code></span><br />
    <span>Epost: <a href="mailto:${email}">${email}</a></span><br />
    <span>Telefon: <code>${phone}</code></span><br />
    <p>Meddelande: <pre>${message}</pre></p></div>`

    const mailOptions = {
      from: `${fullName} ${email}`,
      to: process.env.EMAIL_USER_NAME,
      subject: subject,
      html: content
    }

    await transport.sendMail(mailOptions, (err, data) => {
      if (err) {
        res.json({ status: 'Något gick fel, ladda om sidan och försök gärna igen.' })
      } else {
        res.json({ status: 'Ditt meddelande är skickat!' })
      }
    })
  }
}
