<?php
include_once("bTemplate.php");
$tpl = new bTemplate();
$title = "元培专业人工翻译 | 更多服务";
$is_more = "current";
$content = $tpl->fetch("more.tpl");
$tpl->set('title', $title);
$tpl->set('is_more', $is_more);
$tpl->set('content', $content);
echo $tpl->fetch('base.tpl');
?>