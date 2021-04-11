const express = require('express')
const { validator, wrapAsync: wa } = require('express-server-app')
const { getAttendances, postAttendenceStart } = require('../controller/attendance')

const router = express.Router()

router.get('/:sessionId', wa(getAttendances))

router.post('/', postAttendenceStart)

module.exports = router
