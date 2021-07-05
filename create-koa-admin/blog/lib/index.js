const router = require('koa-router')();

const article=require('./router/article');
const type=require('./router/type');
const { view } = require('./view');

router.use('', view.routes());
router.use('/blog',article.routes()).use(article.allowedMethods());
router.use('/blog',type.routes()).use(type.allowedMethods());

module.exports = router;