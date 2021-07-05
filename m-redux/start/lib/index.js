import Koa from 'koa';
const app = new Koa();

import authapp from 'auth/lib/';
import commonapp from 'common/lib/';

app.use(authapp.routes()).use(authapp.allowedMethods());
app.use(commonapp.routes()).use(commonapp.allowedMethods());

export default app;