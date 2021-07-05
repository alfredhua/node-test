const router = require('koa-router')();

const common=require('./router/common');
router.use('/common',common.routes()).use(common.allowedMethods());
module.exports=router;