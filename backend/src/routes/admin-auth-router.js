/**
 * The admin auth routes.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import express from 'express'
import rateLimit from 'express-rate-limit'
import { AdminAuthController as controller } from '../controllers/admin-auth-controller.js'

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: 'För många försök! Vänta en (1) timme innan nästa försök.'
})

export const router = express.Router()

// Routes
router.post('/register', authLimiter, controller.registerAdmin)
router.post('/login', authLimiter, controller.loginAdmin)
router.post('/add-admin', authLimiter, controller.addAdmin)
router.put('/change-pass', authLimiter, controller.adminChangePass)
