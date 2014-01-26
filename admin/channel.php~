<?php
require_once("head.php");
require_once("get_qrcode.php");   
$tbl = "channel_tbl";
$area = '其他渠道';
if(isset($_GET['area'])) {
	$area = $_GET['area'];
	if($area == 'E') {
		$area = '华东';
	} else if($area == 'W') {
		$area = '华西';
	} else if($area == 'S') {
		$area = '华南';
	} else if($area == 'N') {
		$area = '华北';
	} else if($area == 'C') {
		$area = '华中';
	} else if($area == 'O') {
		$area = '其他渠道';
	}
}

if(isset($_GET['c']) && $_GET['c']=="del") {
    $db->query("delete from `channel` where id=".$_GET['id']);
}
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
        <td height="31"><div class="titlebt">渠道管理</div></td>
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
         <input type="hidden" name="area" value="<?php echo $area ?>"/>
         城市：<input type="text" name="city" value="<?php if(isset($_GET['city'])) {echo $_GET['city'];} else {echo '';}?>"/>
         学校：<input type="text" name="school" value="<?php if(isset($_GET['school'])) {echo $_GET['school'];} else {echo '';}?>"/>
            <input type="submit" value="搜索" id='searchID'/>
            <input type="button" value="添加" onClick="location.href='channel_ins.php?c=add&area=<?php echo $area ?>'"/>
        </form>
         <table width="100%" border="1">
          <tr>
           <th width="10%">城市</th>
	   <th width="20%">学校</th>
           <th width="20%">二维码</th>
           <th width="10%">渠道经理</th>
           <th width="20%">操作</th>
          </tr>
	<?php
	   $where[]="channel_area = '".$area."'";
            if(isset($_GET['city']) && $_GET['city'] != "") {
                $where[]=" channel_city like '%".$_GET['city']."%'";
            }
            if(isset($_GET['school']) && $_GET['school'] != "") {
                $where[]=" channel_university = '".$_GET['school']."'";
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
		$qrcode_file = GetQRCode($area."|".$row['channel_city']."|".$row['channel_university']);
        ?>
            <tr align="center">
            <td><?php echo $row['channel_city'];?>&nbsp;</td>
            <td><?php echo $row['channel_university'];?>&nbsp;</td>
	    <td><?php echo "<a href=".$qrcode_file." target=_blank>查看</a>"?>&nbsp;</td>
            <td><?php echo $row['channel_manager'];?>&nbsp;</td>
	    <td><input type="button" value="修改" onClick="location.href='channel_ins.php?c=upd&area=<?php echo $area ?>&city=<?php echo $row['channel_city']?>&university=<?php echo $row['channel_university']?>&manager=<?php echo $row['channel_manager']?>'"/>
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
	    if(!isset($_GET['city'])) {
		$_GET['city'] = '';
	    }
	    if(!isset($_GET['school'])) {
		$_GET['school'] = '';
	    }
	    $subPages=new SubPages($page_size, $nums, $pageCurrent, $sub_pages, "channel.php?city=".$_GET['city']."&school=".$_GET['school']."&p=", 2);
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
