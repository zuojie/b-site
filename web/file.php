<?php
include_once("bTemplate.php");
$tpl = new bTemplate();
$title = "元培专业人工翻译 | 文档翻译";
//$is_file = "current";
$content = $tpl->fetch("file.tpl");
$tpl->set('title', $title);
//$tpl->set('is_file', $is_file);
$tpl->set('content', $content);
echo $tpl->fetch('base.tpl');
?>