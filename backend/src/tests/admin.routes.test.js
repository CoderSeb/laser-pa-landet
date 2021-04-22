/*eslint-disable */
// Imports
import { app } from './server.js'
import request from 'supertest'
import mongoose from 'mongoose'
import { connectTestDB } from '../config/mongo.js'
import { AllowedEmail } from '../models/allowedEmail.js'
import { Admin } from '../models/Admin.js'
import dotenv from 'dotenv'

// Config .env
dotenv.config()

const testAdminCorrect = {
  fullName: "Test Testsson",
  email: "test@email.com",
  pass: "TestTestsson#1212"
}

const testAdminIncorrectPass = {
  fullName: "Test Testsson",
  email: "test@email.com",
  pass: "Test"
}

const testAdminIncorrectEmail = {
  fullName: "Test Testsson",
  email: "anothertest@email.com",
  pass: "TestTestsson#1212"
}

const testAdminLogin = {
  email: "test@email.com",
  pass: "TestTestsson#1212"
}

describe('Admin routes tests', () => {
  let loginToken
  beforeEach(async () => {
    await connectTestDB()
    await AllowedEmail.deleteMany()
    await Admin.deleteMany()
    await AllowedEmail.insertMany({ email: "test@email.com" })
  })

  it('Register correct admin', async done => {
    const res = await request(app).post('/api/v1/admin/auth/register').send(testAdminCorrect)
    expect(res.statusCode).toEqual(201)
    expect(res.body).toEqual({ message: 'Administratörskonto för Test Testsson skapades! Förvara dina uppgifter säkert!' })
    done()
  })

  it('Register admin with weak password', async done => {
    const res = await request(app).post('/api/v1/admin/auth/register').send(testAdminIncorrectPass)
    expect(res.statusCode).toBe(400)
    expect(res.body).toEqual({
      status: 400,
      message: 'Ett säkert lösenord krävs! Krav: Minst 8 tecken av stora och små bokstäver, siffror samt symboler.' })
    done()
  })

  it('Register admin with email that is not allowed', async done => {
    const res = await request(app).post('/api/v1/admin/auth/register').send(testAdminIncorrectEmail)
    expect(res.statusCode).toBe(401)
    expect(res.body).toEqual({
      status: 401,
      message: 'Ej tillåtelse att registrera!' })
    done()
  })

  it('Login correct admin', async done => {
    await request(app).post('/api/v1/admin/auth/register').send(testAdminCorrect)
    const loginRes = await request(app).post('/api/v1/admin/auth/login').send(testAdminLogin)
    expect(loginRes.statusCode).toBe(200)
    loginToken = loginRes.body.token
    done()
  })
})