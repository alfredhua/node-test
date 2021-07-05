const router = require('koa-router')();

const banner=require('./router/banner');
const notice=require('./router/notice');
const produce=require('./router/produce');
const setting=require('./router/setting');
const news=require('./router/news');
const partner=require('./router/partner');
const { view } = require('./view');

router.use('/website',banner.routes()).use(banner.allowedMethods());
router.use('/website',notice.routes()).use(notice.allowedMethods());
router.use('/website',produce.routes()).use(produce.allowedMethods());
router.use('/website',setting.routes()).use(setting.allowedMethods());
router.use('/website',news.routes()).use(news.allowedMethods());
router.use('/website',partner.routes()).use(partner.allowedMethods());
router.use('', view.routes());

module.exports= router;