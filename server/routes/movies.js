const Router = require('koa-router');
const movieRouter = new Router();
const config = require('./api_config');
const dbWrapper = require('./queries');

movieRouter.get(`${config.apiURL}/movies`, async (ctx, next) => {
    if(ctx.query.genre != null) {
        const movies = await dbWrapper.getMovieByGenre(ctx.query.genre);
        ctx.body = movies;
    }
    else {
        await next();
    }
});

movieRouter.get(`${config.apiURL}/movies`, async (ctx, next) => {
    if(ctx.query.title != null) {
        const movies = await dbWrapper.getMovieByTitle(ctx.query.title);
        ctx.body = movies;
    }
    else {
        await next();
    }
});

movieRouter.get(`${config.apiURL}/movies`, async (ctx, next) => {
    console.log('hey');
    if(ctx.query.director != null) {
        console.log('heyyyy');
        const movies = await dbWrapper.getMovieByDirector(ctx.query.director);
        ctx.body = movies;
    }
    else {
        await next();
    }
});

movieRouter.get(`${config.apiURL}/movies`, async (ctx) => {
    console.log('hi');
    const movies = await dbWrapper.getAllMovies();
    ctx.body = movies;
});

movieRouter.get(`${config.apiURL}/movies/:id`, async (ctx) => {
    const movie = await dbWrapper.getMovieByID(ctx.params.id);
    ctx.body = movie;
});


module.exports = movieRouter;