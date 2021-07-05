var router = require('koa-router')();
import {postJson} from 'common/lib/util/api';
import {login_required} from 'common/lib/middle/auth';

var auth='/v1/auth';

/**
 * 管理员列表
 */
router.post('/list-admin',login_required,async(ctx,next)=>{
   let {page_num,page_size,user_name,phone}=ctx.request.body;
   if(user_name){
    user_name=null;
   }
   if(phone){
       phone=null;
   }
   ctx.body=await postJson(auth+'/list-admin',{page_num,page_size,user_name,phone});
});

/**
 * 创建管理员
 */
router.post('/create-admin',login_required,async(ctx,next)=>{
  const {user_name,password,email,phone,role_id_list,status}=ctx.request.body;
  ctx.body=await postJson(auth+'/create-admin',{user_name,password,email,phone,role_id_list,status});
});

/**
 * 管理员更新
 */
router.post('/update-admin',login_required,async(ctx,next)=>{
    const {id,user_name,password,email,phone,role_id_list,status}=ctx.request.body;
    ctx.body=await postJson(auth+'/update-admin',{id,user_name,password,email,phone,role_id_list,status});
});

/**
 * 管理员信息
 */
router.post('/get-admin-by-id',login_required,async(ctx,next)=>{
    const {id}=ctx.request.body;
    ctx.body=await postJson(auth+`/get-admin-by-id/${id}`,{});
});

module.exports = router;