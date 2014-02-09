<?php
include_once("bTemplate.php");
$tpl = new bTemplate();
$title = "元培专业人工翻译 | 在线翻译 | 英文翻译";
$is_about = "current";
$content = $tpl->fetch("about.tpl");
$tpl->set('title', $title);
$tpl->set('is_about', $is_about);
$tpl->set('content', $content);
echo $tpl->fetch('base.tpl');
?>