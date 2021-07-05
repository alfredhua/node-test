import Koa from'koa';
import self from './router';
const app = new Koa();
const session = require('koa-session');
const koaBody = require('koa-body');

const CONFIG = {
  key: 'sessionId'
};


app.use(require('koa-logger')());
app.use(koaBody({ multipart: true }));
app.use(self.routes()).use(self.allowedMethods());
app.use(session(CONFIG, app));


console.log("server start 4100")
app.listen(4100);