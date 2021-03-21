const attendance = require('./attendance')

const routePath = (path, route) => ({
    route,
    path,
})
module.exports = {
    attendance: routePath('/attendance', attendance),
}
