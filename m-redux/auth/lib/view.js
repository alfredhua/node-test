import path from 'path';
const send = require('koa-send');

const view_path=path.resolve(__dirname, '../dist/auth/');
const send_options={root:view_path};

const router = require('koa-router')();

router.get('/auth/:path*',async (ctx,next)=> {
  await send(ctx, '/index.html', send_options);
});

router.get('/src/auth/:path*', async(ctx, next)=>{
  let {path}=ctx.params;
  if(path){
    await send(ctx, path, send_options);
  }
})

export default router;

