var router = require('koa-router')();
import {login_required} from 'common/lib/middle/auth';

var dictionary='/v1/dictionary';
/**
 * 创建文章字典
 */
router.post('/create-article-type',login_required,async(ctx,next)=>{
  const {name,type}=ctx.request.body;
  ctx.body=await ctx.postJson(dictionary+'/create-article-type',{name,type});
});

/**
 * 文章字典列表
 */
router.post('/list-article-type-by-page',login_required,async(ctx,next)=>{
  const { pageNum, pageSize }=ctx.request.body;
  ctx.body=await ctx.postJson(dictionary+'/list-article-type-by-page',{pageNum, pageSize});
});

/**
 * 文章字典列表
 */
router.post('/update-article-type',login_required,async(ctx,next)=>{
  const {id,name,type}=ctx.request.body;
  ctx.body=await ctx.postJson(dictionary+'/update-article-type',{id,name,type});
});

/**
 * 文章字典列表
 */
router.post('/update-article-type-status',login_required,async(ctx,next)=>{
  const {id,status}=ctx.request.body;
  ctx.body=await ctx.postJson(dictionary+`/update-article-type-status`,{id,status});
});

/**
 * 所有文章类型
 */
router.post('/list-all-article-type',login_required,async(ctx,next)=>{
  ctx.body=await ctx.postJson(dictionary+`/list-all-article-type`,{});
});
/**
 * 所有激活的类型
 */
router.post('/list-active-article-type',login_required,async(ctx,next)=>{
  ctx.body=await ctx.postJson(dictionary+`/list-active-article-type`,{});
});



module.exports = router;
