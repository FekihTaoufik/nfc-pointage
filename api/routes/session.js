const express = require('express')
const { validator, wrapAsync: wa } = require('express-server-app')
const { createDemoSession } = require('../controller/session')

const router = express.Router()

router.post('/create-demo', createDemoSession)

module.exports = router
