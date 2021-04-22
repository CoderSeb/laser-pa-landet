/* eslint-disable no-undef */
// Sample test file
describe('Sample Test', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test'
  })

  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})
