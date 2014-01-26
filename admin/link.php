<?php
header("Content-type:text/html;charset=utf-8"); 
require('./mysql_db.class.php');
$db=new db();
if($_GET['c']=="ins")
{

 //======================修改操作
 if($_POST['hidden_id']!='')
  {
	$db->query("update `link` set title='".$_POST['title']."',sort='".$_POST['sort']."',`show`='".$_POST['show']."',href='".$_POST['href']."' where id=".$_POST['hidden_id']);  
	
  }
  //========================添加操作
  else
  {
  $db->query("INSERT INTO `link` (`title` ,`show` ,`sort` ,`href`)VALUES ( '".$_POST['title']."', '".$_POST['show']."', '".$_POST['sort']."', '".$_POST['href']."')");
  }
}

if($_GET['c']=="del")
{
 $db->query("delete from `link` where id=".$_GET['id']);
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
        <td height="31"><div class="titlebt">欢迎界面</div></td>
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
         <table width="60%" >
         
             <form method="post" action="?c=ins">
             名称：<input type="text" id="title" name="title"/>链接：<input type="text" id="href" name="href"/>
             
             排序：<input type="text" id="sort" size="5" name="sort"/>显示：<input type="checkbox" name="show" value="1"/>
              <input  type="submit" value="添加"/>
             </form>
              <tr><td colspan="5" align="right"><a href="#" style="color:red;">*排序数字越大，位置越靠前</a></td></tr>
              <?php
			  $rs=$db->query("select * from `link` where 1");
			    while($row=$rs->fetch_array())
		   {
			  ?>
                  <tr>

            <form method="post" action="?c=ins">
            <input type="hidden" name="hidden_id" value="<?php echo$row['id']?>"/>
                <td>标题：<input type="text" name="title" value="<?php echo $row['title']?>"/></td><td>链接：<input type="text" name="href" value="<?php echo $row['href']?>"/></td><td><input type="checkbox" name="show" <?php echo $row['show']==1?"checked='checked'":"";?> value="1"/>显示</td><td><input type="text" name="sort" size="5" value="<?php echo $row['sort']?>"/>排序</td><td><input type="submit" value="修改"/><input type="button" value="删除" onClick="if(confirm('确定删除？'))location.href='link.php?c=del&id=<?php echo $row['id']?>'"/></td>
             </form>
             </tr>
             <?php
		   }
	
		  ?>
         </table>
        </td>
        
      </tr>
      <tr>
        <td width="2%">&nbsp;</td>
        <td width="51%" class="left_txt"><img src="images/icon-mail2.gif" width="16" height="11"> 客户服务邮箱：*****************<br>
          <img src="images/icon-phone.gif" width="17" height="14"> 官方网站：*******************</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
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
