const router = require('koa-router')();
const { login_required } =require('../middle/auth');
const { config } =require('../config');
const koaBody = require('koa-body');
const uuid = require('uuid/v4');
const svgCaptcha = require('svg-captcha');
const path=require('path');  
const OSS = require('ali-oss');

let client = new OSS({
  region: config('region'),
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

/**
 * 验证码
 */
router.post('/captcha',login_required, async(ctx,next)=>{
    var captcha = svgCaptcha.create({
     width: 120,  
     height: 50, 
   });
   const pic_verify=captcha.text;
   const {code,data,msg}=await ctx.postJson('/v1/common/save-captcha',{pic_verify});
   if(code=='SUCCESS'){
      ctx.body={
        svg: captcha.data,
      };
   }else{
     ctx.body={svg: null,key:null};
   }
  
});

module.exports = router;


