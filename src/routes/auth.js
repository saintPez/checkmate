const { Router } = require('express')
const passport = require('passport')

const createError = require('http-errors')

const router = Router()

router.get('/signin', (req, res, next) => {
  passport.authenticate('local-signin', (error, user, options) => {
    if (error) return next(createError(500, error))
    if (!user) return next(createError(401, options))
    req.logIn(user, (err) => {
      if (err) {
        return next(createError(500, error))
      }
      return res.json({ user })
    })
  })(req, res, next)
})

router.get('/signup', (req, res, next) => {
  passport.authenticate('local-signup', (error, user, options) => {
    if (error) next(createError(500, error))
    if (!user) return next(createError(401, options))
    req.logIn(user, (err) => {
      if (err) {
        return next(createError(500, error))
      }
      return res.status(201).json({ user })
    })
  })(req, res, next)
})

router.get('/test', (req, res) => {
  res.json({ user: req.user })
})

module.exports = router
