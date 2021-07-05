const Koa =require('koa')
const app = new Koa();

app.use(require('koa-logger')());
app.use(require('koa-body')({ multipart: true }));
app.use(require('koa-session')({key: 'sessionId'}, app));
app.use(require('auth/lib/').routes())
app.use(require('website/lib').routes())
app.use(require('common/lib').routes())
app.use(require('blog/lib').routes())
app.use(require('dictionary/lib').routes())

app.listen(4000);

console.log("admin server start 4000")

 