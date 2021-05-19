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
  windowMs: 60 * 60 * 500, // 30 minutes.
  max: process.env.NODE_ENV === 'test' ? 150 : 50,
  message: 'För många mail har skickats redan! Vänta trettio (30) minuter innan nästa försök.'
})

export const router = express.Router()

// Routes
router.post('/', emailLimiter, controller.sendEmail)
