<?php
include_once("bTemplate.php");
$tpl = new bTemplate();
$title = "元培专业人工翻译 | 翻译示例";
$is_example = "current";
$content = $tpl->fetch("example.tpl");
$tpl->set('title', $title);
$tpl->set('is_example', $is_example);
$tpl->set('content', $content);
echo $tpl->fetch('base.tpl');
?>