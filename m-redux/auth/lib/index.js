const router = require('koa-router')();

const admin = require('./router/admin');
const role=require('./router/role');
const login=require('./router/login');
const loadAuthDara =require('./router/loadAuthData');

router.use(login.routes()).use(login.allowedMethods());
router.use('/auth',admin.routes()).use(admin.allowedMethods());
router.use('/auth',role.routes()).use(role.allowedMethods());
router.use('/auth',loadAuthDara.routes()).use(loadAuthDara.allowedMethods());

export default router;