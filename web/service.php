<?php
include_once("bTemplate.php");
$tpl = new bTemplate();
$title = "元培专业人工翻译 | 服务说明&报价";
$is_service = "current";
$content = $tpl->fetch("service.tpl");
$tpl->set('title', $title);
$tpl->set('is_service', $is_service);
$tpl->set('content', $content);
echo $tpl->fetch('base.tpl');
?>