/**
 * The email routes.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import express from 'express'
import { BlogController as controller } from '../controllers/blog-controller.js'
import rateLimit from 'express-rate-limit'

const blogLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: process.env.NODE_ENV !== 'production' ? 100 : 50,
  message: 'För många anrop har gjorts! Vänta en (1) timme innan nästa försök.'
})

const blogGetLimiter = rateLimit({
  windowMs: 60 * 60 * 250, // 15 minutes
  max: 50,
  message: 'För många anrop har gjorts! Vänta femton (15) minuter innan nästa försök.'
})

export const router = express.Router()

// Routes
router.get('/', blogGetLimiter, controller.getAllPosts)
router.post('/', blogLimiter, controller.createPost)
router.delete('/:id', blogLimiter, controller.deletePost)
