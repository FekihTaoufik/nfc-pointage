const { log } = require('express-server-app');

const logger = log();
const app = require('./app');

const {PORT} = process.env;
logger.info(`App running on port http://localhost:${PORT}`);
app.start(PORT);
