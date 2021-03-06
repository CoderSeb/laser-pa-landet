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
import fs from 'fs-extra'

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
          edited: moment(post.editedAt).calendar(),
          image: post.image
        }
        payload.push(postToSend)
      })
      const sortedPayload = payload.sort((a, b) => b.created - a.created)

      res.status(200).json(sortedPayload)
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
      let imageName = ''
      let image = ''
      if (req.file) {
        if (req.file.size > 1572864) throw createError(413, 'Bilden är för stor! Max 1,5MB.')
        imageName = await req.file.filename
        image = 'images/' + imageName
      }
      const { title, content } = await req.body
      const token = await req.headers.authorization
      const validToken = await verifyToken(token.split(' ')[1])
      if (!validToken) throw createError(403, 'Ej behörig att skapa bloginlägg!')
      if (!title || title.length > 50) throw createError(400, 'Kontrollera titeln! Max storlek: 50 tecken.')
      if (!content || content.length > 15000) throw createError(400, 'Kontrollera texten! Max storlek: 15000 tecken.')

      const adminCreator = await Admin.findOne({ email: validToken.adminEmail })
      if (!adminCreator) throw createError(403, 'Ej behörig att skapa bloginlägg!')
      const newBlogPost = new BlogPost({
        creatorId: adminCreator._id,
        creatorName: adminCreator.name,
        title: title,
        content: content,
        image: image
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
      const imageToDelete = `../frontend/public/${postToDelete.image}`
      await BlogPost.deleteOne({ _id: req.params.id }, (err) => {
        if (err) throw createError(500, 'Något gick fel, ladda om sidan och försök igen.')
        if (imageToDelete !== '../frontend/public/') {
          fs.unlink(imageToDelete, (err) => {
            if (err) throw createError(500, 'Bilden på servern kunde inte tas bort.')
          })
        }
        res.sendStatus(204)
      })
    } catch (err) {
      next(err)
    }
  },

  /**
   * Get one post.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getPost (req, res, next) {
    try {
      const token = await req.headers.authorization
      const validToken = await verifyToken(token.split(' ')[1])
      if (!validToken) throw createError(403, 'Ej behörig att hämta ett specifikt inlägg!')
      const postToReturn = await BlogPost.findOne({ _id: req.params.id })
      if (!postToReturn) throw createError(400, 'Inlägget finns inte!')
      res.status(200).json(postToReturn)
    } catch (err) {
      next(err)
    }
  },

  /**
   * Edit a post.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async editPost (req, res, next) {
    try {
      const token = await req.headers.authorization
      const validToken = await verifyToken(token.split(' ')[1])
      if (!validToken) throw createError(403, 'Ej behörig att redigera inlägg!')
      const postToEdit = await BlogPost.findOne({ _id: req.params.id })
      if (!postToEdit) throw createError(400, 'Inlägget finns inte!')
      const { title, content } = await req.body
      if (title.length > 50) throw createError(400, 'Kontrollera titeln! Max storlek: 50 tecken.')
      if (content.length > 15000) throw createError(400, 'Kontrollera texten! Max storlek: 15000 tecken.')

      const edited = await BlogPost.findOneAndUpdate({ _id: req.params.id }, {
        title: title,
        content: content
      })
      res.status(200).json('Redigerat inlägg med id: ' + edited._id + ' har sparats.')
    } catch (err) {
      next(err)
    }
  }
}
