<?php
include_once("bTemplate.php");
$tpl = new bTemplate();
$title = "元培专业人工翻译 | 文档翻译";
$is_contract = "current";
$content = $tpl->fetch("contract.tpl");
$tpl->set('title', $title);
$tpl->set('is_contract', $is_contract);
$tpl->set('content', $content);
echo $tpl->fetch('base.tpl');
?>