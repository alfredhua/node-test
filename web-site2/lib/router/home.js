const router = require('koa-router')();
import { post_json } from './common/api';

router.get('/',async(ctx,next) => {
   // const banners=await post_json('/v1/website/list-banner-by-type',{type:'PC'});
   // const news=await post_json('/v1/website/list-news-home',{});
   await ctx.view('home/index.html', {});
});

export default router;