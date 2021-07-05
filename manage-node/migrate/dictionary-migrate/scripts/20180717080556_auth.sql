--
--    Copyright 2010-2016 the original author or authors.
--
--    Licensed under the Apache License, Version 2.0 (the "License");
--    you may not use this file except in compliance with the License.
--    You may obtain a copy of the License at
--
--       http://www.apache.org/licenses/LICENSE-2.0
--
--    Unless required by applicable law or agreed to in writing, software
--    distributed under the License is distributed on an "AS IS" BASIS,
--    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
--    See the License for the specific language governing permissions and
--    limitations under the License.
--

-- // auth
-- Migration SQL that makes the change goes here.

CREATE TABLE manage_dictionary.dic_auth (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(150) NOT NULL DEFAULT '' COMMENT '名称',
  `href` varchar(150) DEFAULT NULL COMMENT '连接地址',
  `comment` text COMMENT '备注',
  `parent_id` int(11) DEFAULT NULL COMMENT '父节点ID号',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;


INSERT INTO `dic_auth` (`id`, `value`, `href`, `comment`, `parent_id`, `create_time`)
VALUES
	(1, '根节点', '/', '根节点', NULL, '2018-07-23 17:19:08'),
	(2, '权限管理', '/auth', '权限管理', 1, '2018-07-23 10:21:50'),
	(3, '员工管理', '/admin', '员工管理', 1, '2018-07-23 10:31:06'),
	(4, '权限列表', '/auth/authList', '权限列表', 2, '2018-07-23 10:32:24'),
	(5, '员工列表', '/auth/adminList', '员工列表', 3, '2018-07-23 10:33:10');


-- //@UNDO
-- SQL to undo the change goes here.


