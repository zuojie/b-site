<?php
require_once("head.php");
$tbl = "translater_tbl";
if($_GET['c']=="ins") { // 提交修改/增加
    if($_POST['hidden_id'] != '') { // update
        $sql = "UPDATE @table SET `name`='@name', `phone`='@phone', `email`='@email', `qq`='@qq', `lang`='@lang' WHERE `id`='@hidden_id'"; 
        $sql = str_replace("@hidden_id", $_POST["hidden_id"], $sql);
    } else { //add
        $sql = "INSERT INTO @table (`name`,`phone`, `email`, `qq`, `lang`) VALUES ('@name', '@phone', '@email', '@qq', '@lang')"; 
    }
    $sql = str_replace("@table", $tbl, $sql);
    $sql = str_replace("@name", $_POST['name'] == "" ? 'null' : $_POST['name'], $sql);
    $sql = str_replace("@phone", $_POST["phone"] == "" ? 'null' : $_POST["phone"], $sql);
    $sql = str_replace("@email", $_POST["email"] == "" ? 'null' : $_POST["email"], $sql);
    $sql = str_replace("@qq", $_POST["qq"] == "" ? 'null' : $_POST["qq"], $sql);
    $sql = str_replace("@lang", $_POST["lang"] == "" ? 'null' : $_POST["lang"], $sql);
    $db->query($sql);  
    echo "<script>alert('操作成功');location.href='translater.php?'</script>";
} else if($_GET['c'] == "upd") { // 修改
    $sql = "SELECT * FROM @table WHERE `id`=@id"; 
    $sql = str_replace("@table", $tbl, $sql);
    $sql = str_replace("@id", $_GET['id'], $sql);
    $row=$db->query($sql)->fetch_array();
    $id = $row['id'];
    $name = $row['name'];
    $phone = $row['phone'];
    $email = $row['email'];
    $qq = $row['qq'];
    $lang = $row['lang'];
} else if($_GET['c'] == 'add') { // 增加
    $id = '';
    $name = '';
    $phone = '';
    $email = '';
    $qq = '';
    $lang = '';
}
?>
<link href="images/skin.css" rel="stylesheet" show="text/css" />
<link href="css/main.css" rel="stylesheet" show="text/css" />
<script src="js/jquery.js"></script>
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
                        <input type="hidden" value="<?php echo $id ?>" name="hidden_id"/>
                        <tr><td width="10%">用户名:</td><td>
				<input id="nameID" type="text" size="50" value="<?php echo $name ?>" name="name"/>*
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">电话:</td><td>
				<input id="phoneID" type="text" size="50" value="<?php echo $phone ?>" name="phone"/>
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">邮箱:</td><td>
				<input id="emailID" type="text" size="50" value="<?php echo $email ?>" name="email"/>
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">QQ:</td><td>
				<input id="qqID" type="text" size="50" value="<?php echo $qq ?>" name="qq"/>
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">语种:</td><td>
				<input id="langID" type="text" size="50" value="<?php echo $lang ?>" name="lang"/>
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

