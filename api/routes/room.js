const express = require('express')
const { validator, wrapAsync: wa } = require('express-server-app')
const { getCurrentSession, getRooms, roomLogin } = require('../controller/room')

const router = express.Router()

router.get('/', getRooms)

router.get('/current-session/:roomId',
validator().validate({
    params: {
        type: 'object',
		additionalProperties: false,
        properties: {
            roomId: { type: 'string'},
        },
        required: ['roomId']
    }
}),
wa(getCurrentSession))

router.post('/login', roomLogin)

module.exports = router
