const express = require('express')
const { validator, wrapAsync: wa } = require('express-server-app')
const { main } = require('../controller/main')

const router = express.Router()

router.get('/', main)

module.exports = router
