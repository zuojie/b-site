<?php
require('head.php');
$tbl = "translater_tbl";
?>
<link href="images/skin.css" rel="stylesheet" show="text/css" />
<script src="js/jquery.js"></script>
</style>
<body style="font-size:9px">
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="17" valign="top" background="images/mail_leftbg.gif"><img src="images/left-top-right.gif" width="17" height="29" /></td>
    <td valign="top" background="images/content-bg.gif"><table width="100%" height="31" border="0" cellpadding="0" cellspacing="0" class="left_topbg" id="table2">
      <tr>
        <td height="31"><div class="titlebt">译员管理</div></td>
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
         用户名：<input type="text" name="name" value="<?php if(isset($_GET['name'])) {echo $_GET['name'];} else {echo '';}?>"/>
         语种：<input type="text" name="lang" value="<?php if(isset($_GET['lang'])) {echo $_GET['lang'];} else {echo '';}?>"/>
            <input type="submit" value="搜索" id='searchID'/>
	    <input type="button" value="添加" onClick="location.href='translater_ins.php?c=add'"/>
        </form>
         <table width="100%" border="1">
          <tr>
           <th width="10%">ID</th>
           <th width="10%">用户名</th>
           <th width="20%">电话</th>
           <th width="20%">邮箱</th>
           <th width="20%">QQ</th>
           <th width="10%">语种</th>
           <th width="20%">操作</th>
          </tr>
	<?php
	   $where[]="1=1";
            if(isset($_GET['name']) && $_GET['name'] != "") {
                $where[]=" name like '%".$_GET['name']."%'";
            }
            if(isset($_GET['lang']) && $_GET['lang'] != "") {
                $where[]="lang = '".$_GET['lang']."'";
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
            <td><?php echo $row['id'];?>&nbsp;</td>
            <td><?php echo $row['name'];?>&nbsp;</td>
            <td><?php echo $row['phone'];?>&nbsp;</td>
            <td><?php echo $row['email'];?>&nbsp;</td>
            <td><?php echo $row['qq'];?>&nbsp;</td>
            <td><?php echo $row['lang'];?>&nbsp;</td>
	    <td><input type="button" value="修改" onClick="location.href='translater_ins.php?c=upd&id=<?php echo $row['id'] ?>'"/>
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
	    if(!isset($_GET['id'])) {
		$_GET['id'] = '';
	    }
	    $subPages=new SubPages($page_size, $nums, $pageCurrent, $sub_pages, "translater.php?id=".$_GET['id']."&p=", 2);
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
