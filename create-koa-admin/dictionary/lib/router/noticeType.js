var router = require('koa-router')();
const { login_required } = require('common/lib/middle/auth');


var dictionary='/v1/dictionary';
/**
 * 创建文章字典
 */
router.post('/create-notice-type',login_required,async(ctx,next)=>{
  const {name,type}=ctx.request.body;
  ctx.body=await ctx.postJson(dictionary+'/create-notice-type',{name,type});
});

/**
 * 文章字典列表
 */
router.post('/list-notice-type-by-page',login_required,async(ctx,next)=>{
  const { pageNum, pageSize }=ctx.request.body;
  ctx.body=await ctx.postJson(dictionary+'/list-notice-type-by-page',{pageNum, pageSize});
});

/**
 * 文章字典列表
 */
router.post('/update-notice-type',login_required,async(ctx,next)=>{
  const {id,name,type}=ctx.request.body;
  ctx.body=await ctx.postJson(dictionary+'/update-notice-type',{id,name,type});
});

/**
 * 文章字典列表
 */
router.post('/update-notice-type-status',login_required,async(ctx,next)=>{
  const {id,status}=ctx.request.body;
  ctx.body=await ctx.postJson(dictionary+`/update-notice-type-status`,{id,status});
});

/**
 * 所有文章类型
 */
router.post('/list-all-notice-type',login_required,async(ctx,next)=>{
  ctx.body=await ctx.postJson(dictionary+`/list-all-notice-type`,{});
});
/**
 * 所有激活的类型
 */
router.post('/list-active-notice-type',login_required,async(ctx,next)=>{
  ctx.body=await ctx.postJson(dictionary+`/list-active-notice-type`,{});
});



module.exports = router;
