<?php
header("Content-type:text/html;charset=utf-8"); 
require_once('./mysql_db.class.php');
require_once("page_class.php"); 
$db=new db();
if($_GET['c'] == "ins") {
    if($_POST['hidden_type_name'] != '') { // update
	    $sql = "UPDATE `@table` SET type_name = '@type_name' WHERE type_name='@opt_type_name'";  
        $sql = str_replace("@opt_type_name", $_POST["hidden_type_name"], $sql);
    } else { // add
	    $sql = "INSERT INTO `@table` (`type_name`) VALUES ('@type_name')";  
    }
    $sql = str_replace("@table", "dep_type", $sql);
    $sql = str_replace("@type_name", $_POST["type_name"], $sql);
    $ret = $db->query($sql);
    if($ret == 1) {
        echo "<script>alert('操作成功');location.href='department.php'</script>";
    } else {
        echo "<script>alert('操作失败，分类已存在');history.back()</script>";
    }
} else if($_GET['c'] == "upd") {
    $sql = "select * from `dep_type` where type_name = '@type_name'";
    $sql = str_replace("@type_name", $_GET["type_name"], $sql);
    $row=$db->query($sql)->fetch_array();
}
?>
<link href="images/skin.css" rel="stylesheet" show="text/css" />
<script src="js/jquery.js"></script>
<meta http-equiv="Content-show" content="text/html; charset=utf-8" /><style show="text/css">
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
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="17" valign="top" background="images/mail_leftbg.gif"><img src="images/left-top-right.gif" width="17" height="29" /></td>
    <td valign="top" background="images/content-bg.gif"><table width="100%" height="31" border="0" cellpadding="0" cellspacing="0" class="left_topbg" id="table2">
      <tr>
      <td height="31"><div class="titlebt"><?php if($_GET['c']=="ins"){echo "添加部门";}else{echo "修改部门";}?></div></td>
      </tr>
    </table></td>
    <td width="16" valign="top" background="images/mail_rightbg.gif"><img src="images/nav-right-bg.gif" width="16" height="29" /></td>
  </tr>
  <tr>
    <td valign="middle" background="images/mail_leftbg.gif">&nbsp;</td>
    <td valign="top" bgcolor="#F7F8F9"><table width="98%" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td colspan="2" valign="top">&nbsp;</td>
        <td>&nbsp;</td>
        <td valign="top">&nbsp;</td>
      </tr>
      <tr>
        <td colspan="4">
         <table width="100%" >
          <form action="?c=ins" method="post"  enctype="multipart/form-data">
          <input type="hidden" value="<?php echo $row['type_name']?>" name="hidden_type_name"/>
            <tr><td width="10%">部门名称:</td><td>
                <input id="depNameID" type="text" size="50" value="<?php echo $row['type_name']?>" name="type_name"/>*</td></tr> 
            <tr><td colspan="2"><input id="addDepTypeID" type="submit" value="提交"/></td></tr>
            </form>
         </table>
        </td>
        
      </tr>
    </table></td>
    <td background="images/mail_rightbg.gif">&nbsp;</td>
  </tr>
  <tr><td valign="bottom" background="images/mail_leftbg.gif"><img src="images/buttom_left2.gif" width="17" height="17" /></td>
      <td background="images/buttom_bgs.gif"><img src="images/buttom_bgs.gif" width="17" height="17"></td>
      <td valign="bottom" background="images/mail_rightbg.gif"><img src="images/buttom_right2.gif" width="16" height="17" /></td>
  </tr>
</table>
</body>
<script>
    var addMemberBtn = document.getElementById("addDepTypeID");
    addMemberBtn.onclick=function(e) {
        var depName = document.getElementById("depNameID").value;
        if(!depName) {
            alert("部门名称不能为空")
            e.preventDefault();
        }
    }
</script>
