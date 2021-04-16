const express = require('express')
const { validator, wrapAsync: wa } = require('express-server-app')
const { getUsers, getUsersDemo, userLogin } = require('../controller/user')

const router = express.Router()

router.get('/', getUsers)

router.get('/demo', getUsersDemo)

router.post('/login', userLogin)

module.exports = router
