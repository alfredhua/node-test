import mysql from '../mysql/mysql';

export default async function(ctx, next){
  ctx.mysql=mysql;
  await next();
}
