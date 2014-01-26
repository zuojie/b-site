<?php
require('head.php');
$tbl = "admin_tbl";
$role = '';
if(isset($_GET['role'])) {
	$role = $_GET['role'];
} else {
	echo 'invalid!';
	exit(0);
}
?>
<link href="images/skin.css" rel="stylesheet" show="text/css" />
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
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="17" valign="top" background="images/mail_leftbg.gif"><img src="images/left-top-right.gif" width="17" height="29" /></td>
    <td valign="top" background="images/content-bg.gif"><table width="100%" height="31" border="0" cellpadding="0" cellspacing="0" class="left_topbg" id="table2">
      <tr>
        <td height="31"><div class="titlebt">雇员管理</div></td>
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
	<form method="get" action="">
         <input type="hidden" name="role" value="<?php echo $role ?>"/>
         用户名：<input type="text" name="name" value="<?php if(isset($_GET['name'])) {echo $_GET['name'];} else {echo '';}?>"/>
	 <?php if($role == "sales") { echo '渠道'; } else {echo '业务';}?>：<input type="text" name="business" value="<?php if(isset($_GET['business'])) {echo $_GET['business'];} else {echo '';}?>"/>
            <input type="submit" value="搜索" id='searchID'/>
	    <input type="button" value="添加" onClick="location.href='employee_ins.php?c=add&role=<?php echo $role ?>'"/>
        </form>
         <table width="100%" border="1">
          <tr>
           <th width="10%">用户名</th>
	   <th width="20%"><?php if($role == "sales") { echo '渠道'; } else {echo '业务';}?></th>
           <th width="20%">操作</th>
          </tr>
	<?php
	   $where[]="role = '".$role."'";
            if(isset($_GET['name']) && $_GET['name'] != "") {
                $where[]=" name like '%".$_GET['name']."%'";
            }
            if(isset($_GET['business']) && $_GET['business'] != "") {
                $where[]=" business = '".$_GET['business']."'";
            }
	    $sql1 = "select * from @tbl where ".implode(' and ',$where)." limit ".$pag.",".$page_size;
	    $sql1 = str_replace("@tbl", $tbl, $sql1);
	    $sql2 = "select count(*) from @tbl where ".implode(' and ',$where);
	    $sql2 = str_replace("@tbl", $tbl, $sql2);
            $rs=$db->query($sql1);
	    $coun=$db->query($sql2)->fetch_array();
	    $j = 0;
            while($row=$rs->fetch_array()) {
                $j++;
        ?>
            <tr align="center">
            <td><?php echo $row['name'];?>&nbsp;</td>
            <td><?php echo $row['business'];?>&nbsp;</td>
	    <td><input type="button" value="修改" onClick="location.href='employee_ins.php?c=upd&role=<?php echo $role ?>&name=<?php echo $row['name'] ?>&business=<?php echo $row['business']?>'"/>
            </td></tr>
            <?php
            }
	    ?>
         </table>
        </td>
      </tr>
      <tr><Td colspan="5">
<?php
	    //总条目数  
	    $nums=$coun[0]; 
	    if(!isset($_GET['name'])) {
		$_GET['name'] = '';
	    }
	    if(!isset($_GET['business'])) {
		$_GET['business'] = '';
	    }
	    $subPages=new SubPages($page_size, $nums, $pageCurrent, $sub_pages, "employee.php?role=".$role."name=".$_GET['name']."&business=".$_GET['business']."&p=", 2);
?>
      </td></tr>
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
