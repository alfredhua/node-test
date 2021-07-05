const Koa = require('koa');
import static_file from 'koa-static';
const bodyParser = require('koa-bodyparser');
const controller = require('./router/index');
import {view} from './view'; 
const app = new Koa();
const dev = process.env.NODE_ENV === 'dev';
const site_name=process.env.platform;
var available_code_map = new Map(new Set([400, 401, 403, 404, 500]).entries());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
      var code = available_code_map.get(err
          ? err.statusCode
          : 500) || 500;
      ctx.response.status = code;
      await ctx.view(`error/${code}`, {code, url: ctx.request.url});
    }
});
app.use(static_file(__dirname + '/' + '../dist'));

app.use(bodyParser());
app.use(view('static/'+site_name+"/views", { noCache: dev, watch: dev}));
controller(app);
const port = site_name==='pc'?5000:3000;
app.listen(port);

console.log('app started at port '+port+'...');