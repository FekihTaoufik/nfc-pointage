const attendance = require('./attendance')
const user = require('./user')
const room = require('./room')

const routePath = (path, route) => ({
    route,
    path,
})
module.exports = {
    attendance: routePath('/attendance', attendance),
    user: routePath('/user', user),
    user: routePath('/room', room),
}
