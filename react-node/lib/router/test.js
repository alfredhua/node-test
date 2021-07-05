import {gateway_get} from '../api';
var router = require('koa-router')();
import moment from 'moment';

router.use(['/'], get_access_token);

router.get('/test/a', (ctx, next) => {
    ctx.render('test/test.html',{url:ctx.user.url});
});
router.post('/test/v',async (ctx,next) => {
    const {answers} = ctx.request.body;
    const result = await gateway_get('/aaa',{answers, accountNumber});
    ctx.body = result;
});


module.exports = router;