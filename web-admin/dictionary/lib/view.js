import path from 'path';
const send = require('koa-send');

const view_path=path.resolve(__dirname, '../dist/static/dictionary');
const send_options={root:view_path};

const router = require('koa-router')();

router.redirect('/', '/auth', 307);

router.get('/dictionary/:path*',async (ctx,next)=> {
  console.log("--------dictionary-----------")
  await send(ctx, '/index.html', send_options);
});

router.get('/static/dictionary/:path*', async(ctx, next)=>{
  let {path}=ctx.params;
  if(path){
    await send(ctx, path, send_options);
  }
})

export default router;