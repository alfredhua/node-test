import Koa from'koa';
import bodyParser from 'koa-bodyparser';
import index from './router/index';
import templating from './templating';
import filters from './filters';
const serve = require('koa-static');
import mount from 'koa-mount';

const app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';

app.use(bodyParser());
app.use(require('koa-logger')());

app.use(mount('/bzr/static', serve(__dirname+ '/'+ '../bzr/static')));

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction,
    filters:filters
}));

index(app);


export default app;

// app.listen(7405);

// console.log('site started at port 7405...');