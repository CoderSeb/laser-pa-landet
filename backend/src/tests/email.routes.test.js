/*eslint-disable */
import { app } from './testServer.js'
import request from 'supertest'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


const testPayload = {
  fullName: 'Test Testsson',
  email: 'test@test.com',
  subject: 'Automatic test subject',
  message: 'This is an automatic test message.'
}

const testPayloadIncorrectEmail = {
  fullName: 'Test Testsson',
  email: 'testAttest.com',
  subject: 'Automatic test subject',
  message: 'This is an automatic test message.'
}

// Email route test
describe('Email tests', () => {
  it('Sending email', async done => {
    const res = await request(app).post('/api/v1/email').send(testPayload)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ message: 'Ditt meddelande är skickat!' })
    done()
  })


  it('Sending email with invalid email', async done => {
    const res = await request(app).post('/api/v1/email').send(testPayloadIncorrectEmail)
    expect(res.statusCode).toEqual(400)
    done()
  })
})
