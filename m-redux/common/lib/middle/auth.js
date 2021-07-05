import {postJson} from '../util/api';
//验证是否登录
export async function login_required(ctx, next){
  // const token=ctx.cookies.get("sessionId");
  // if(token){
  //   const {code}=await postJson('/check-login',{token});
  //   if(code === 'SUCCESS'){
  //     await next();
  //   }else{
  //     ctx.throw(401);
  //   }
  // }else{
  //   ctx.throw(401);
  // }
  await next();
}