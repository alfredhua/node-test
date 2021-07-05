const router = require('koa-router')();

const banner=require('./banner');
const article=require('./article');
const produce=require('./produce');
const setting=require('./setting');
const news=require('./news');
const partner=require('./partner');

router.use('/website',banner.routes()).use(banner.allowedMethods());
router.use('/website',article.routes()).use(article.allowedMethods());
router.use('/website',produce.routes()).use(produce.allowedMethods());
router.use('/website',setting.routes()).use(setting.allowedMethods());
router.use('/website',news.routes()).use(news.allowedMethods());
router.use('/website',partner.routes()).use(partner.allowedMethods());

export default router;