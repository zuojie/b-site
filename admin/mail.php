<?php
header("Content-type:text/html;charset=utf-8"); 
require('./mysql_db.class.php');

$db=new db();
 if($_GET['c']=="ins")
{
 $db->query("insert into send_mail(title,content)values('".$_POST['title']."','".$_POST['content']."')");
}
if($_GET['c']=="del")
{
 $db->query("delete from `send_mail` where id=".$_GET['id']);
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
        <form action="?c=ins" method="post">
         姓名：<input type="text" name="title">邮箱：<input type="text" name="content"/>
        <input type="submit" value="添加" > &nbsp;&nbsp;&nbsp;&nbsp;<input onClick="location.href='mail_ins.php'" type="button" value="添加本期"/>
        </form>
       
         <table width="100%">
          <tr>
           <th width="10%">ID</th>
           <th width="20%">姓名</th>
           <th width="50%">邮箱</th>
           
           <th width="20%">操作</th>
          </tr>
          <?php
		  
		  $where[]="1=1";
		 
		
          $rs=$db->query("select * from `send_mail` where ".implode(' and ',$where)." order by id desc ");
		
		    $i=0;
		  while($row=$rs->fetch_array())
		   {
			   $i++;
			 ?>
             <tr align="center"><td><?php echo $i;?></td><td><?php echo $row['title'];?></td>
             <td><?php echo $row['content'];?></td>
            
             <td><input type="button" value="删除" onClick="if(confirm('确定删除？'))location.href='send_mail.php?c=del&id=<?php echo $row['id']?>'"/></td></tr>
             <?php
			}
		  ?>
         </table>
        </td>
        
      </tr>
    
      <tr>
        <td width="2%">&nbsp;</td>
        <td width="51%" class="left_txt"><img src="images/icon-mail2.gif" width="16" height="11"> 客户服务邮箱：*****************<br>
          <img src="images/icon-phone.gif" width="17" height="14"> 官方网站:*****************</td>
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
