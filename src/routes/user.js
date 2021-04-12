const { Router } = require('express')
const { logIn } = require('../controller/auth')
const { user } = require('../controller/user')

const router = Router()

router.get('/', logIn, user)

module.exports = router
