const router = require('koa-router')();

const banner=require('./router/banner');
const article=require('./router/article');

router.use('/website',banner.routes()).use(banner.allowedMethods());
router.use('/website',article.routes()).use(article.allowedMethods());

export default router;