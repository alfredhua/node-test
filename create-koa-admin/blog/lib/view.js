const router = require('koa-router')();
const send = require('koa-send');

const path=require('path')

const send_options= { root:path.resolve(__dirname, '../build/')};

router.get('/blog/:path*', async(ctx, next)=>{
  let {path}=ctx.params;
  if(path){
    await send(ctx, '/index.html', send_options);
  }
});

router.get('/static/blog/:path*', async(ctx, next)=>{
  let {path}=ctx.params;
  if(path){
    await send(ctx, path, send_options);
  }
});

module.exports={ view:router }