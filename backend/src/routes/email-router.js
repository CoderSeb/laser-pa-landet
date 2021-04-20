/**
 * The email routes.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import express from 'express'
import { EmailController as controller } from '../controllers/email-controller.js'
import rateLimit from 'express-rate-limit'

const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 15,
  message: 'För många mail har skickats redan! Vänta en (1) timme innan nästa försök.'
})

export const router = express.Router()

// Routes
router.post('/', emailLimiter, controller.sendEmail)
