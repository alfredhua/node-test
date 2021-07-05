var router = require('koa-router')();
import {postJson} from 'common/lib/util/api';
import {login_required} from 'common/lib/middle/auth';
var auth='/v1/auth';


/**
 * 根据id获取角色
 */
router.post('/get-role-by-id',login_required,async(ctx,next)=>{
  const {id}=ctx.request.body;
  ctx.body=await postJson(auth+`/get-role-by-id/${id}`,{});
});

/**
 * 获取所有可用的角色
 */
router.post('/list-all-use-role',login_required,async(ctx,next)=>{
  ctx.body=await postJson(auth+'/list-all-use-role',{});
});

/**
 * 角色更新
 */
router.post('/update-role',login_required,async(ctx,next)=>{
  const {id,name,comment,authList}=ctx.request.body;
  ctx.body=await postJson(auth+'/update-role',{id,name,comment,authList:JSON.stringify(authList)});
});

/**
 * 创建角色
 */
router.post('/create-role',login_required,async(ctx,next)=>{
  const {name,comment,authList}=ctx.request.body;
  console.log(authList);
  ctx.body=await postJson(auth+'/create-role',{name,comment,authList:JSON.stringify(authList)});
});

/**
 * 角色列表
 */
router.post('/list-role',async(ctx,next)=>{
  const {pageNum,pageSize}=ctx.request.body;
  ctx.body=await postJson(auth+'/list-role',{pageNum,pageSize});
});

/**
 * 角色禁用,启用
 */
router.post('/update-role-status',async(ctx,next)=>{
  const {id,status}=ctx.request.body;
  ctx.body=await postJson(auth+'/update-role-status',{id,status});
});




module.exports = router;