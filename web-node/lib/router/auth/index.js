const admin = require('./admin');
const role=require('./role');
const router = require('koa-router')();

router.use(admin.routes()).use(admin.allowedMethods());
router.use(role.routes()).use(role.allowedMethods());

export default router;