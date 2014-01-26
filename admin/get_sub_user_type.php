<?php
require_once('./mysql_db.class.php');
$db = new db();
$subordinate = $_GET["subordinate"];
if ($subordinate == '超级管理员') {
    echo $subordinate."_fuck_ie";
    //echo "<option value='超级管理员'>超级管理员</option>";
} else {
    $rs=$db->query("select `type_name` from `user_type` where `subordinate`!= `type_name` and `subordinate` = '".$subordinate."'");
    $num = $rs == '' ? 0 : $rs->num_rows;
    for ($i = 0; $i < $num; $i ++) {
        $tmp = $rs->fetch_assoc();
        $manu = $tmp["type_name"];
        echo $manu."_fuck_ie";
        //echo "<option value='".$manu."'>$manu</option>";
    }
}
?>
