import router from './home';
import news from './news';

[,news].map((item) =>{ 
  router.use(item.routes());
  router.use(item.allowedMethods());
});


function use_router(app){
  app.use(router.routes()).use(router.allowedMethods());
}

module.exports=use_router;

