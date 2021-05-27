export const authData = {
  testAdminCorrect: {
    fullName: 'Test Testsson',
    email: 'test@email.com',
    pass: 'TestTestsson#1212'
  },
  testAdminIncorrectPass: {
    fullName: 'Test Testsson',
    email: 'test@email.com',
    pass: 'Test'
  },
  testAdminIncorrectEmail: {
    fullName: 'Test Testsson',
    email: 'anothertest@email.com',
    pass: 'TestTestsson#1212'
  },
  testAdminLogin: {
    email: 'test@email.com',
    pass: 'TestTestsson#1212'
  },
  testAdminLoginIncorrectPass: {
    email: 'test@email.com',
    pass: 'TestTestsson#1234'
  },
  testAdminLoginIncorrectEmail: {
    email: 'test@emails.com',
    pass: 'TestTestsson#1212'
  }
}

export const emailData = {
  testPayload: {
    fullName: 'Test Testsson',
    email: 'test@test.com',
    subject: 'Automatic test subject',
    message: 'This is an automatic test message.'
  },
  testPayloadIncorrectEmail: {
    fullName: 'Test Testsson',
    email: 'testAttest.com',
    subject: 'Automatic test subject',
    message: 'This is an automatic test message.'
  }
}

export const blogData = {
  blogAdmin: {
    email: 'test@email.com',
    pass: 'TestTestssonPass#7327'
  }
}
