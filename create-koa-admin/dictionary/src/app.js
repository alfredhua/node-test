import { lazy } from "react";
import { withRouter } from "react-router-dom";
const ArticleTypeList = withRouter(lazy(() => import("./noticeType/NoticeTypeList")));

export const dictionary_routers=[
  {
    path:"/dictionary/list-notice-type",
    auth_path:"/dictionary/notice-type/list",
    component:ArticleTypeList,
    comment:"banner列表"
  }
]