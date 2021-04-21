/*eslint-disable */
import { main } from '../server.js'
import request from 'supertest'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const testPayload = JSON.stringify({
  fullName: 'Test Testsson',
  email: 'test@test.com',
  subject: 'Test Subject',
  message: 'A short test message'
})
// Email route test
describe('Email tests', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test'
  })
  test('Sending email', async done => {
    const res = await request(main).post('/api/v1/email').send(testPayload)
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ message: 'Ditt meddelande är skickat!' })
    done()
  })

  afterAll(async () => {
    await mongoose.connection.close()
    main.exit()
})
})
