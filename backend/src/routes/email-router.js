/**
 * The email routes.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import express from 'express'
import { EmailController as controller } from '../controllers/email-controller.js'

export const router = express.Router()

// Routes
router.post('/', controller.sendEmail)
