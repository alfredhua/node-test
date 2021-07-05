import { lazy } from "react";
import { withRouter } from "react-router-dom";
const RoleEdit = withRouter(lazy(() => import("./role/view/RoleEdit")));
const RoleList = withRouter(lazy(() => import("./role/view/RoleList")));
const Home = withRouter(lazy(() => import("./home/view/Home")));
const AdminList = withRouter(lazy(() => import("./admin/view/AdminList")));
const AdminEdit = withRouter(lazy(() => import("./admin/view/AdminEdit")));

 const auth_routers=[
  {
    path:"/auth/home",
    component:Home,
    auth:true,
    comment:"首页"
  }, {
    path:"/auth/list-admin",
    auth_path:"/auth/admin/list",
    component:AdminList,
    comment:"管理员列表"
  }, {
    path:"/auth/create-admin",
    auth_path:"/auth/admin/create",
    component:AdminEdit,
    comment:"管理员创建"
  }, {
    path:"/auth/edit-admin/:id",
    auth_path:"/auth/admin/edit",
    component:AdminEdit,
    comment:"管理员编辑"
  }, {
    path:"/auth/create-role",
    auth_path:"/auth/role/create",
    component:RoleEdit,
    comment:"角色创建"
  }, {
    path:"/auth/edit-role/:id",
    auth_path:"/auth/role/edit",
    component:RoleEdit,
    comment:"角色编辑"
  }, {
    path:"/auth/list-role",
    auth_path:"/auth/role/list",
    component:RoleList,
    comment:"角色列表"
  }
]

export default auth_routers;