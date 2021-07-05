var router = require('koa-router')();
import {login_required} from 'common/lib/middle/auth';

var website='/v1/website';
/**
 * 创建article
 */
router.post('/create-article',login_required,async(ctx,next)=>{
  const {article}=ctx.request.body;
  ctx.body=await ctx.postJson(website+'/create-article',{...article});
});

/**
 * 创建article
 */
router.post('/update-article',login_required,async(ctx,next)=>{
  const {article}=ctx.request.body;
  ctx.body=await ctx.postJson(website+'/update-article',{...article});
});

/**
 * 获取详情 
 */
router.post('/get-article',login_required,async(ctx,next)=>{
  const {id}=ctx.request.body;
  ctx.body=await ctx.postString(website+`/get-article/${id}`,{});
});

/**
 * article删除 
 */
router.post('/del-article',login_required,async(ctx,next)=>{
  const {id}=ctx.request.body;
  ctx.body=await ctx.postString(website+`/del-article/${id}`,{});
});

/**
 * article发布
 */
router.post('/publish-article',login_required,async(ctx,next)=>{
  const {id}=ctx.request.body;
  ctx.body=await ctx.postString(website+`/publish-article/${id}`,{});
});

/**
 * article列表
 */
router.post('/list-article',login_required,async(ctx,next)=>{
  const {page_num,page_size,type}=ctx.request.body;
  ctx.body=await ctx.postJson(website+'/list-article',{page_num,page_size,type:type==1?null:type});
});



module.exports = router;


