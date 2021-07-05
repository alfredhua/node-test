const dictionary = require('./dictionary');
const router = require('koa-router')();

router.use(dictionary.routes()).use(dictionary.allowedMethods());

export default router;