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

describe('Admin routes tests', () => {
  beforeAll(async () => {
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
})