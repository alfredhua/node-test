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

-- // login-log
-- Migration SQL that makes the change goes here.
CREATE TABLE `login_log` (
  `id` varchar(150) NOT NULL DEFAULT '' COMMENT '登录后的token',
  `admin_id` int(11) DEFAULT NULL COMMENT '登录用户id',
  `ip_address` varchar(150) DEFAULT NULL COMMENT '登录ip',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '登录时间',
  `source` varchar(100) DEFAULT NULL COMMENT '登录来源',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- //@UNDO
-- SQL to undo the change goes here.


