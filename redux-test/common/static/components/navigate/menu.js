const menu_list=[
  {
     link:"/auth/home",
     label:"首页",
     icon:"pie-chart",
     path:"/",
  },{
    label:"权限管理",
    icon:"pie-chart",
    path:"/auth",
    sub_menu:[
      {
        link:"/auth/list-role",
        path:"/auth/role/list",
        label:"角色列表",
        icon:"pie-chart"
      },{
        link:"/auth/list-admin",
        path:"/auth/admin/list",
        label:"管理员管理",
        icon:"pie-chart"
      }
    ]
  },{
    label:"网站管理",
    icon:"desktop",
    path:"/website",
    sub_menu:[
      {
        link:"/website/list-banner",
        path:"/website/banner/list",
        label:"banner管理",
        icon:"pie-chart"
      },{
        link:"/website/list-article",
        path:"/website/article/list",
        label:"文章管理",
        icon:"pie-chart"
      }
    ]

 }
]

export default menu_list;