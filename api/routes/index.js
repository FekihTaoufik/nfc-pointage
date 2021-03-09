const main = require('./main')

const routePath = (path, route) => ({
    route,
    path,
})
module.exports = {
    main: routePath('/main', main),
}
