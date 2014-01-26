<?php
require('./mysql_db.class.php');
$db=new db();
if($_GET['c']=="ins")
{
 $type=($_POST['contact_id']=="rot")?1:2;
 $_POST['contact_id']=($_POST['contact_id']=="rot")?0:$_POST['contact_id'];
 //======================修改操作
 if($_POST['hidden_id']!='')
  {
	$db->query("update `column` set title='".$_POST['title']."',contact_id='".$_POST['contact_id']."',sort='".$_POST['sort']."',href='".$_POST['href']."' where id=".$_POST['hidden_id']);  
  }
  //========================添加操作
  else
  {
  $db->query("INSERT INTO `column` (`title` ,`type` ,`contact_id` ,`sort` ,`href`)VALUES ( '".$_POST['title']."', '".$type."', '".$_POST['contact_id']."', '".$_POST['sort']."', '".$_POST['href']."')");
  }
}
//=====================调用二级菜单
if($_POST['c']=="ajax")
{
 $rs=$db->query("select * from `column` where contact_id=".$_POST['id']." and type =2");
 while($row=$rs->fetch_array())
  {
	echo"<a href='#'>".$row['title']."</a>&nbsp;&nbsp;&nbsp;<img src='images/b_edit.png' onClick='edip(".$row['id'].",\"".$row['title']."\",\"".$row['sort']."\",\"".$row['href']."\",\"".$row['contact_id']."\")'>&nbsp;&nbsp;&nbsp;<img src='images/b_drop.png' onclick='if(confirm(\"确定删除？\"))location.href=\"admin_column.php?c=del&id=".$row['id']."\";'><br/>";
  }
   exit;
}
if($_GET['c']=="del")
{
 $db->query("delete from `column` where id=".$_GET['id']);
}
?>
<link href="images/skin.css" rel="stylesheet" type="text/css" />
<script src="js/jquery.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><style type="text/css">
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
         <table>
             <form method="post" action="?c=ins">
              <input type="hidden" name="hidden_id" id="hidden_id"/>
              <tr>
                 <td><a>标签</a>：</td><td><input type="text" id="title" name="title"/></td>
              </tr>
              <tr>
                 <td>关联级：</td>
                 <td>
                    <select name="contact_id" id="contact_id"><option value="rot">根部</option>
                     <?php
                        $rs=$db->query("SELECT * FROM `column` WHERE `type` =1");
						while($row=$rs->fetch_array())
						 {
						?>
						<option value="<?php echo $row['id'];?>" ><?php echo $row['title'];?></option>
						<?php
						}            
					 ?>
                    </select> 
                 </td>
              </tr>
             <tr>
                 <td>链接：</td><td><input type="text" id="href" name="href"/></td>
              </tr> 
              <tr>
                 <td>排序：</td><td><input type="text" id="sort" name="sort"/></td>
              </tr>
              <tr>
                 <td colspan="2"><input  type="submit" value="提交"/></td>
              </tr>
             </form>
         </table>
         <table width="60%" >
          <tr>
            <th style="color:#000; width:50%;">一级标签</th>
            <th style="color:#000;width:50%;">二级标签</th>
          </tr>
          <tr>
           <td style="text-align:center">
          <?php
          $rs=$db->query("select * from `column` where `type`=1");
		  while($row=$rs->fetch_array())
		   {
			 echo "<a href='#' id='".$row['id']."' class='title'>".$row['title']."</a>&nbsp;&nbsp;&nbsp;<img src='images/b_edit.png' onClick='edip(".$row['id'].",\"".$row['title']."\",\"".$row['sort']."\",\"".$row['href']."\",\"".$row['contact_id']."\")'>&nbsp;&nbsp;&nbsp;<img src='images/b_drop.png' onclick='if(confirm(\"确定删除？\"))location.href=\"admin_column.php?c=del&id=".$row['id']."\";'><br/>";
			}
		  ?>
          </td>
          <td id="title_sed"  style="text-align:center"></td>
          </tr>
         </table>
        </td>
        
      </tr>
      <tr>
        <td width="2%">&nbsp;</td>
        <td width="51%" class="left_txt"><img src="images/icon-mail2.gif" width="16" height="11"> 客户服务邮箱:****************<br>
          <img src="images/icon-phone.gif" width="17" height="14"> 官方网站：******************</td>
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
<script>
 $(".title").click(function(){

	$.ajax({
	type:'post',
	url:'admin_column.php',
	data:'c=ajax&id='+this.id,
	success:function(msg){
	 $("#title_sed").html(msg);
	}
	})
 })
 function edip(value1,value2,value3,value4,value5){
	  $("#hidden_id").val(value1);
	  $("#title").val(value2);
	  $("#sort").val(value3);
	  $("#href").val(value4);
	  $("#contact_id").val(value5).attr("selected",true);
	 }
</script>