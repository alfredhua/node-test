const common=require('./common/common');

const admin = require('./auth/admin');

const role=require('./auth/role');
const login=require('./auth/login');

const dictionary=require('./dictionary/dictionary');
const articleType=require('./dictionary/articleType');

const banner=require('./website/banner');
const article=require('./website/article');

const router = require('koa-router')();

router.use('/common',common.routes()).use(common.allowedMethods());
router.use('/auth',admin.routes()).use(admin.allowedMethods());
router.use('/auth',role.routes()).use(role.allowedMethods());
router.use(login.routes()).use(login.allowedMethods());
router.use('/dictionary',articleType.routes()).use(articleType.allowedMethods());
router.use('/dictionary',dictionary.routes()).use(dictionary.allowedMethods());
router.use('/website',banner.routes()).use(banner.allowedMethods());
router.use('/website',article.routes()).use(article.allowedMethods());

export default router;