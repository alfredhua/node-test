import Koa from'koa';
import db from './router/common/middle';

import article from './router/article';
import dictionary from './router/dictionary';
import auth from './router/auth';
const app = new Koa();

app.use(require('koa-bodyparser')()).use(require('koa-logger')());
app.use(db);
app.use(article.routes()).use(article.allowedMethods());
app.use(auth.routes()).use(auth.allowedMethods());
app.use(dictionary.routes()).use(dictionary.allowedMethods());

app.listen(4000);