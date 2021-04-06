const { api, sequelize, agent } = require('./utils')

beforeAll(() => sequelize.sync({ force: true }).then())

afterAll(() => sequelize.close())

describe('GENERAL TEST', () => {
  test('GET "/"', async () => {
    const res = await api.get('/').expect(200).expect('Content-Type', /json/)
    expect(res.body).toEqual({})
  })
})

describe('AUTH TEST', () => {
  test('GET "api/auth/user" without signin', () => {
    return new Promise((resolve, reject) => {
      api
        .get('/api/auth/user')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(401)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).toStrictEqual({
            success: false,
            status: 401,
            name: 'UnauthorizedError',
            message: 'Missing authorization',
          })
          return resolve()
        })
        .catch((err) => {
          return reject(err)
        })
    })
  })

  test('POST "api/auth/signup"', () => {
    return new Promise((resolve, reject) => {
      api
        .post('/api/auth/signup')
        .send({
          email: 'test@test.com',
          password: 'test',
          username: 'test',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.user).toHaveProperty('id')
          return resolve()
        })
        .catch((err) => {
          return reject(err)
        })
    })
  })

  test('POST "api/auth/signin"', () => {
    return new Promise((resolve, reject) => {
      agent
        .post('/api/auth/signin')
        .send({
          email: 'test@test.com',
          password: 'test',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.user).toHaveProperty('id')
          return resolve()
        })
        .catch((err) => {
          return reject(err)
        })
    })
  })

  test('GET "api/auth/user" with signin', () => {
    return new Promise((resolve, reject) => {
      agent
        .get('/api/auth/user')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.user).toHaveProperty('id')
          return resolve()
        })
        .catch((err) => {
          return reject(err)
        })
    })
  })
})
