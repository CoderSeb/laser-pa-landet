/**
 * The routes.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import express from 'express'
import { router as emailRouter } from './email-router.js'
import { router as adminAuthRouter } from './admin-auth-router.js'
import createError from 'http-errors'

export const router = express.Router()

// Email
router.use('/email', emailRouter)

// Admin authentication
router.use('/admin/auth', adminAuthRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => {
  next(createError(404))
})
