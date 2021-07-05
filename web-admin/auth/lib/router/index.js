const router = require('koa-router')();
const admin = require('./admin');
const role=require('./role');
const login=require('./login');
const loadAuthDara =require('./loadAuthData');

router.use(login.routes()).use(login.allowedMethods());
router.use('/auth',admin.routes()).use(admin.allowedMethods());
router.use('/auth',role.routes()).use(role.allowedMethods());
router.use('/auth',loadAuthDara.routes()).use(loadAuthDara.allowedMethods());

export default router;