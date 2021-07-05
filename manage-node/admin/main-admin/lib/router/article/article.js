var router = require('koa-router')();

// import {dictionary_post} from 'common-admin/lib/api';


router.post('/dictionary/listAuthDictionary',async(ctx,next)=>{
  const {page,page_size,parent_id}=ctx.request.body;
  const list=await ctx.mysql.query("select * from manage.manage_article ");
  console.log(list);
  // const {pageBean,parentAuthDictionary}=await dictionary_post('/listAuthDictionary',{page,page_size,parent_id});
  ctx.body={"a":"a"};
  // ctx.body={list,total,page_size,page,parentAuthDictionary}

});


router.post('/dictionary/createAuthDictionary',async(ctx,next)=>{
  const {href,value,comment,parent_id}=ctx.request.body;
  // ctx.body=await dictionary_post('/createAuthDictionary',{href,value,comment,parent_id});
});


router.post('/dictionary/editAuthDictionary',async(ctx,next)=>{
  const {current_auth_dictionary}=ctx.request.body;
  const {href,value,comment,id}=current_auth_dictionary;
  // ctx.body=await dictionary_post('/editAuthDictionary',{href,value,comment,id});
});


router.post('/dictionary/delAuthDictionary',async(ctx,next)=>{
  const {id}=ctx.request.body;
  // ctx.body=await dictionary_post('/delAuthDictionary',{id});
});



module.exports = router;