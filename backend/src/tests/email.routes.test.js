/*eslint-disable */
import app from './testServer.js'
import supertest from 'supertest'
import { emailData } from './testData.js'
import dotenv from 'dotenv'
import {jest} from '@jest/globals'
dotenv.config()
const request = supertest(app)
/**
 * Email route tests.
 */
describe('Email tests', () => {
  const OLD_ENV = process.env
  beforeEach(async () => {
    jest.useFakeTimers()
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })
  // Send email with correct information.
  it('Sending email with correct information, should return 200 OK.', async done => {
    const res = await request.post('/api/v1/email').send(emailData.testPayload)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ message: 'Ditt meddelande är skickat!' })
    done()
  })

  // Send email with invalid email.
  it('Sending email with invalid email, should return 400 Bad Request.', async done => {
    const res = await request.post('/api/v1/email').send(emailData.testPayloadIncorrectEmail)
    expect(res.statusCode).toEqual(400)
    done()
  })
  afterAll(async () => {
    process.env = OLD_ENV
    app.close()
  })
})
