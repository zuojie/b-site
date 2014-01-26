<?php
header("Content-type:text/html;charset=utf-8"); 
session_start();
unset($_SESSION['admin_usr']);
session_destroy();
header("Location:login.php");
?>
