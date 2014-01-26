<?php
require_once('./mysql_db.class.php');
$db = new db();
$name = $_GET["name"];
$qsql = "UPDATE user_tbl SET `password`='@passwd'  WHERE `name` = '@name'";
$qsql = str_replace("@passwd", "7110eda4d09e062aa5e4a390b0a572ac0d2c0220", $qsql);
$qsql = str_replace("@name", $name, $qsql);
$rs=$db->query($qsql);
echo 'true';
?>
