var router = require('koa-router')();

import {post} from '../common/post';


router.post('/article/listArticle',async(ctx,next)=>{
  const {page,page_size,parent_id}=ctx.request.body;
  const {pageBean,parentAuthDictionary}=await post('/listArticle',{page,page_size,parent_id});
  const {list,total}=pageBean;
  ctx.body={list,total,page_size,page,parentAuthDictionary}

});

module.exports = router;