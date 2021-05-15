/*eslint-disable */
// Imports
import app from './testServer.js'
import supertest from 'supertest'
import { connectTestDB } from 'config/mongo.js'
import { AllowedEmail } from 'models/allowedEmail.js'
import { Admin } from 'models/admin.js'
import { authData } from './testData.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {jest} from '@jest/globals'
// Config .env
dotenv.config()
const request = supertest(app)
/**
 * Admin routes tests.
 */
describe('Admin routes tests', () => {
  const OLD_ENV = process.env
  beforeAll(async () => {
    await connectTestDB()
  })
  let loginToken
  beforeEach(async () => {
    jest.useFakeTimers()
    jest.resetModules()
    process.env = { ...OLD_ENV }
    await AllowedEmail.deleteMany({})
    await Admin.deleteMany({})
    await AllowedEmail.insertMany({ email: "test@email.com" })
  })

  // Register with correct credentials.
  it('Register with correct admin credentials, should return 201 Created.', async done => {
    const res = await request.post('/api/v1/admin/auth/register').send(authData.testAdminCorrect)
    expect(res.statusCode).toEqual(201)
    expect(res.body).toEqual({ message: 'Administratörskonto för Test Testsson skapades! Förvara dina uppgifter säkert!' })
    done()
  })

  // Register with weak password.
  it('Register admin with weak password, should return 400 Bad Request.', async done => {
    const res = await request.post('/api/v1/admin/auth/register').send(authData.testAdminIncorrectPass)
    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({
      status: 400,
      message: 'Ett säkert lösenord krävs! Krav: Minst 8 tecken av stora och små bokstäver, siffror samt symboler.' })
    done()
  })

  // Register with unauthorized email.
  it('Register admin with email that is not allowed, should return 401 Unauthorized.', async done => {
    const res = await request.post('/api/v1/admin/auth/register').send(authData.testAdminIncorrectEmail)
    expect(res.statusCode).toBe(401)
    expect(res.body).toEqual({
      status: 401,
      message: 'Ej tillåtelse att registrera!' })
    done()
  })

  // Login with correct credentials.
  it('Login correct admin, should return 200 OK.', async done => {
    await request.post('/api/v1/admin/auth/register').send(authData.testAdminCorrect)
    const loginRes = await request.post('/api/v1/admin/auth/login').send(authData.testAdminLogin)
    expect(loginRes.statusCode).toBe(200)
    loginToken = loginRes.body.token
    done()
  })

  // Login with wrong password.
  it('Login with wrong password, should return 401 Unauthorized.', async done => {
    await request.post('/api/v1/admin/auth/register').send(authData.testAdminCorrect)
    const loginRes = await request.post('/api/v1/admin/auth/login').send(authData.testAdminLoginIncorrectPass)
    expect(loginRes.statusCode).toBe(401)
    done()
  })

  // Login with wrong email.
  it('Login with wrong email, should return 401 Unauthorized.', async done => {
    await request.post('/api/v1/admin/auth/register').send(authData.testAdminCorrect)
    const loginRes = await request.post('/api/v1/admin/auth/login').send(authData.testAdminLoginIncorrectEmail)
    expect(loginRes.statusCode).toBe(401)
    done()
  })

  // Add email with correct information.
  it('Adding correct email to allowed email database, should return 201 Created.', async done => {
    const payload = {
      email: 'anothertest@email.com'
    }

    const res = await request.post('/api/v1/admin/auth/add-admin').set('Authorization', setBearerToken(loginToken)).send(payload)
    expect(res.statusCode).toBe(201)
    done()
  })

  // Add email with invalid information.
  it('Adding invalid email to allowed email database, should return 400 Bad Request.', async done => {
    const payload = {
      email: 'anothertestAtemail.com'
    }

    const res = await request.post('/api/v1/admin/auth/add-admin').set('Authorization', setBearerToken(loginToken)).send(payload)
    expect(res.statusCode).toBe(400)
    done()
  })

  // Add email with invalid token.
  it('Adding correct email with invalid token to allowed email database, should return 403 Forbidden.', async done => {
    const payload = {
      email: 'anothertest@email.com'
    }

    const res = await request.post('/api/v1/admin/auth/add-admin').set('Authorization', setBearerToken('IncorrectToken')).send(payload)
    expect(res.statusCode).toBe(403)
    done()
  })

  // Change password with correct credentials.
  it('Changing admin password with correct information, should return 200 OK.', async done => {
    await request.post('/api/v1/admin/auth/register').send(authData.testAdminCorrect)
    const loginRes = await request.post('/api/v1/admin/auth/login').send(authData.testAdminLogin)
    const payload = {
      email: 'test@email.com',
      oldPass: 'TestTestsson#1212',
      newPass: 'TestChangedTestsson#2323'
    }

    const res = await request.put('/api/v1/admin/auth/change-pass').set('Authorization', setBearerToken(loginToken)).send(payload)
    expect(res.statusCode).toBe(200)
    done()
  })

  // Change password with invalid token.
  it('Changing admin password with incorrect token, should return 403 Forbidden.', async done => {
    const payload = {
      email: 'test@email.com',
      oldPass: 'TestTestsson#1212',
      newPass: 'TestChangedTestsson#2323'
    }

    const res = await request.put('/api/v1/admin/auth/change-pass').set('Authorization', setBearerToken('IncorrectToken')).send(payload)
    expect(res.statusCode).toBe(403)
    done()
  })

  afterAll(async () => {
    process.env = OLD_ENV
    await mongoose.connection.close()
    app.close()
  })
})

const setBearerToken = (token) => {
  return `Bearer ${token}`
}