const attendance = require('./attendance')
const user = require('./user')
const room = require('./room')
const session = require('./session')

const routePath = (path, route) => ({
  route,
  path,
})
module.exports = {
  attendance: routePath('/attendance', attendance),
  user: routePath('/user', user),
  room: routePath('/room', room),
  session: routePath('/session', session),
}
