/**
 * The admin auth routes.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import express from 'express'
import { AdminAuthController as controller } from '../controllers/email-controller.js'

export const router = express.Router()

// Routes
router.post('/register', controller.registerAdmin)
router.post('/login', controller.loginAdmin)
