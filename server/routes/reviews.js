const Router = require('koa-router');
const reviewRouter = new Router();
const config = require('./api_config');
const dbWrapper = require('./review-queries');

reviewRouter.get(`${config.apiURL}/reviews`, async (ctx, next) => {
    const reviews = await dbWrapper.getAllReviews();
    ctx.body = reviews;
});

module.exports = reviewRouter;