const combineRouters = require('koa-combine-routers');
const movieRouter = require('./movies');
const reviewRouter = require('./reviews');

const composedRouter = combineRouters(movieRouter, reviewRouter);

module.exports = composedRouter;