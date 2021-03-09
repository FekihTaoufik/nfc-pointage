const { config, log } = require('express-server-app');
const express = require('express');

const allRoutes = require('./routes');

const api = express.Router();
const logger = log();

const prefix = '/api';

Object.keys(allRoutes).forEach((key) => {
	const {route, path} = allRoutes[key];
	logger.info(`la route "${prefix}${path}" a été créée `);
	api.use(`${prefix}${path}`, route);
});



api.use((req, res, next) => {
	res.header('X-Robots-Tag', 'none');
	next();
});

api.use('/check', (req, res) => {
	res.json('Hello ! You are using Swabahadine Assignement API.');
});

module.exports = api;
