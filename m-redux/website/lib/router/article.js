var router = require('koa-router')();
import {postJson,postString} from 'common/lib/util/api';
import {login_required} from 'common/lib/middle/auth';

var website='/v1/website';
/**
 * 创建article
 */
router.post('/create-article',login_required,async(ctx,next)=>{
  const {article}=ctx.request.body;
  ctx.body=await postJson(website+'/create-article',{...article});
});

/**
 * 创建article
 */
router.post('/update-article',login_required,async(ctx,next)=>{
  const {article}=ctx.request.body;
  ctx.body=await postJson(website+'/update-article',{...article});
});

/**
 * 获取详情 
 */
router.post('/get-article',login_required,async(ctx,next)=>{
  const {id}=ctx.request.body;
  ctx.body=await postString(website+`/get-article/${id}`,{});
});

/**
 * article删除 
 */
router.post('/del-article',login_required,async(ctx,next)=>{
  const {id}=ctx.request.body;
  ctx.body=await postString(website+`/del-article/${id}`,{});
});

/**
 * article发布
 */
router.post('/publish-article',login_required,async(ctx,next)=>{
  const {id}=ctx.request.body;
  ctx.body=await postString(website+`/publish-article/${id}`,{});
});

/**
 * article列表
 */
router.post('/list-article',login_required,async(ctx,next)=>{
  const {pageNum,pageSize}=ctx.request.body;
  ctx.body=await postJson(website+'/list-article',{pageNum,pageSize});
});



module.exports = router;


