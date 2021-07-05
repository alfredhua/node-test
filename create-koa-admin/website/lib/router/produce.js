var router = require('koa-router')();
const { login_required } = require('common/lib/middle/auth');


var website='/v1/website';

/**
 * 创建
 */
router.post('/save-produce',login_required,async(ctx,next)=>{
  const {id,form_value,files,cover_image}=ctx.request.body;
  const {title,home_show,ordering,introduce}=form_value;
  if(id){
    ctx.body=await ctx.postJson(website+'/update-produce',{id,title,pc_show:1,m_show:1,file_list:JSON.stringify(files),home_show,ordering,introduce,cover_image});
  }else{
    ctx.body=await ctx.postJson(website+'/create-produce',{title,pc_show:1,m_show:1,file_list:JSON.stringify(files),home_show,ordering,introduce,cover_image});
  }
});

router.post('/list-produce',login_required,async(ctx,next)=>{
    const {page_num,page_size}=ctx.request.body;
    ctx.body=await ctx.postJson(website+'/list-produce',{page_num,page_size});
});

router.post('/del-produce',login_required,async(ctx,next)=>{
  const {id}=ctx.request.body;
  ctx.body=await ctx.postString(website+`/del-produce/${id}`,{});
});

router.post('/get-produce',login_required,async(ctx,next)=>{
  const {id}=ctx.request.body;
  ctx.body=await ctx.postString(website+`/get-produce/${id}`,{});
});


/**
 * 更新
 */
router.post('/update-produce-detail',login_required,async(ctx,next)=>{
  const {id,context,produce_id}=ctx.request.body;
  ctx.body=await ctx.postJson(website+'/update-produce-detail',{id,context,produce_id});
});

/**
 * 获取
 */
router.post('/get-produce-detail',login_required,async(ctx,next)=>{
  const {produce_id}=ctx.request.body;
  ctx.body=await ctx.postString(website+`/get-produce-detail/${produce_id}`,{});
});



module.exports = router;


