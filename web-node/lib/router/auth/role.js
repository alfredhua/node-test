var router = require('koa-router')();
import {post} from '../common/post';

const auth="/back/auth";

router.post('/auth/saveRole',async(ctx,next)=>{
  const {name,comment,keys}=ctx.request.body;
  ctx.body=await post(auth+'/saveRole',{name,comment,role_list:JSON.stringify(keys)});
});

router.post('/auth/listRoles',async(ctx,next)=>{
  const {page,pageSize}=ctx.request.body;
  ctx.body=await post(auth+'/listRoles',{page,pageSize});
});

router.post('/auth/getCirculateRole',async(ctx,next)=>{
  ctx.body=await post(auth+'/getCirculateRole',{});
});

router.post('/auth/getRoleAndAuthDictionaryList',async(ctx,next)=>{
  const {id}=ctx.request.body;
  ctx.body=await post(auth+'/getRoleAndAuthDictionaryList',{id});
});

router.post('/auth/updateRole',async(ctx,next)=>{
  const {role}=ctx.request.body;
  const {id,name,role_list,comment}=role;
  ctx.body=await post(auth+'/updateRole',{id,name,role_list,comment});
});


router.post('/auth/listAllRole',async(ctx,next)=>{
  ctx.body=await post(auth+'/listAllRole');
});

module.exports = router;