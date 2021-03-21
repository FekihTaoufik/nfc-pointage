const express = require('express')
const { validator, wrapAsync: wa } = require('express-server-app')
const { getRooms, roomLogin } = require('../controller/room')

const router = express.Router()

router.get('/', getRooms)

router.post('/login', roomLogin)

module.exports = router
