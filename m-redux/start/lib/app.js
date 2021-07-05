import app from './index';


app.use(require('koa-logger')());
app.use(require('koa-body')({ multipart: true }));
app.use(require('koa-session')({key: 'sessionId'}, app));


console.log("server start 4100")
app.listen(4100);