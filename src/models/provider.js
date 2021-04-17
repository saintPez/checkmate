const { sequelize } = require('../database')
const { DataTypes } = require('sequelize')

const Provider = sequelize.define('provider', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  provider_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
})

module.exports = Provider
