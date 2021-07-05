var router = require('koa-router')();
import {postJson} from '../common/api';
import {login_required} from '../common/middle/auth';

var auth='/v1/auth';

/**
 * 管理员列表
 */
router.post('/list-admin',login_required,async(ctx,next)=>{
   let {pageNum,pageSize,userName,phone}=ctx.request.body;
   if(userName){
       userName=null;
   }
   if(phone){
       phone=null;
   }
   ctx.body=await postJson(auth+'/list-admin',{pageNum,pageSize,userName,phone});
});

/**
 * 创建管理员
 */
router.post('/create-admin',login_required,async(ctx,next)=>{
  const {userName,password,email,phone,roleIdList,status}=ctx.request.body;
  ctx.body=await postJson(auth+'/create-admin',{userName,password,email,phone,roleIdList,status});
});

/**
 * 管理员更新
 */
router.post('/update-admin',login_required,async(ctx,next)=>{
    const {id,userName,password,email,phone,roleIdList,status}=ctx.request.body;
    ctx.body=await postJson(auth+'/update-admin',{id,userName,password,email,phone,roleIdList,status});
});

/**
 * 管理员信息
 */
router.post('/get-admin-by-id',login_required,async(ctx,next)=>{
    const {id}=ctx.request.body;
    ctx.body=await postJson(auth+`/get-admin-by-id/${id}`,{});
});

module.exports = router;