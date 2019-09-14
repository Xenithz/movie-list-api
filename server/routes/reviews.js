const Router = require('koa-router');
const reviewRouter = new Router();
const config = require('./api_config');
const dbWrapper = require('./review-queries');

reviewRouter.get(`${config.apiURL}/reviews`, async (ctx, next) => {
    try {
        if(ctx.query.reviewer != null) {
            const reviews = await dbWrapper.getReviewsByReviewer(ctx.query.reviewer);
            ctx.body = reviews;
        }
        else {
            await next();
        }
    }
    catch (error) {
        console.log(error);
        ctx.throw(500, 'Error message');
    }
});

reviewRouter.get(`${config.apiURL}/reviews`, async (ctx, next) => {
    try {
        if(ctx.query.score != null) {
            const reviews = await dbWrapper.getReviewsByScore(ctx.query.score);
            ctx.body = reviews;
        }
        else {
            await next();
        }
    }
    catch (error) {
        console.log(error);
        ctx.throw(500, 'Error message');
    }
});

reviewRouter.get(`${config.apiURL}/reviews`, async (ctx, next) => {
    try {
        if(ctx.query.moviename != null) {
            const reviews = await dbWrapper.getReviewsByMovieName(ctx.query.moviename);
            ctx.body = reviews;
        }
        else {
            await next();
        }
    }
    catch (error) {
        console.log(error);
        ctx.throw(500, 'Error message');
    }
});

reviewRouter.get(`${config.apiURL}/reviews`, async (ctx) => {
    try {
        const reviews = await dbWrapper.getAllReviews();
        ctx.body = reviews;
    }
    catch (error) {
        console.log(error);
        ctx.throw(500, 'Error message');
    }
});

reviewRouter.get(`${config.apiURL}/reviews/:refCode`, async (ctx, next) => {
    try {
        if(ctx.params.refCode != null) {
            const review = await dbWrapper.getReviewByReferal(ctx.params.refCode);
            ctx.body = review;
        }
        else {
            await next();
        }
    }
    catch (error) {
        console.log(error);
        ctx.throw(500, 'Error message');
    }
});

reviewRouter.post(`${config.apiURL}/reviews`, async (ctx) => {
    try {
        const response = await dbWrapper.insertIntoTable(ctx.request.body);
        ctx.body = response;
    }
    catch (error) {
        console.log(error);
        ctx.throw(500, 'Error message');
    }
});

reviewRouter.put(`${config.apiURL}/reviews/:refCode`, async (ctx) => {
    try {
        const response = await dbWrapper.updateOrCreateReview( ctx.request.body, ctx.params.refCode);
        ctx.body = response;
    }
    catch (error) {
        console.log(error);
        ctx.throw(500, 'Error message');
    }
});

reviewRouter.delete(`${config.apiURL}/reviews/:refCode`, async (ctx) => {
    try {
        const response = await dbWrapper.deleteReview(ctx.params.refCode);
        ctx.body = response;
    }
    catch (error) {
        console.log(error);
        ctx.throw(500, 'Error message');
    }
});

module.exports = reviewRouter;