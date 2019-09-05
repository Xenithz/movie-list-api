const Router = require('koa-router');
const reviewRouter = new Router();
const config = require('./api_config');
const dbWrapper = require('./review-queries');

reviewRouter.get(`${config.apiURL}/reviews`, async (ctx, next) => {
    if(ctx.query.refcode != null) {
        const review = await dbWrapper.getReviewByReferal(ctx.query.refcode);
        ctx.body = review;
    }
    else {
        await next();
    }
});

reviewRouter.get(`${config.apiURL}/reviews`, async (ctx, next) => {
    if(ctx.query.reviewer != null) {
        const reviews = await dbWrapper.getReviewsByReviewer(ctx.query.reviewer);
        ctx.body = reviews;
    }
    else {
        await next();
    }
});

reviewRouter.get(`${config.apiURL}/reviews`, async (ctx, next) => {
    if(ctx.query.score != null) {
        const reviews = await dbWrapper.getReviewsByScore(ctx.query.score);
        ctx.body = reviews;
    }
    else {
        await next();
    }
});

reviewRouter.get(`${config.apiURL}/reviews`, async (ctx, next) => {
    if(ctx.query.moviename != null) {
        const reviews = await dbWrapper.getReviewsByMovieName(ctx.query.moviename);
        ctx.body = reviews;
    }
    else {
        await next();
    }
});

reviewRouter.get(`${config.apiURL}/reviews`, async (ctx, next) => {
    const reviews = await dbWrapper.getAllReviews();
    ctx.body = reviews;
});

module.exports = reviewRouter;