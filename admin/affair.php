<?php
header("Content-type:text/html;charset=utf-8"); 
require_once('./mysql_db.class.php');
require_once("page_class.php");   
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
    $db->query("delete from `affair_type` where type_name = '".$_GET['type_name']."'");
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
        <td height="31"><div class="titlebt">事务分类</div></td>
      </tr>
    </table></td>
    <td width="16" valign="top" background="images/mail_rightbg.gif"><img src="images/nav-right-bg.gif" width="16" height="29" /></td>
  </tr>
  <tr>
    <td valign="middle" background="images/mail_leftbg.gif">&nbsp;</td>
    <td valign="top" bgcolor="#F7F8F9">
      <table width="98%" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td colspan="2" valign="top">&nbsp;</td>
        <td>&nbsp;</td>
        <td valign="top">&nbsp;</td>
      </tr>
      <tr>
        <td colspan="4">   
        <input type="button" value="添加" onClick="location.href='affair_ins.php'"/>
         <table width="100%" border="1">
          <tr>
           <th width="10%">事务分类名称</th>
           <th width="10%">操作</th>
          </tr>
          <?php
		  $pag=($_GET['p']-1)*$page_size;
		  $where[]="1=1";
          $rs=$db->query("select * from `affair_type` where ".implode(' and ',$where)." limit ".$pag.",".$page_size);
		  $coun=$db->query("select count(*) from `affair_type` where ".implode(' and ',$where))->fetch_Array();
		  $i = 0;
		  while($row = $rs->fetch_array())
		  {
			   $i ++;
		 ?>
             <tr align="center">
                <td><?php echo $row['type_name'];?></td> 
                <td>
                    <input type="button" value="修改" onClick="location.href='affair_ins.php?c=upd&type_name=<?php echo $row['type_name']?>'"/>
                    <input type="button" value="删除" onClick="if(confirm('确定删除？'))location.href='affair.php?c=del&type_name=<?php echo $row['type_name']?>'"/></td>
            </tr>
             <?php
			}
		  ?>
         </table>
        </td>
        
      </tr>
      <tr><Td colspan="5">
        <?php
            $nums = $coun[0]; 
            $subPages = new SubPages($page_size, $nums, $pageCurrent, $sub_pages, "affair.php?p=",2);   
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
