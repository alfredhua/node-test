const test = require('./test');
function use_router(app){
  app.use(test.routes()).use(test.allowedMethods());
}

module.exports = use_router;


