const Router = require('koa-router');
const movieRouter = new Router();
const config = require('./api_config');
const dbWrapper = require('./movie-queries');

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
    if(ctx.query.director != null) {
        const movies = await dbWrapper.getMovieByDirector(ctx.query.director);
        ctx.body = movies;
    }
    else {
        await next();
    }
});

movieRouter.get(`${config.apiURL}/movies`, async (ctx) => {
    const movies = await dbWrapper.getAllMovies();
    ctx.body = movies;
});

movieRouter.get(`${config.apiURL}/movies/:id`, async (ctx) => {
    const movie = await dbWrapper.getMovieByID(ctx.params.id);
    ctx.body = movie;
});

movieRouter.post(`${config.apiURL}/movies`, async (ctx) => {
    const response = await dbWrapper.createNewMovie(ctx.request.body);
    ctx.body = response;
});

movieRouter.put(`${config.apiURL}/movies/:id`, async (ctx) => {
    const response = await dbWrapper.updateOrCreateMovie(ctx.request.body, ctx.params.id);
    ctx.body = response;
});

movieRouter.delete(`${config.apiURL}/movies/:id`, async (ctx) => {
    const response = await dbWrapper.deleteMovie(ctx.params.id);
    ctx.body = response;
});

module.exports = movieRouter;