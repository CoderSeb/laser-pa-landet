/*eslint-disable */
// Imports
import app from './testServer.js'
import supertest from 'supertest'
import * as TestDB from 'config/mongo.js'
import { AllowedEmail } from 'models/allowedEmail.js'
import { Admin } from 'models/admin.js'
import { blogData } from './testData.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {jest} from '@jest/globals'
// Config .env
dotenv.config()
const request = supertest(app)
/**
 * Blog routes tests.
 */
describe('Blog routes tests', () => {
  let loginToken
  let blogPost
  beforeEach(async () => {
    jest.useFakeTimers()
  })

  // Add an allowed email and add an admin to the database,
  // also log that admin in to receive the jwt token.
  beforeAll(async () => {
    await TestDB.truncateDB()
    const allowedEmail = new AllowedEmail({
      email: "test@email.com"
    })
    await allowedEmail.save()
    const newAdmin = new Admin({
      name: "Test Testsson",
      email: "test@email.com",
      password: "TestTestssonPass#7327"
    })
    await newAdmin.save()
    const loginRes = await request.post('/api/v1/admin/auth/login').send(blogData.blogAdmin)
    loginToken = loginRes.body.token
  })

  // Add a blog post the correct way.
  it('Add a blog post, should return 201 Created.', async done => {
    const payload = {
      title: 'This is a test title',
      content: '<p>This is some test content.</p>'
    }
    const res = await request.post('/api/v1/blog').set('Authorization', setBearerToken(loginToken)).send(payload)
    expect(res.statusCode).toEqual(201)
    done()
  })

  // Get all blog posts the correct way.
  it('Get all blog posts, should return 200 OK.', async done => {
    const res = await request.get('/api/v1/blog')
    blogPost = await res.body
    expect(res.statusCode).toEqual(200)
    done()
  })

  // Get one blog post with correct credentials.
  it('Get one blog post, should return 200 OK.', async done => {
    const res = await request.get('/api/v1/blog/' + blogPost[0].id).set('Authorization', setBearerToken(loginToken))
    expect(res.statusCode).toEqual(200)
    done()
  })

  // Edit a blog post the correct way.
  it('Edit one blog post, should return 200 OK.', async done => {
    const payload = {
      title: 'This title has been changed.',
      content: 'This content is also changed..'
    }
    const res = await request.put('/api/v1/blog/' + blogPost[0].id).set('Authorization', setBearerToken(loginToken)).send(payload)
    expect(res.statusCode).toEqual(200)
    done()
  })

  // Delete a blog post with correct credentials.
  it('Delete one blog post, should return 204 No Content.', async done => {
    const res = await request.delete('/api/v1/blog/' + blogPost[0].id).set('Authorization', setBearerToken(loginToken))
    expect(res.statusCode).toEqual(204)
    done()
  })

  afterAll(async () => {
    await TestDB.truncateDB()
    await TestDB.disconnectDB()
    app.close()
  })
})

const setBearerToken = (token) => {
  return `Bearer ${token}`
}
