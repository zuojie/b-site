<?php
include_once("bTemplate.php");
$tpl = new bTemplate();
$title = "元培专业人工翻译 | 文档翻译";
$is_abroad = "current";
$content = $tpl->fetch("abroad.tpl");
$tpl->set('title', $title);
$tpl->set('is_abroad', $is_abroad);
$tpl->set('content', $content);
echo $tpl->fetch('base.tpl');
?>