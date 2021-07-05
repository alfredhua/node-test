var router = require('koa-router')();
import {login_required} from 'common/lib/middle/auth';

var website='/v1/website';

router.post('/list-setting',login_required,async(ctx,next)=>{
  const {page_num,page_size}=ctx.request.body;
  ctx.body=await ctx.postJson(website+'/list-setting',{page_num,page_size});
});

router.post('/update-setting-status',login_required,async(ctx,next)=>{
  const {id,status}=ctx.request.body;
  ctx.body=await ctx.postJson(website+'/update-setting-status',{id,status});
});



module.exports = router;


