const Router = require('koa-router');
const movieRouter = new Router();
const config = require('./api_config');
const dbWrapper = require('./queries');

movieRouter.get(`${config.apiURL}/movies`, async (ctx) =>{
    const movies = await dbWrapper.getAllMovies();
    ctx.body = movies;
});

movieRouter.get(`${config.apiURL}/movies/:id`, async (ctx) =>{
    const movie = await dbWrapper.getMovieByID(ctx.params.id);
    ctx.body = movie;
});

module.exports = movieRouter;