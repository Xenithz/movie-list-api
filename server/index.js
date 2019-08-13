const Koa = require('koa');
const Json = require('koa-json');
const config = require('./config.json');
const composedRouter = require('./routes/composer');

const app = new Koa();

app.use(Json());
app.use(composedRouter());

const server = app.listen(config.port, () => {
    console.log(`Server started listening on port: ${config.port}`);
});

module.exports = server;