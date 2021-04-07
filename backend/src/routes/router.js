/**
 * The routes.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import express from 'express'
import { router as emailRouter } from './email-router.js'

export const router = express.Router()

router.use('/email', emailRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => next(res.sendStatus(404)))
