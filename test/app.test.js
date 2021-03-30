const app = require('../src/app')
const supertest = require('supertest')

const api = supertest(app)

describe('GENERAL TEST', () => {
  test('GET "/"', async () => {
    const res = await api.get('/').expect(200).expect('Content-Type', /json/)
    expect(res.body).toEqual({})
  })
})
