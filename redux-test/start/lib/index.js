import Koa from 'koa';
const app = new Koa();

import authapp from 'auth/lib/';
import commonapp from 'common/lib/';

app.use(require('koa-logger')());
app.use(require('koa-body')({ multipart: true }));
app.use(require('koa-session')({key: 'sessionId'}, app));


app.use(authapp.routes()).use(authapp.allowedMethods());
app.use(commonapp.routes()).use(commonapp.allowedMethods());



console.log("server start 4100")

app.listen(4100);