const express = require('express')
const { validator, wrapAsync: wa } = require('express-server-app')
const { getUsers, userLogin } = require('../controller/user')

const router = express.Router()

router.get('/', getUsers)

router.post('/login', userLogin)

module.exports = router
