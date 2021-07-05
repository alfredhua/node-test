import { lazy } from "react";
import { withRouter } from "react-router-dom";
const BannerList = withRouter(lazy(() => import("./banner/BannerList")));
const BannerEdit = withRouter(lazy(() => import("./banner/BannerEdit")));

const ArticleList = withRouter(lazy(() => import("./article/ArticleList")));
const ArticleEdit = withRouter(lazy(() => import("./article/ArticleEdit")));

const ProduceList = withRouter(lazy(() => import("./produce/ProduceList")));
const ProduceEdit = withRouter(lazy(() => import("./produce/ProduceEdit")));
const ProduceDetail = withRouter(lazy(() => import("./produce/ProduceDetail")));

const NewsList = withRouter(lazy(() => import("./news/NewsList")));
const NewsEdit = withRouter(lazy(() => import("./news/NewsEdit")));

const Setting = withRouter(lazy(() => import("./setting/Setting")));


const website_routers=[
  {
    path:"/website/list-banner",
    auth_path:"/website/banner/list",
    component:BannerList,
    comment:"banner列表"
  },{
    path:"/website/create-banner",
    auth_path:"/website/banner/create",
    component:BannerEdit,
    comment:"banner创建"
  },{
    path:"/website/edit-banner/:id",
    auth_path:"/website/banner/create",
    component:BannerEdit,
    comment:"banner创建"
  },{
    path:"/website/list-article",
    auth_path:"/website/article/list",
    component:ArticleList,
    comment:"文章列表"
  },{
    path:"/website/list-article/:search_type",
    auth_path:"/dictionary/article-type/watch-article",
    component:ArticleList,
    comment:"文章列表"
  },{
    path:"/website/create-article",
    auth_path:"/website/article/create",
    component:ArticleEdit,
    comment:"文章创建"
  },{
    path:"/website/edit-article/:id",
    auth_path:"/website/article/edit",
    component:ArticleEdit,
    comment:"文章编辑"
  },{
    path:"/website/list-produce",
    auth_path:"/website/produce/list",
    component:ProduceList,
    comment:"产品列表"
  },{
    path:"/website/create-produce",
    auth_path:"/website/produce/create",
    component:ProduceEdit,
    comment:"产品创建"
  },{
    path:"/website/edit-produce/:id",
    auth_path:"/website/produce/edit",
    component:ProduceEdit,
    comment:"产品编辑"
  },{
    path:"/website/set-produce-detail/:id",
    auth_path:"/website/produce/set-detail",
    component:ProduceDetail,
    comment:"产品内容编辑"
  },{
    path:"/website/setting",
    auth_path:"/website/setting",
    component:Setting,
    comment:"网站设置"
  },{
    path:"/website/list-news",
    auth_path:"/website/news/list",
    component:NewsList,
    comment:"新闻管理"
  },{
    path:"/website/create-news",
    auth_path:"/website/news/create",
    component:NewsEdit,
    comment:"新闻创建"
  },{
    path:"/website/edit-news/:id",
    auth_path:"/website/news/edit",
    component:NewsEdit,
    comment:"新闻编辑"
  },{
    path:"/website/list-partner",
    auth_path:"/website/news/list",
    component:withRouter(lazy(() => import("./partner/PartnerList"))),
    comment:"合作伙伴列表"
  },{
    path:"/website/create-partner",
    auth_path:"/website/news/create",
    component:withRouter(lazy(() => import("./partner/PartnerEdit"))),
    comment:"合作伙伴创建"
  },{
    path:"/website/edit-partner/:id",
    auth_path:"/website/news/edit",
    component:withRouter(lazy(() => import("./partner/PartnerEdit"))),
    comment:"合作伙伴编辑"
  }
]

export default website_routers;
