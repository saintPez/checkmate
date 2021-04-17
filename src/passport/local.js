const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const bcrypt = require('bcrypt')

const { Op } = require('sequelize')

const User = require('../models/user')
const Provider = require('../models/provider')

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const provider = await Provider.findOne({ where: { provider_id: email } })
      if (provider)
        return done(null, false, { message: 'Email already in use' })
      const newUser = await User.create({
        email,
        username: req.body.name,
      })
      const salt = await bcrypt.genSalt(10)
      await Provider.create({
        user_id: newUser.id,
        provider: 'local',
        provider_id: email,
        name: newUser.username,
        password: await bcrypt.hash(password, salt),
      })
      return done(null, newUser)
    }
  )
)

passport.use(
  'local-signin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const provider = await Provider.findOne({
        where: { [Op.and]: [{ provider: 'local' }, { provider_id: email }] },
      })
      if (!provider || !(await bcrypt.compare(password, provider?.password)))
        return done(null, false, { message: 'Wrong email or password' })
      const user = await User.findOne({ where: { id: provider.user_id } })
      return done(null, user)
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({ where: { id: id } })
  done(null, user)
})
