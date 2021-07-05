import Koa from 'koa';
import self from './index';
const app = new Koa();

app.use(self.routes());
app.use(self.allowedMethods());

var port=4000;
app.listen(port);

console.log('listening on port ',port);