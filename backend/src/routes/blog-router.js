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
import multer from 'multer'

const storage = multer.diskStorage({
  /**
   * Sets a destination.
   *
   * @param {object} req - Request object.
   * @param {object} file - File object.
   * @param {Function} cb - Callback function.
   */
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/images')
  },
  /**
   * Sets a filename.
   *
   * @param {object} req - Request object.
   * @param {object} file - File object.
   * @param {Function} cb - Callback function.
   */
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[1])
  }
})

const upload = multer({ storage: storage })

const blogLimiter = rateLimit({
  windowMs: 60 * 60 * 500, // 30 minutes
  max: process.env.NODE_ENV !== 'production' ? 100 : 50,
  message: 'För många anrop har gjorts! Vänta en (30) minuter innan nästa försök.'
})

const blogGetLimiter = rateLimit({
  windowMs: 60 * 60 * 250, // 15 minutes
  max: 150,
  message: 'För många anrop har gjorts! Vänta femton (15) minuter innan nästa försök.'
})

export const router = express.Router()

// Routes
router.get('/', blogGetLimiter, controller.getAllPosts)
router.post('/', blogLimiter, upload.single('image'), controller.createPost)
router.delete('/:id', blogLimiter, controller.deletePost)
