import { lazy } from "react";
import { withRouter } from "react-router-dom";
const ArticleTypeList = withRouter(lazy(() => import("./articleType/ArticleTypeList")));
const dictionary_routers=[
  {
    path:"/dictionary/list-article-type",
    auth_path:"/dictionary/article-type/list",
    component:ArticleTypeList,
    comment:"banner列表"
  }
]

export default dictionary_routers;
