const router = require('koa-router')();
const noticeType=require('./router/noticeType');
const { view } = require('./view');

router.use('', view.routes());
router.use('/dictionary',noticeType.routes()).use(noticeType.allowedMethods());

module.exports=router;