const express = require('express')
const { validator, wrapAsync: wa } = require('express-server-app')
const { getAttendances } = require('../controller/attendance')

const router = express.Router()

router.get('/', getAttendances)

module.exports = router
