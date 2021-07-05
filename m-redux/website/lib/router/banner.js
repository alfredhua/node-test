var router = require('koa-router')();
import {postJson,postString} from 'common/lib/util/api';
import {login_required} from 'common/lib/middle/auth';

var website='/v1/website';

/**
 * 创建banner
 */
router.post('/create-banner',login_required,async(ctx,next)=>{
  const {name,href,type,order,enable,url}=ctx.request.body;
  ctx.body=await postJson(website+'/create-banner',{name,href,type,order,enable,url});
});

/**
 * 创建banner
 */
router.post('/update-banner',login_required,async(ctx,next)=>{
  const {id,name,href,type,order,enable,url}=ctx.request.body;
  ctx.body=await postJson(website+'/update-banner',{id,name,href,type,order,enable,url});
});

/**
 * 获取详情 
 */
router.post('/get-banner',login_required,async(ctx,next)=>{
  const {id}=ctx.request.body;
  ctx.body=await postString(website+'/get-banner',{id});
});

/**
 * banner删除 
 */
router.post('/delete-banner',login_required,async(ctx,next)=>{
  const {id}=ctx.request.body;
  ctx.body=await postString(website+`/delete-banner/${id}`,{});
});

/**
 * banner列表
 */
router.post('/list-banner',login_required,async(ctx,next)=>{
  const {pageNum,pageSize}=ctx.request.body;
  ctx.body=await postJson(website+'/list-banner',{pageNum,pageSize});
});



module.exports = router;


