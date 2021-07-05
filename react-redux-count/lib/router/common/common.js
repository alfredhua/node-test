var router = require('koa-router')();
import {login_required} from '../common/middle/auth';
let OSS = require('ali-oss');
import config from './config';
const koaBody = require('koa-body');
var path=require('path');  
var uuid = require('uuid/v4');


let client = new OSS({
  region: config('region'),
  //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
  accessKeyId: config('accessKeyId'),
  accessKeySecret: config('accessKeySecret'),
  bucket: config('bucketName')
})


/**
 * 文件上传
 */
router.post('/upload', koaBody(),login_required,async(ctx,next)=>{
  const {file}=ctx.request.files;
  const extname=path.extname(file.name);	 //获取文件的后缀名
  let result = await client.put(uuid().replace(/-/g, '')+extname,file.path); 
  ctx.body={code:'SUCCESS',msg:"上传成功",path:result.url};
});


module.exports = router;


