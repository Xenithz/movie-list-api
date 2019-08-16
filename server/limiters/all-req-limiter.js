const RateLimit = require('koa2-ratelimit').RateLimit;
 
const limiter = RateLimit.middleware({
  interval: { min: 15 },
  max: 100, 
});

module.exports = limiter;