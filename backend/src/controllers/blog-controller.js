/**
 * Module for the BlogController.
 *
 * @author Sebastian Åkerblom <sa224ny@student.lnu.se>
 * @version 1.0.0
 */

// Imports
import createError from 'http-errors'
import { BlogPost } from '../models/blogPost.js'
import { Admin } from '../models/admin.js'
import { verifyToken } from './admin-auth-controller.js'
import moment from 'moment'

/**
 * Encapsulates a controller.
 */
export const BlogController = {
  /**
   * Get all blog posts.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getAllPosts (req, res, next) {
    try {
      moment.locale('sv')
      const payload = []
      const allPosts = await BlogPost.find({})
      allPosts.forEach(post => {
        const postToSend = {
          title: post.title,
          id: post._id,
          content: post.content,
          creator: post.creatorName,
          created: moment(post.createdAt).calendar(),
          edited: moment(post.editedAt).calendar()
        }
        payload.push(postToSend)
      })

      res.status(200).json(payload)
    } catch (err) {
      next(err)
    }
  },

  /**
   * Creates a blog post.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async createPost (req, res, next) {
    try {
      const { title, content } = await req.body
      const token = await req.headers.authorization
      const validToken = await verifyToken(token.split(' ')[1])
      if (!validToken) throw createError(403, 'Ej behörig att skapa bloginlägg!')
      if (!title || title.length > 50) throw createError(400, 'Kontrollera titeln! Max storlek: 50 tecken.')
      if (!content || content.length > 2000) throw createError(400, 'Kontrollera texten! Max storlek: 2000 tecken.')
      console.log(req.files.upload)

      const adminCreator = await Admin.findOne({ email: validToken.adminEmail })
      if (!adminCreator) throw createError(403, 'Ej behörig att skapa bloginlägg!')
      const newBlogPost = new BlogPost({
        creatorId: adminCreator._id,
        creatorName: adminCreator.name,
        title: title,
        content: content
      })

      newBlogPost.save()
        .then(blogPost => {
          res.status(201).json({ message: `Inlägg: ${title} - skapat!` })
        }).catch(err => {
          next(err)
        })
    } catch (err) {
      next(err)
    }
  },

  /**
   * Delete a post.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async deletePost (req, res, next) {
    try {
      const token = await req.headers.authorization
      const validToken = await verifyToken(token.split(' ')[1])
      if (!validToken) throw createError(403, 'Ej behörig att ta bort inlägg!')
      const postToDelete = await BlogPost.findOne({ _id: req.params.id })
      if (!postToDelete) throw createError(400, 'Inlägget finns inte!')
      await BlogPost.deleteOne({ _id: req.params.id }, (err) => {
        if (err) throw createError(500, 'Något gick fel, ladda om sidan och försök igen.')
        res.sendStatus(204)
      })
    } catch (err) {
      next(err)
    }
  },

  /**
   * Saves an image.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async saveImage (req, res, next) {
    try {
      console.log('tjoho')
      console.log(req.file)
    } catch (err) {
      console.log('tjoho')
      next(err)
    }
  }
}
