<?php
include_once("bTemplate.php");
$tpl = new bTemplate();
$title = "元培专业人工翻译 | 文档翻译";
$is_intro = "current";
$content = $tpl->fetch("intro.tpl");
$tpl->set('title', $title);
$tpl->set('is_intro', $is_intro);
$tpl->set('content', $content);
echo $tpl->fetch('base.tpl');
?>