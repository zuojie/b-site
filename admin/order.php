<?php
require_once('head.php');
$tbl = "ord_tbl";
session_start();
$login_user = $_SESSION['admin_usr'];
$user_role = $_SESSION['user_role'];
$default_user = isset($_GET['user']) ? $_GET['user'] : '';
// 正常、异常
$default_type = isset($_GET['ord_type']) ? $_GET['ord_type'] : '';
// 文档类型（简历、论文）
$default_doc_type = isset($_GET['doc_type']) ? $_GET['doc_type'] : '';
$default_src_lang = isset($_GET['src_lang']) ? $_GET['src_lang'] : '';
$default_dst_lang = isset($_GET['dst_lang']) ? $_GET['dst_lang'] : '';
$default_title = isset($_GET['doc_title']) ? $_GET['doc_title'] : '';
$default_field = isset($_GET['doc_field']) ? $_GET['doc_field'] : '';
$default_stat = isset($_GET['ord_stat']) && $_GET['ord_stat'] != "" ? $_GET['ord_stat'] : '所有状态';
$default_stat_value = isset($_GET['ord_stat']) ? $_GET['ord_stat'] : '';
$default_owner = isset($_GET['ord_owner']) && $_GET['ord_owner'] != "" ? $_GET['ord_owner'] : '所有经理';
$default_owner_value = isset($_GET['ord_owner']) ? $_GET['ord_owner'] : '';
$default_worker = isset($_GET['ord_worker']) && $_GET['ord_worker'] != "" ? $_GET['ord_worker'] : '所有译员';
$default_worker_value = isset($_GET['ord_worker']) ? $_GET['ord_worker'] : '';
$default_score = isset($_GET['ord_score']) && $_GET['ord_score'] != "" ? $_GET['ord_score'] : '所有评价';
$default_score_value = isset($_GET['ord_score']) ? $_GET['ord_score'] : '';
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
      <td height="31"><div class="titlebt"><?php if($default_type=='1') { echo "正常订单";}else{echo "异常订单";}?></div></td>
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
         <input type="hidden" name="ord_type" value="<?php echo $default_type ?>"/>
         <input type="hidden" name="doc_type" value="<?php echo $default_doc_type ?>"/>
         下单用户：<input type="text" name="user" value="<?php echo $default_user ?>"/>
         源语言：<input type="text" name="src_lang" value="<?php echo $default_src_lang ?>"/>
         目的语言：<input type="text" name="dst_lang" value="<?php echo $default_dst_lang ?>"/>
         标题：<input type="text" name="doc_title" value="<?php echo $default_title ?>"/>
         领域:<input type="text" name="doc_field" value="<?php echo $default_field ?>"/>
	 <select name="ord_stat" id="ord_statID">
	 <option value="<?php echo $default_stat_value ?>" selected="selected"><?php echo $default_stat ?></option>
		<?php 
		if($default_stat_value != '') {
			echo "<option value=''>所有状态</option>";
		}
		$rs=$db->query("select distinct(`ord_stat`) from `".$tbl."`");
		$num = $rs == '' ? 0 : $rs->num_rows;
		for ($i = 0; $i < $num; $i ++) {
			$tmp = $rs->fetch_assoc();
			$manu = $tmp["ord_stat"];
			if($manu == $default_stat_value) {
				continue;
			}
			echo "<option value='".$manu."'>$manu</option>";
	       	}
		?>
	 </select>
	<?php
		if($user_role == 'admin') {
	 		echo '<select name="ord_owner">';
	 		echo '<option value="'.$default_owner_value.'" selected="selected">'.$default_owner.'</option>';
			if($default_owner_value != '') {
				echo "<option value=''>所有经理</option>";
			}
			$rs=$db->query("select distinct(`ord_owner`) from `".$tbl."`");
			$num = $rs == '' ? 0 : $rs->num_rows;
			for ($i = 0; $i < $num; $i ++) {
				$tmp = $rs->fetch_assoc();
				$manu = $tmp["ord_owner"];
				if($manu == $default_owner_value) {
					continue;
				}
				echo "<option value='".$manu."'>$manu</option>";
			}
			echo '</select>';
		}
	?>
	 <select name="ord_worker">
	 <option value="<?php echo $default_worker_value ?>" selected="selected"><?php echo $default_worker?></option>
		<?php 
		if($default_worker_value != '') {
			echo "<option value=''>所有译员</option>";
		}
		$rs=$db->query("select distinct(`ord_worker`) from `".$tbl."`");
		$num = $rs == '' ? 0 : $rs->num_rows;
		for ($i = 0; $i < $num; $i ++) {
			$tmp = $rs->fetch_assoc();
			$manu = $tmp["ord_worker"];
			if($manu == $default_worker_value) {
				continue;
			}
			echo "<option value='".$manu."'>$manu</option>";
	       	}
		?>
	 </select>
	 <select name="ord_score">
	 <option value="<?php echo $default_score_value ?>" selected="selected"><?php echo $default_score ?></option>
		<?php 
		if($default_score_value != '') {
			echo "<option value=''>所有评价</option>";
		}
		$rs=$db->query("select distinct(`ord_score`) from `".$tbl."`");
		$num = $rs == '' ? 0 : $rs->num_rows;
		for ($i = 0; $i < $num; $i ++) {
			$tmp = $rs->fetch_assoc();
			$manu = $tmp["ord_score"];
			if($manu == $default_worker_value) {
				continue;
			}
			echo "<option value='".$manu."'>$manu</option>";
	       	}
		?>
	 </select>
            <input type="submit" value="搜索" id='searchID'/>
	<?php
		if($default_type == "2") {
		} else {
	    		echo '<input type="button" value="添加" onClick=location.href=\'order_ins.php?c=add&ord_type='.$default_type.'&doc_type='.$default_doc_type.'\'>';
		}
	?>
        </form>
         <table width="100%" border="1" style="table-layout:fixed;">
          <tr>
           <th width="10%">订单ID</th>
           <th width="10%">用户</th>
           <th width="10%">源语言</th>
           <th width="10%">目的语言</th>
           <th width="20%">文档标题</th>
           <th width="10%">专业领域</th>
           <th width="10%">字数</th>
           <th width="10%">价格</th>
           <th width="10%">状态</th>
           <th width="10%">预计完成时间</th>
           <th width="10%">客户经理</th>
           <th width="10%">译员</th>
           <th width="10%">评价</th>
           <th width="10%">备注</th>
           <th width="10%">更新时间</th>
           <th width="10%">操作</th>
          </tr>
	<?php
		$where[]="1=1";
		if($default_type != "") {
                	$where[]=" ord_type like '%".$default_type."%'";
		}
		if($default_doc_type != "") {
                	$where[]=" doc_type like '%".$default_doc_type."%'";
		}
		if($default_user != "") {
                	$where[]=" ord_user like '%".$default_user."%'";
		}
		if($default_src_lang != "") {
			$where[]="src_lang = '".$default_src_lang."'";
		}
		if($default_dst_lang != "") {
			$where[]="dst_lang = '".$default_dst_lang."'";
		}
		if($default_title != "") {
			$where[]="doc_title = '".$default_title."'";
		}
		if($default_field != "") {
			$where[]="doc_field = '".$default_field."'";
		}
		if($default_stat_value != "") {
			$where[]="ord_stat = '".$default_stat_value."'";
		}
		if($user_role == 'manager') {
		       	$where[]="ord_owner = '".$login_user."'";
		} else {
			if($default_owner_value != "") {
				$where[]="ord_owner = '".$default_owner_value."'";
			}
		}
		if($default_worker_value != "") {
			$where[]="ord_worker = '".$default_worker_value."'";
		}
		if($default_score_value != "") {
			$where[]="ord_score = '".$default_score_value."'";
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
            <td><?php echo $row['ord_id'];?>&nbsp;</td>
            <td><?php echo $row['ord_user'];?>&nbsp;</td>
            <td><?php echo $row['src_lang'];?>&nbsp;</td>
            <td><?php echo $row['dst_lang'];?>&nbsp;</td>
            <td><?php echo $row['doc_title'];?>&nbsp;</td>
            <td><?php echo $row['doc_field'];?>&nbsp;</td>
            <td><?php echo $row['words_num'];?>&nbsp;</td>
            <td><?php echo $row['price'];?>&nbsp;</td>
            <td><?php echo $row['ord_stat'];?>&nbsp;</td>
            <td><?php echo $row['ord_finish_time'];?>&nbsp;</td>
            <td><?php echo $row['ord_owner'];?>&nbsp;</td>
            <td><?php echo $row['ord_worker'];?>&nbsp;</td>
            <td><?php echo $row['ord_score'];?>&nbsp;</td>
            <td><?php echo $row['ord_remark'];?>&nbsp;</td>
            <td><?php echo $row['ord_time'];?>&nbsp;</td>
	    <td><input type="button" value="修改" onClick="location.href='order_ins.php?c=upd&ord_type=<?php echo $default_type ?>&doc_type=<?php echo $default_doc_type ?>&id=<?php echo $row['ord_id'] ?>'"/>
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
	    $subPages=new SubPages($page_size, $nums, $pageCurrent, $sub_pages, "order.php?ord_type=".$default_type."&doc_type=".$default_doc_type."&p=", 2);
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
