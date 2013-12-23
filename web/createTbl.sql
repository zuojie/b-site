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
use yuanpei;
-- --------------------------------------------------------
--
-- 表的结构 `manuscript`
--

CREATE TABLE IF NOT EXISTS `ord_tbl`(
  `ord_id` varchar(128) NOT NULL default 'null' COMMENT '订单号',
  `ord_user` varchar(128) NOT NULL default 'null' COMMENT '下单用户名',
  `quality_level` varchar(128) NOT NULL default 'null' COMMENT '质量级别',
  `trans_lang_src` varchar(128) NOT NULL default 'null' COMMENT '翻译源语言',
  `trans_lang_dst` varchar(128) NOT NULL default 'null' COMMENT '翻译目的语言',
  `doc_type` varchar(128) NOT NULL default 'null' COMMENT '文档类型',
  `doc_title` varchar(128) NOT NULL default 'null' COMMENT '文档主题',
  `doc_field` varchar(128) NOT NULL default 'null' COMMENT '专业领域',
  `words_num` int NOT NULL default 0 COMMENT '字数',
  `price` float(9,3) NOT NULL default 0 COMMENT '价格',
  `recv_email` varchar(256) NOT NULL default 'null' COMMENT '接收邮箱',
  `ord_stat` varchar(128) NOT NULL default 'null' COMMENT '订单状态（未支付，已完成，翻译中）',
  `ord_finish_time` varchar(128) NOT NULL default 'null' COMMENT '预计完成时间',`ord_done` varchar(128) NOT NULL default 'null' COMMENT '预计完成时间',
  `ord_remark` varchar(1024) NOT NULL default 'null' COMMENT '订单备注',
  `ord_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '订单生成时间',
  PRIMARY KEY  (`ord_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='订单信息表';

--
-- 插入数据
--
REPLACE INTO `ord_tbl` (`ord_id`, `ord_user`, `quality_level`, `trans_lang_src`, 
			`trans_lang_dst`, `doc_type`, `doc_title`, `doc_field`, `words_num`, `price`,
			`recv_email`, `ord_stat`, `ord_finish_time`, `ord_remark`) VALUES
('395335', 'pjay', '优秀', '中文', '英语', '专业论文', 'ABC.pdf', 'IT科技', 23401, 20.5, 'pjay83838383@163.com', '未支付', '2013-12-20', '务必梵音'),
('395325', 'xd', '马虎', '韩文', '日文', '简历', 'ABC.txt', 'IT科技', 2401, 22.15, 'xd@163.com', '已支付', '2013-11-20', 'ozzz');

-- --------------------------------------------------------------------------------
--
-- 表的结构 `user`
--

CREATE TABLE `user_tbl` (
  `name` varchar(128) NOT NULL COMMENT '用户名',
  `password` varchar(128) NOT NULL COMMENT '密码, sha1加密',
  `mail_addr` varchar(128) NOT NULL COMMENT '常用邮箱',
  `money` float(9.3) NOT NULL default 0 COMMENT '账户余额',
  `ty_money` float(9.3) NOT NULL default 0 COMMENT '体验余额',
  PRIMARY KEY  (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='会员用户信息';

--
-- 导出表中的数据 `user`
--

INSERT INTO `user_tbl` (`name`, `password`, `mail_addr`, `money`, `ty_money`) VALUES
('丁磊', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'pjay@163.com', 123.0, 0.0);

-- INSERT INTO `user` (`name`, `real_name`, `dep`, `addr`, `password`, `user_level`, `user_type`, `position`, `mail`, `tel`, `state`) VALUES
-- ('sadmin', '', '', '', '827ccb0eea8a706c4c34a16891f84e7b', '超级管理员', '内部员工','超级管理员',  '305721480@qq.com', '15811014383', '激活');
