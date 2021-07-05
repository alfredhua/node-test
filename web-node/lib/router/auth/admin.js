var router = require('koa-router')();
import {post} from '../common/post';

// router.post('/auth/listAdmin',async(ctx,next)=>{
//    const {page,pageSize}=ctx.request.body;
//    console.log(page,pageSize);
//    ctx.body=await post('/back/auth/listAdmin',{page,page_size:10});
// });

const auth="/back/auth";

router.post('/auth/listAdmin',async(ctx,next)=>{
  const {page,page_size,phone,user_name}=ctx.request.body;
  ctx.body=await post(auth+'/listAdmin',{page,page_size,phone,user_name});
});


router.post('/auth/saveAdmin',async(ctx,next)=>{
 const {admin}=ctx.request.body;
 const {id,user_name,email,phone,password,is_active,checked}=admin;
 if(id){
   ctx.body=await post(auth+'/updateAdmin',{id,user_name,email,phone,password,is_active,role_list_json:JSON.stringify(checked)});
 }else{
    ctx.body=await post(auth+'/saveAdmin',{user_name,email,phone,password,is_active,role_list_json:JSON.stringify(checked)});
 }
});

router.post('/auth/getAdminById',async(ctx,next)=>{
   const {id}=ctx.request.body;
   ctx.body=await post(auth+'/getAdminById',{id});
});


router.post('/auth/frozenAdmin',async(ctx,next)=>{
   const {id,active}=ctx.request.body;
   ctx.body=await post(auth+'/updateActiveAdmin',{id,active});
});


module.exports = router;