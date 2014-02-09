<?php
include_once("bTemplate.php");
$tpl = new bTemplate();
$title = "元培专业人工翻译 | 文档翻译";
$is_cv = "current";
$content = $tpl->fetch("cv.tpl");
$tpl->set('title', $title);
$tpl->set('is_cv', $is_cv);
$tpl->set('content', $content);
echo $tpl->fetch('base.tpl');
?>