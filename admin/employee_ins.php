<?php
require("head.php");
$tbl = "admin_tbl";
if(isset($_GET["role"])) {
	$role = $_GET["role"];
} else {
	$role = $_POST["role"];
}
if($_GET['c']=="ins") { // 提交修改/增加
    if($_POST['hidden_name'] != '') { // update
        $sql = "UPDATE @table SET `name`='@name', `role`='@role', `business`='@business' WHERE `name`='@hidden_name' and `business`='@hidden_business'"; 
        $sql = str_replace("@hidden_name", $_POST["hidden_name"], $sql);
        $sql = str_replace("@hidden_business", $_POST["hidden_business"], $sql);
    } else { //add
        $sql = "INSERT INTO @table (`name`,`password`, `role`, `business`) VALUES ('@name', '@password', '@role', '@business')"; 
    }
    $sql = str_replace("@table", $tbl, $sql);
    $sql = str_replace("@name", $_POST['name'] == "" ? 'null' : $_POST['name'], $sql);
    $sql = str_replace("@password", "7110eda4d09e062aa5e4a390b0a572ac0d2c0220", $sql);
    $sql = str_replace("@role", $_POST["role"] == "" ? 'null' : $_POST["role"], $sql);
    $sql = str_replace("@business", $_POST["business"] == "" ? 'null' : $_POST["business"], $sql);
    $db->query($sql);  
    echo "<script>alert('操作成功');location.href='employee.php?role=".$role."'</script>";
} else if($_GET['c'] == "upd") { // 修改
    $name = $_GET['name'];
    $role = $_GET['role'];
    $business = $_GET['business'];
} else if($_GET['c'] == 'add') { // 增加
    $name = '';
    $business = '';
}
?>
<link href="images/skin.css" rel="stylesheet" show="text/css" />
<link href="css/main.css" rel="stylesheet" show="text/css" />
<script src="js/jquery.js"></script>
<!--
body {
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
	margin-bottom: 0px;
	background-color: #EEF2FB;
}
-->
</style>
<body style="font-size:9px">
<form action="?c=ins" method="post"  enctype="multipart/form-data">
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="17" valign="top" background="images/mail_leftbg.gif">
        <img src="images/left-top-right.gif" width="17" height="29" /></td>
    <td valign="top" background="images/content-bg.gif">
        <table width="100%" height="31" border="0" cellpadding="0" cellspacing="0" class="left_topbg" id="table2">
        <tr>
            <td height="31">
                <div class="titlebt"><?php if($_GET['c']=="upd") {echo "修改";}else{echo "添加";}?></div></td>
        </tr>
        </table>
    </td>
    <td width="16" valign="top" background="images/mail_rightbg.gif">
	<img src="images/nav-right-bg.gif" width="16" height="29"/></td>
  </tr>
  <tr>
    <td valign="middle" background="images/mail_leftbg.gif">&nbsp;</td>
    <td valign="top" bgcolor="#F7F8F9">
        <table width="98%" border="0" align="center" cellpadding="0" cellspacing="0">
            <tr>
                <td colspan="1" valign="top">&nbsp;</td>
                <td colspan="1" valign="top">&nbsp;</td>
                <td colspan="1" valign="top">&nbsp;</td>
            </tr>
            <tr>
                <td colspan="1">
                    <table cellspacing="0" cellpadding="0" width="100%" id="tableID">
                        <input type="hidden" value="<?php echo $name ?>" name="hidden_name"/>
                        <input type="hidden" value="<?php echo $role ?>" name="role"/>
                        <input type="hidden" value="<?php echo $business ?>" name="hidden_business"/>
                        <tr><td width="10%">用户名:</td><td>
				<input id="nameID" type="text" size="50" value="<?php echo $name ?>" name="name"/>*
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%"><?php if($role == "sales") { echo '渠道'; } else {echo '业务';}?>:</td><td>
				<input id="businessID" type="text" size="50" value="<?php echo $business ?>" name="business"/>
			</td></tr>
                    <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
		    <tr><td colspan="2">
		    <input id="addID" type="submit" value="提交"/></td></tr>
        	</table>
              </td>
     	 </tr>
    </table></td>
    <td background="images/mail_rightbg.gif">&nbsp;</td>
  </tr>
  <tr>
    <td valign="bottom" background="images/mail_leftbg.gif"><img src="images/buttom_left2.gif" width="17" height="17" /></td>
    <td background="images/buttom_bgs.gif"><img src="images/buttom_bgs.gif" width="17" height="17"></td>
    <td valign="bottom" background="images/mail_rightbg.gif"><img src="images/buttom_right2.gif" width="16" height="17" /></td>
  </tr>
</table>
</form>
</body>
<script>
    var addMemberBtn = document.getElementById("addID");
    addMemberBtn.onclick=function(e) {
        var val = document.getElementById("nameID").value;
        if(!val) {
            alert("用户名不能为空")
            e.preventDefault();
        } 
    }
</script>

