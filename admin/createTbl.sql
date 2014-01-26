-- phpMyAdmin SQL Dump
-- version 2.11.6
-- http://www.phpmyadmin.net
-- 主机: localhost
-- 生成日期: 2013 年 12 月 22 日 14:51
-- 服务器版本: 5.0.51
-- PHP 版本: 5.2.6
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
--
-- 数据库: `yuanpei`
--
USE yuanpei;

--
DROP TABLE ord_tbl;
DROP TABLE price_tbl;
DROP TABLE user_tbl;
DROP TABLE admin_tbl;
DROP TABLE focus_tbl;
DROP TABLE manager_nav;
DROP TABLE channel_tbl;
DROP TABLE doc_type_tbl;
DROP TABLE doc_field_tbl;
--

-- --------------------------------------------------------
-- 订单表 `manuscript`
CREATE TABLE IF NOT EXISTS `ord_tbl`(
  `ord_id` int AUTO_INCREMENT COMMENT '订单号',
  `ord_user` varchar(128) NOT NULL default 'null' COMMENT '下单用户名',
  `quality_level` varchar(128) COMMENT '质量级别，非必选字段(普通，专业)',
  `src_lang` varchar(128) NOT NULL default 'null' COMMENT '翻译源语言',
  `dst_lang` varchar(128) NOT NULL default 'null' COMMENT '翻译目的语言',
  `doc_type` varchar(128) NOT NULL default 'null' COMMENT '文档类型 (paper, resume, other)',
  `doc_title` varchar(128) NOT NULL default 'null' COMMENT '文档题目',
  `doc_field` varchar(128) NOT NULL default 'null' COMMENT '专业领域',
  `words_num` int NOT NULL default 0 COMMENT '字数',
  `price` float(9,3) NOT NULL default 0 COMMENT '价格',
  `ord_stat` varchar(128) NOT NULL default 'null' COMMENT '订单状态（未支付，补差价，已支付，翻译中，已完成）',
  `ord_finish_time` varchar(128) NOT NULL default 'null' COMMENT '预计完成时间',
  `ord_owner` varchar(128) NOT NULL default 'null' COMMENT '当前负责订单客户经理',
  `ord_worker` varchar(128) NOT NULL default 'null' COMMENT '当前负责订单译员',
  `ord_score` varchar(1024) NOT NULL default 'null' COMMENT '本次翻译评价(好中差)',
  `ord_remark` varchar(1024) NOT NULL default 'null' COMMENT '订单备注',
  `ord_type` varchar(128) NOT NULL default 'null' COMMENT '订单类型（正常1/异常2）',
  `ord_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '订单最近修改时间',
  PRIMARY KEY  (`ord_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='订单信息表';

REPLACE INTO `ord_tbl` (`ord_id`, `ord_user`, `quality_level`, `src_lang`, 
			`dst_lang`, `doc_type`, `doc_title`, `doc_field`, `words_num`, `price`,
			`ord_stat`, `ord_finish_time`, `ord_owner`, `ord_worker`, `ord_score`, `ord_remark`, `ord_type`) VALUES
('395335', 'pjay', '优秀', '中文', '英语', '专业论文', 'ABC.pdf', 'IT科技', 23401, 20.5, '未支付', '2014-11-20', 'arvin', '译员小张', '好', '务必梵音', '1'),
('395325', 'xd', '马虎', '韩文', '日文', '简历简介', 'ABC.txt', 'IT科技', 2401, 22.15, '已支付', '2013-11-20', 'jerry', '译员小李', '中', 'ozzz', '2');

-- --------------------------------------------------------------------------------
-- 计费规则表 `price_tbl`
CREATE TABLE IF NOT EXISTS `price_tbl` (
  `rule_key` varchar(128) NOT NULL default 'null' COMMENT '规则分类key（紧急程度1，字数2，翻译质量3，语种4）',
  `rule_value` varchar(128) NOT NULL default 'null' COMMENT '规则分类value（紧急程度value：普通，加急 字数value：null 翻译质量value：普通，专业 目的语种value：中英，英中，中日，中韩，中其它）',
  `rule_weight` float NOT NULL default 0.0 COMMENT '增加价格（元）'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='计费规则表';

INSERT INTO `price_tbl` (`rule_key`, `rule_value`, `rule_weight`) VALUES
('1', '加急', 10),
('2', 'null', 100),
('4', '中英', 100),
('4', '英中', 100),
('4', '中日', 120),
('4', '中韩', 120),
('4', '中其它', 180),
('3', '普通', 5);

-- --------------------------------------------------------------------------------
-- 渠道表 `channel_tbl`
CREATE TABLE IF NOT EXISTS `channel_tbl` (
  `channel_area` varchar(128) NOT NULL default 'null' COMMENT '渠道-大区',
  `channel_city` varchar(128) NOT NULL default 'null' COMMENT '渠道-城市',
  `channel_university` varchar(128) COMMENT '渠道-学校',
  `channel_manager` varchar(128) COMMENT '渠道负责人'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='渠道表';

INSERT INTO `channel_tbl` (`channel_area`, `channel_city`, `channel_university`, `channel_manager`) VALUES
('华东', 'shenyang', '大连理工大学', 'xiaowang'),
('华西', 'lanzhou', '西北大学', 'xiaozhang'),
('华南', 'shanghai', '上海财经大学', 'xiaozhao'),
('华北', 'beijing', '北京大学', 'xiaoli'),
('华中', 'wuhan', '华中科技大学', 'xiaopeng'),
('华北', 'beijing', '清华大学', 'xiaoli'),
('华北', 'null', 'null', 'xiaoli'),
('华东', 'null', 'null', 'xiaowang'),
('华西', 'null', 'null', 'xiaozhang'),
('华南', 'null', 'null', 'xiaozhao'),
('华中', 'null', 'null', 'xiaopeng'),
('无', '无', '无', '无'),
('华南', 'shenzhen', '深圳大学', 'xiaozhao');

-- --------------------------------------------------------------------------------
-- doc_type_tbl
CREATE TABLE IF NOT EXISTS `doc_type_tbl` (
  `doc_type` varchar(128) NOT NULL default 'null' COMMENT '文档类型'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='文档类型表';

INSERT INTO `doc_type_tbl` (`doc_type`) VALUES
('专业论文'),
('简历简介'),
('公司产品介绍'),
('合同标书'),
('留学移民'),
('其它');

-- --------------------------------------------------------------------------------
-- doc_field_tbl
CREATE TABLE IF NOT EXISTS `doc_field_tbl` (
  `doc_field` varchar(128) NOT NULL default 'null' COMMENT '文档类型'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='文档类型表';

INSERT INTO `doc_field_tbl` (`doc_field`) VALUES
('生物医学'),
('经济贸易'),
('法律法规'),
('人文艺术'),
('机械电子'),
('建筑工程'),
('IT科技'),
('其它');

-- --------------------------------------------------------------------------------
-- ord_stat_tbl
CREATE TABLE IF NOT EXISTS `ord_stat_tbl` (
  `ord_stat` varchar(128) NOT NULL default 'null' COMMENT '订单状态'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='订单状态表';

INSERT INTO `ord_stat_tbl` (`ord_stat`) VALUES
('未付款'),
('已付款'),
('补差价'),
('翻译中'),
('已完成');

-- --------------------------------------------------------------------------------
-- 用户信息表 `user`
CREATE TABLE IF NOT EXISTS `user_tbl` (
  `name` varchar(128) NOT NULL default 'null' COMMENT '用户名',
  `password` varchar(128) NOT NULL default 'null' COMMENT '密码,',
  `mail_addr` varchar(128) NOT NULL default 'null' COMMENT '邮箱',
  `phone` varchar(128) NOT NULL default 'null' COMMENT '电话',
  `qq` varchar(128) NOT NULL default 'null' COMMENT 'qq',
  `user_type` varchar(128) NOT NULL default 'null' COMMENT '用户类型（企业1/个人2）',
  `money` float(9.3) NOT NULL default 0 COMMENT '账户积分',
  `try_money` float(9.3) NOT NULL default 0 COMMENT '体验余额',
  `channel_area` varchar(128) NOT NULL default 'null' COMMENT '用户来源渠道区域',
  `channel_city` varchar(128) NOT NULL default 'null' COMMENT '用户来源渠道城市',
  `channel_university` varchar(128) NOT NULL default 'null' COMMENT '用户来源渠道学校',
  PRIMARY KEY  (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='会员用户信息';

INSERT INTO `user_tbl` (`name`, `password`, `mail_addr`, `phone`, `qq`, `user_type`, `money`, `try_money`, `channel_area`, `channel_city`, `channel_university`) VALUES
('caiyuanpei', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'pjay@163.com', '12345678', '8927343', '2', 123.0, 0.0, '华北', 'beijing', '北京大学'),
('baidu', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'pjay@163.com', '12345678', '453453', '1', 123.0, 0.0, '华北', 'beijing', 'null');

-- --------------------------------------------------------------------------------
-- 雇员表 `admin_tbl`，假设manager只负责一项业务，sales只负责一个渠道
CREATE TABLE IF NOT EXISTS `admin_tbl` (
  `name` varchar(128) NOT NULL default 'null' COMMENT '用户名',
  `password` varchar(128) NOT NULL default 'null' COMMENT '密码',
  `role` varchar(128) NOT NULL default 'null' COMMENT '角色: 管理员admin，客户经理manager，渠道专员sales',
  `business` varchar(128) COMMENT '客户经理负责的翻译业务，可选（简历，论文等）'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='雇员信息';

INSERT INTO `admin_tbl` (`name`, `password`, `role`, `business`) VALUES
('admin', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'admin', 'administrator'),
('xiaopeng', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'sales', '华南'),
('tom', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'sales', '华东'),
('jerry', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'manager', '专业论文'),
('arvin', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'manager', '简历简介'),
('cheery', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'sales', '华中'),
('zhangxiaoming', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'manager', '简历简介');

-- --------------------------------------------------------------------------------
-- 译员表 `translater_tbl`
CREATE TABLE IF NOT EXISTS `translater_tbl` (
  `id` int AUTO_INCREMENT,
  `name` varchar(128) NOT NULL default 'null' COMMENT '用户名',
  `phone` varchar(128) NOT NULL default 'null' COMMENT '电话',
  `email` varchar(128) NOT NULL default 'null' COMMENT '邮箱',
  `qq` varchar(128) NOT NULL default 'null' COMMENT 'qq号',
  `lang` varchar(128) NOT NULL default 'null' COMMENT '语种',
   PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='译员信息';

INSERT INTO `translater_tbl` (`name`, `phone`, `email`, `qq`, `lang`) VALUES
('james', '18765582943', 'hee@jams.com', '1023232', '英语'),
('tony', '18763258243', 'hee@tony.com', '2023232', '阿拉伯语'),
('martin', '18763358243', 'hee@martin.com', '20232222', '韩语');

-- --------------------------------------------------------------------------------
-- 焦点信息表 `focus_tbl`
CREATE TABLE IF NOT EXISTS `focus_tbl` (
  `title` varchar(128) NOT NULL default 'null' COMMENT '标题',
  `up_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `modify_people` varchar(128) NOT NULL default 'null' COMMENT '最后修改人',
  `article` text COMMENT '正文',
  PRIMARY KEY  (`title`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='焦点信息';

INSERT INTO `focus_tbl` (`title`, `modify_people`, `article`) VALUES
('价位说明', 'admin', '三点了副教授了都快放假了深刻的减肥了设计费了撒酒疯大三了宋德福三大');

-- -----------------------------------------------------------------------------------
-- 导航栏信息表 `manager_nav`
CREATE TABLE IF NOT EXISTS `manager_nav` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(128) NOT NULL COMMENT '名称',
  `href` varchar(128) NOT NULL COMMENT '链接',
  `classify` varchar(128) NOT NULL COMMENT '菜单分类，属于哪个父菜单',
  `type_` int(10) NOT NULL COMMENT '标签等级1父菜单,2子菜单',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='栏目标签管理';

REPLACE INTO `manager_nav` (`title`, `href`, `classify`, `type_`) VALUES
('正常订单', '#', '正常订单', 1),
('异常订单', '#', '异常订单', 1),
('用户管理', '#', '用户管理', 1),
('客户经理管理', '#', '客户经理管理', 1),
('渠道专员管理', '#', '渠道专员管理', 1),
('兼职译员管理', '#', '兼职译员管理', 1),
('渠道管理', '#', '渠道管理', 1),
('焦点文章', '#', '焦点文章', 1),
('系统状态', '#', '系统状态', 1),
('个人信息', '#', '个人信息', 1),
('专业论文', 'order.php?ord_type=1&doc_type=专业论文', '正常订单', 2),
('简历简介', 'order.php?ord_type=1&doc_type=简历简介', '正常订单', 2),
('公司产品介绍', 'order.php?ord_type=1&doc_type=公司产品介绍', '正常订单', 2),
('合同标书', 'order.php?ord_type=1&doc_type=合同标书', '正常订单', 2),
('留学移民', 'order.php?ord_type=1&doc_type=留学移民', '正常订单', 2),
('其它', 'order.php?ord_type=1&doc_type=其它', '正常订单', 2),
('专业论文', 'order.php?ord_type=2&doc_type=专业论文', '异常订单', 2),
('简历简介', 'order.php?ord_type=2&doc_type=简历简介', '异常订单', 2),
('公司产品介绍', 'order.php?ord_type=2&doc_type=公司产品介绍', '异常订单', 2),
('合同标书', 'order.php?ord_type=2&doc_type=合同标书', '异常订单', 2),
('留学移民', 'order.php?ord_type=2&doc_type=留学移民', '异常订单', 2),
('其它', 'order.php?ord_type=2&doc_type=其它', '异常订单', 2),
('用户列表', 'user.php', '用户管理', 2),
('客户经理列表', 'employee.php?role=manager', '客户经理管理', 2),
('渠道专员列表', 'employee.php?role=sales', '渠道专员管理', 2),
('译员列表', 'translater.php', '兼职译员管理', 2),
('华东', 'channel.php?area=E', '渠道管理', 2),
('华西', 'channel.php?area=W', '渠道管理', 2),
('华南', 'channel.php?area=S', '渠道管理', 2),
('华北', 'channel.php?area=N', '渠道管理', 2),
('华中', 'channel.php?area=C', '渠道管理', 2),
('其它渠道', 'channel.php?area=O', '渠道管理', 2),
('管理', 'focus_news.php', '焦点文章', 2),
('订单操作日志', 'sys_log.php', '系统状态', 2),
('查看个人信息', 'user_info.php', '个人信息', 2);

