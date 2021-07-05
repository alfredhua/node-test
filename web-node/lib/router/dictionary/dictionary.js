var router = require('koa-router')();

import {post} from '../common/post';


router.post('/dictionary/listAuthDictionary',async(ctx,next)=>{
  const {page,page_size,parent_id}=ctx.request.body;
  const {pageBean,parentAuthDictionary}=await post('/back/dictionary/listAuthDictionary',{page,page_size,parent_id});
  const {list,total}=pageBean;
  ctx.body={list,total,page_size,page,parentAuthDictionary}

});


router.post('/dictionary/createAuthDictionary',async(ctx,next)=>{
  const {href,value,comment,parent_id}=ctx.request.body;
  ctx.body=await post('/back/dictionary/createAuthDictionary',{href,value,comment,parent_id});
});


router.post('/dictionary/editAuthDictionary',async(ctx,next)=>{
  const {current_auth_dictionary}=ctx.request.body;
  const {href,value,comment,id}=current_auth_dictionary;
  ctx.body=await post('/back/dictionary/editAuthDictionary',{href,value,comment,id});
});


router.post('/dictionary/delAuthDictionary',async(ctx,next)=>{
  const {id}=ctx.request.body;
  ctx.body=await post('/back/dictionary/delAuthDictionary',{id});
});



module.exports = router;