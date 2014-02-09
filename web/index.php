<?php
include_once("bTemplate.php");
$tpl = new bTemplate();
$content = 'Hi! I am here.';
$tpl->set('content', $content);
$tpl->bTemplate();
echo $tpl->fetch('base.tpl');
?>