// const createError = require('http-errors')

const user = (req, res) => {
  res.status(200).json({ success: true, user: req.user })
}

module.exports = {
  user,
}
