<?php
header("Content-type:text/html;charset=utf-8"); 
require('./mysql_db.class.php');
require("page_class.php");   
$db=new db();
  $_GET['p']= ($_GET['p']>0?$_GET['p']:1);
    //每页显示的条数   
	  $page_size=20;   
	//每次显示的页数   
	  $sub_pages=10;   
	//得到当前是第几页   
	  $pageCurrent=$_GET["p"];   
	  //if(!$pageCurrent) $pageCurrent=1;   
      if($_GET['c']=="del")
      {
          $db->query("delete from `tel_us` where id=".$_GET['id']);
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
        <td height="31"><div class="titlebt">联系我们</div></td>
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
        <input type="button" value="添加" onClick="location.href='tel_us_ins.php'"/>
         <table width="100%" border="1">
          <tr>
           <th width="10%">ID</th>
           <th width="10%">联系人</th>
           <th width="10%">地址</th>
           <th width="10%">电话</th>
           <th width="10%">传真</th>
           <th width="10%">邮箱</th>
           <th width="10%">操作</th>
          </tr>
          <?php
		  $pag=($_GET['p']-1)*$page_size;
		  $where[]="1=1";
          $rs=$db->query("select * from `tel_us` where ".implode(' and ',$where)." order by id desc limit ".$pag.",".$page_size);
		  $coun=$db->query("select count(*) from `tel_us` where ".implode(' and ',$where)." order by id desc")->fetch_Array();
          if($coun[0] == 0) {
              $db->query("alter table tel_us auto_increment=1"); 
          }
		  $i=0;
		  while($row=$rs->fetch_array())
		   {
			   $i++;
			 ?>
             <tr align="center">
                <td><?php echo $i;?></td>
                <td><?php echo $row['branch'];?>&nbsp;</td>
                <td><?php echo $row['address'];?>&nbsp;</td>
                <td><?php echo $row['phone'];?>&nbsp;</td>
                <td><?php echo $row['fax'];?>&nbsp;</td>
                <td><?php echo $row['mail'];?>&nbsp;</td>
                <td><input type="button" value="修改" onClick="location.href='tel_us_ins.php?c=upd&id=<?php echo $row['id']?>'"/><input type="button" value="删除" onClick="if(confirm('确定删除？'))location.href='tel_us.php?c=del&id=<?php echo $row['id']?>'"/></td></tr>
             <?php
			}
		  ?>
         </table>
        </td>
      </tr>
      <tr><Td colspan="5">
        <?php
          $nums=$coun[0]; 
          $subPages=new SubPages($page_size,$nums,$pageCurrent,$sub_pages,"tel_us.php?p=",2);   
		?>
      </Td></tr>
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
