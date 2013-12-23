<?php
header("Content-type:text/html;charset=utf-8"); 
session_start();    
if (isset($_SESSION['valid_usr'])) {
    header("Location:usercenter.php");
    exit ;
}
$usr = $_GET['usr'];
$pawd = sha1($_GET['pawd']);
//echo "<script>alert('".$usr." ".$pawd."')</script>";
if (verify_usr($usr, $pawd)) {
    $_SESSION['valid_usr'] = $usr;
    echo "1";
} else {
    echo "0";
}
function verify_usr($usr, $pawd) {
    if($usr == 'admin') {
        return false;
    }
    require_once('./admin/mysql_db.class.php');
    $db=new db();
    $sql = "select count(*) from `user_tbl` where `name` = '".$usr."' and `password` = '".$pawd."'";
    //print_r("arvin ".$sql);
    $coun=$db->query($sql);
    $row = $coun->fetch_array();
    if($row[0] == 0) {
        return false;
    } 
	return true;
}
?>
