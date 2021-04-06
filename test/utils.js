const { config } = require('dotenv')
config({ path: `.env.${process.env.NODE_ENV}` })

const app = require('../src/app')
const { sequelize } = require('../src/database')
const supertest = require('supertest')

const api = supertest(app)
const agent = supertest.agent(app)

module.exports = {
  api,
  sequelize,
  agent,
}
