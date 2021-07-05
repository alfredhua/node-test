var router = require('koa-router')();



router.post('/dictionary/listAuthDictionary',async(ctx,next)=>{
  const {page,page_size,parent_id}=ctx.request.body;
  const list=await ctx.mysql.query("select * from manage_dictionary.dic_auth ");
  ctx.body={"a":"a"};
});


router.post('/dictionary/createAuthDictionary',async(ctx,next)=>{
  const {href,value,comment,parent_id}=ctx.request.body;
});


router.post('/dictionary/editAuthDictionary',async(ctx,next)=>{
  const {current_auth_dictionary}=ctx.request.body;
  const {href,value,comment,id}=current_auth_dictionary;
});


router.post('/dictionary/delAuthDictionary',async(ctx,next)=>{
  const {id}=ctx.request.body;
});



module.exports = router;