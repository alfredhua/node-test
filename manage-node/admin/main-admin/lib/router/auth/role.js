var router = require('koa-router')();
// import {auth_post} from 'common-admin/lib/api';

router.post('/auth/saveRole',async(ctx,next)=>{
  const {name,comment,keys}=ctx.request.body;
  // ctx.body=await auth_post('/saveRole',{name,comment,role_list:JSON.stringify(keys)});
});

router.post('/auth/listRoles',async(ctx,next)=>{
  const {page,pageSize}=ctx.request.body;
  const list=await ctx.mysql.query("select * from manage.manage_auth");
  console.log("list",list);
  // ctx.body=await auth_post('/listRoles',{page,pageSize});
});

router.post('/auth/getCirculateRole',async(ctx,next)=>{
  // ctx.body=await auth_post('/getCirculateRole',{});
});

router.post('/auth/getRoleAndAuthDictionaryList',async(ctx,next)=>{
  const {id}=ctx.request.body;
  // ctx.body=await auth_post('/getRoleAndAuthDictionaryList',{id});
});

router.post('/auth/updateRole',async(ctx,next)=>{
  const {role}=ctx.request.body;
  const {id,name,role_list,comment}=role;
  // ctx.body=await auth_post('/updateRole',{id,name,role_list,comment});
});


router.post('/auth/listAllRole',async(ctx,next)=>{
  // ctx.body=await auth_post('/listAllRole');
});

module.exports = router;