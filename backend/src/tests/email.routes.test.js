/*eslint-disable */
import { app } from './testServer.js'
import request from 'supertest'
import { emailData } from './testData.js'
import dotenv from 'dotenv'
dotenv.config()


// Email route test
describe('Email tests', () => {
  it('Sending email with correct information, should return 200 OK.', async done => {
    const res = await request(app).post('/api/v1/email').send(emailData.testPayload)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ message: 'Ditt meddelande är skickat!' })
    done()
  })


  it('Sending email with invalid email, should return 400 Bad Request.', async done => {
    const res = await request(app).post('/api/v1/email').send(emailData.testPayloadIncorrectEmail)
    expect(res.statusCode).toEqual(400)
    done()
  })
})
