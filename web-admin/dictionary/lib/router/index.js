const router = require('koa-router')();

const articleType=require('./articleType');

router.use('/dictionary',articleType.routes()).use(articleType.allowedMethods());

export default router;