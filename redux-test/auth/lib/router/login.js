var router = require('koa-router')();
import {postJson} from 'common/lib/util/api';
import {login_required} from 'common/lib/middle/auth';

/**
 * 管理员后台登录
 */
router.post('/login',async(ctx,next)=>{
   const {user_name,password,key,verify}=ctx.request.body;
   const {data,code,msg}=await postJson('/login',{user_name,password,key,verify});
    if(code==='SUCCESS'){
      const { token }=data;
      ctx.cookies.set("sessionId",token);
    }
    ctx.body={code,msg,data}
});

/**
 * 权限验证
 */
router.post('/versify-auth',async(ctx,next)=>{
  const {auth}=ctx.request.body;
  const token=ctx.cookies.get("sessionId");
  // if(token){
  //   ctx.body=await postJson('/versify-auth',{token,auth});
  // }else{
  //   ctx.body={code:"FAIL",msg:"用户未登录"}
  // }
  ctx.body={code:"SUCCESS",msg:"用户未登录"}
  
});

/**
 * 登录检查
 */
router.post('/check-login',async(ctx,next)=>{
  const token=ctx.cookies.get("sessionId");
  if(token){
    ctx.body=await postJson('/check-login',{token});
  }else{
    ctx.body={code:"FAIL",msg:"用户未登录"}
  }
});


router.post('/get-auth',async(ctx,next)=>{
  const token=ctx.cookies.get("sessionId");
  if(token){
    ctx.body=await postJson('/get-auth',{token});
  }else{
    ctx.body={code:"FAIL",msg:"用户未登录"}
  }
});




/**
 * 登出
 */
router.post('/logout',login_required,async(ctx,next)=>{
  const token=ctx.cookies.get("sessionId");
  if(token){
     ctx.cookies.set("sessionId","");
     ctx.body=await postJson('/logout',{token});
  }else{
    ctx.body={code:"FAIL",msg:"用户未登录"}
  }
});





module.exports = router;