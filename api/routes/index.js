const main = require('./main')
const attendance = require('./attendance')

const routePath = (path, route) => ({
    route,
    path,
})
module.exports = {
    main: routePath('/main', main),
    attendance: routePath('/attendance', attendance),
}
