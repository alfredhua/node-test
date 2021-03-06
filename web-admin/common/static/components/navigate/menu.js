const menu_list=[
  {
     link:"/auth/home",
     label:"首页",
     icon:"home",
     auth_path:"/",
  },{
    label:"权限管理",
    icon:"key",
    auth_path:"/auth",
    sub_menu:[
      {
        link:"/auth/list-role",
        auth_path:"/auth/role/list",
        label:"角色列表",
        icon:"security-scan"
      },{
        link:"/auth/list-admin",
        auth_path:"/auth/admin/list",
        label:"管理员管理",
        icon:"user"
      }
    ]
  },{
    label:"网站管理",
    icon:"desktop",
    auth_path:"/website",
    sub_menu:[
      {
        link:"/website/setting",
        auth_path:"/website/setting",
        label:"网站设置",
        icon:"file"
      },{
        link:"/website/list-banner",
        auth_path:"/website/banner/list",
        label:"banner管理",
        icon:"camera"
      },{
        link:"/website/list-article",
        auth_path:"/website/article/list",
        label:"公告管理",
        icon:"file"
      },{
        link:"/website/list-produce",
        auth_path:"/website/produce/list",
        label:"产品管理",
        icon:"file"
      },{
        link:"/website/list-news",
        auth_path:"/website/news/list",
        label:"新闻管理",
        icon:"file"
      },{
        link:"/website/list-partner",
        auth_path:"/website/partner/list",
        label:"合作伙伴",
        icon:"file"
      }
    ]
 },{
  label:"字典管理",
  icon:"tool",
  auth_path:"/dictionary",
  sub_menu:[
    {
      link:"/dictionary/list-article-type",
      auth_path:"/dictionary/article-type/list",
      label:"公告字典",
      icon:"pie-chart"
    }
  ]
}
]

export default menu_list;