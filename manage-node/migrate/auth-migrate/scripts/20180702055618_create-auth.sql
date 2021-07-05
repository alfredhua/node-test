-- // create-auth
CREATE TABLE manage_auth.admin (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id号',
  `user_name` varchar(150) NOT NULL COMMENT '管理员姓名',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `role_list_json` text NOT NULL COMMENT '用户角色id数据',
  `phone` varchar(11) NOT NULL COMMENT '管理员电话号码',
  `email` varchar(150) NOT NULL COMMENT 'email',
  `password` varchar(150) NOT NULL COMMENT '用户密码',
  `is_active` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否激活',
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- //@UNDO
-- SQL to undo the change goes here.


