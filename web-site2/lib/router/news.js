const router = require('koa-router')();
import { post_json } from './common/api';

router.get('/news',async(ctx,next) => {
   let {page=1} = ctx.request.query;
   const news=await post_json('/v1/website/list-news-page',{page_num:page,page_size:10});
   await ctx.view('news/index.html', {page,news});
});

router.get('/news/detail',async(ctx,next) => {
   let { id } = ctx.request.query;
   const _new=await post_json(`/v1/website/get-news/${id}`,{});
   await ctx.view('news/detail.html', {_new});
});
export default router;