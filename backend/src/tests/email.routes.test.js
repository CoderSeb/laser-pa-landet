/*eslint-disable */
import { app } from './server.js'
import request from 'supertest'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


// Email route test
describe('Email tests', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test'
  })

  it('Sending email', async done => {
    const testPayload = {
      fullName: 'Test Testsson',
      email: 'test@test.com',
      subject: 'Test Subject',
      message: 'A short test message'
    }
    const res = await request(app).post('/api/v1/email').send(testPayload)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ message: 'Ditt meddelande är skickat!' })
    done()
  })

  afterAll(async () => {
    await mongoose.connection.close()
    main.exit()
})
})
