const Koa = require('koa');
const Json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const config = require('./config.json');
const composedRouter = require('./routes/composer');
const limiter = require('./limiters/all-req-limiter');

const app = new Koa();

app.use(Json());
app.use(bodyParser());
app.use(limiter);
app.use(composedRouter());

const server = app.listen(process.env.PORT || config.port, () => {
    console.log(`Server started listening on port: ${config.port}`);
});

module.exports = server;