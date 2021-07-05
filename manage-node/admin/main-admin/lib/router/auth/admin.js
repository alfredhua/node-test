var router = require('koa-router')();

router.post('/auth/listAdmin',async(ctx,next)=>{
   const {page,page_size,phone,user_name}=ctx.request.body;
  //  ctx.body=await auth_post('/listAdmin',{page,page_size,phone,user_name});
});


router.post('/auth/saveAdmin',async(ctx,next)=>{
  const {admin}=ctx.request.body;
  const {id,user_name,email,phone,password,is_active,checked}=admin;
  // if(id){
  //   ctx.body=await auth_post('/updateAdmin',{id,user_name,email,phone,password,is_active,role_list_json:JSON.stringify(checked)});
  // }else{
  //    ctx.body=await auth_post('/saveAdmin',{user_name,email,phone,password,is_active,role_list_json:JSON.stringify(checked)});
  // }
});

router.post('/auth/getAdminById',async(ctx,next)=>{
    const {id}=ctx.request.body;
    // ctx.body=await auth_post('/getAdminById',{id});
});


router.post('/auth/frozenAdmin',async(ctx,next)=>{
    const {id,active}=ctx.request.body;
    // ctx.body=await auth_post('/updateActiveAdmin',{id,active});
});



module.exports = router;