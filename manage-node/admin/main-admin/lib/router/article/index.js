import article from './article';

const router = require('koa-router')();

router.use(article.routes()).use(article.allowedMethods());

export default router;