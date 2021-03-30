const { Sequelize } = require('sequelize')

const {
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_HOST,
} = require('./env')

// Sequelize

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
  },
  logging: false,
})

// Models

const User = require('./models/user')(sequelize)

module.exports = { User, sequelize }
