<?php
include_once("bTemplate.php");
$tpl = new bTemplate();
$title = "元培专业人工翻译 | 快速翻译";
//$is_home = "current";
$content = $tpl->fetch("fast-tip.tpl");
$tpl->set('title', $title);
//$tpl->set('is_home', $is_home);
$tpl->set('content', $content);
echo $tpl->fetch('base.tpl');
?>