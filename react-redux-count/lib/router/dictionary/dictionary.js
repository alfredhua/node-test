var router = require('koa-router')();
import {postJson} from '../common/api';
import {login_required} from '../common/middle/auth';

var dictionary='/v1/dictionary';
/**
 * 创建字典
 */
router.post('/create-auth-dictionary',login_required,async(ctx,next)=>{
  const {value,href,comment,parentId}=ctx.request.body;
  ctx.body=await postJson(dictionary+'/create-auth-dictionary',{value,href,comment,parentId});
});

/**
 * 字典编辑
 */
router.post('/update-auth-dictionary',login_required,async(ctx,next)=>{
  const {value,href,comment,id}=ctx.request.body;
  ctx.body=await postJson(dictionary+'/update-auth-dictionary',{value,href,comment,id});
});

/**
 * 权限列表
 */
router.post('/list-auth-dictionary',login_required,async(ctx,next)=>{
  const { pageNum, pageSize, parentId }=ctx.request.body;
  ctx.body=await postJson(dictionary+'/list-auth-dictionary',{ pageNum, pageSize, parentId });
});

/**
 * 获取字典
 */
router.post('/get-auth-dictionary',login_required,async(ctx,next)=>{
  const { id }=ctx.request.body;
  ctx.body=await postJson(dictionary+`/get-auth-dictionary/${id}`,{ });
});

/**
 * 删除字典
 */
router.post('/del-auth-dictionary',login_required,async(ctx,next)=>{
  const { id }=ctx.request.body;
  ctx.body=await postJson(dictionary+`/del-auth-dictionary/${id}`,{ });
});

/**
 * 权限树
 */
router.post('/get-circulate-role',login_required,async(ctx,next)=>{
  ctx.body=await postJson(dictionary+'/get-circulate-role',{});
});

module.exports = router;