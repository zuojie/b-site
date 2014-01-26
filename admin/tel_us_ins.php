<?php
header("Content-type:text/html;charset=utf-8"); 
require('./mysql_db.class.php');
require("page_class.php"); 
require("file_upload.php");   
$db=new db();
if($_GET['c']=="ins")
{
 //修改操作
    if($_POST['hidden_id']!='')
    {
	    $db->query("update `tel_us` set branch='".$_POST['branch']."',address='".$_POST['address']."',phone='".$_POST['phone']."',fax='".$_POST['fax']."',mail='".$_POST['mail']."' where id=".$_POST['hidden_id']);  
	
    }//添加操作
    else
    {
        $db->query("INSERT INTO `tel_us` (`branch` ,`address`,`phone`,`fax`,`mail`)VALUES ( '".$_POST['branch']."', '".$_POST['address']."', '".$_POST['phone']."', '".$_POST['fax']."', '".$_POST['mail']."')");
    }
    echo "<script>alert('操作成功');location.href='tel_us.php'</script>";
}
elseif($_GET['c']=="upd")
{
	 $row=$db->query("select * from `tel_us` where id =".$_GET['id'])->fetch_array();
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
      <td height="31"><div class="titlebt"><?php if($_GET['c']=="ins"){echo "添加信息";}else{echo "修改信息";}?></div></td>
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
          <input type="hidden" value="<?php echo $row['id']?>" name="hidden_id"/>
            <tr><td width="10%">联系人:</td><td><input id="contactID" type="text" size="50" value="<?php echo $row['branch']?>" name="branch"/>*</td></tr> 
            <tr><td width="10%">地址:</td><td><input id="addrID" type="text" size="50" value="<?php echo $row['address']?>" name="address"/>*</td></tr> 
            <tr><td width="10%">电话:</td><td><input id="phoneID" type="text" size="50" value="<?php echo $row['phone']?>" name="phone"/>*</td></tr> 
               <tr><td width="10%">传真:</td><td><input id="faxID" type="text" size="50" value="<?php echo $row['fax']?>" name="fax"/></td></tr> 
                 <tr><td width="10%">邮箱:</td><td><input id="emailID" type="text" size="50" value="<?php echo $row['mail']?>" name="mail"/></td></tr> 
            <tr><td colspan="2"><input id="addContactInfoID" type="submit" value="提交"/></td></tr>
            </form>
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
</body>
<script>
    var addMemberBtn = document.getElementById("addContactInfoID");
    addMemberBtn.onclick=function(e) {
        var contact = document.getElementById("contactID").value;
        var addr = document.getElementById("addrID").value;
        var phone = document.getElementById("phoneID").value;
        var fax = document.getElementById("faxID").value;
        var email = document.getElementById("emailID").value;
        if(!contact) {
            alert("联系人不能为空")
            e.preventDefault();
        } else if(!addr) {
            alert("联系人地址不能为空")
            e.preventDefault();
        } else if(!phone) {
            alert("联系电话不能为空")
            e.preventDefault();
        }
    }
</script>
