const combineRouters = require('koa-combine-routers');
const movieRouter = require('./movies');

const composedRouter = combineRouters(movieRouter);

module.exports = composedRouter;