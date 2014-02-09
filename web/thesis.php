<?php 
include_once("bTemplate.php");
$tpl = new bTemplate();
$title = "元培专业人工翻译 | 文档翻译";
$is_thesis = "current";
$content = $tpl->fetch("thesis.tpl");
$tpl->set('title', $title);
$tpl->set('is_thesis', $is_thesis);
$tpl->set('content', $content);
echo $tpl->fetch('base.tpl');
?>