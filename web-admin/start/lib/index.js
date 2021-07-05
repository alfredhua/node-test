import Koa from 'koa';
const app = new Koa();

import authapp from 'auth/lib/';
import commonapp from 'common/lib/';
import websiteapp from 'website/lib/';
import dictionaryapp from 'dictionary/lib/';

app.use(require('koa-logger')());
app.use(require('koa-body')({ multipart: true }));
app.use(require('koa-session')({key: 'sessionId'}, app));

app.use(authapp.routes())
app.use(commonapp.routes())
app.use(websiteapp.routes())
app.use(dictionaryapp.routes())

console.log("server start 4000")

app.listen(4000);