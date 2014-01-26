<?php
header("Content-type:text/html;charset=utf-8"); 
require_once('./mysql_db.class.php');
require_once("page_class.php"); 
$db=new db();
$tbl = "ord_tbl";
if(isset($_GET['id'])) {
	$ord_id = $_GET['id'];
} else {
	$ord_id = '';
}
if(isset($_GET['ord_type'])) {
	$ord_type = $_GET['ord_type'];
} else if(isset($_POST['ord_type'])) {
	$ord_type = $_POST['ord_type'];
}
if(isset($_GET['doc_type'])) {
	$doc_type = $_GET['doc_type'];
} else if(isset($_POST['doc_type'])) {
	$doc_type = $_POST['doc_type'];
}
if($_GET['c']=="ins") { // 提交修改/增加
    if($_POST['hidden_id'] != '') { // update
        $sql = "UPDATE @table SET `ord_user`='@ord_user', `src_lang`='@src_lang', `dst_lang`='@dst_lang', `doc_type`='@doc_type', `doc_title`='@doc_title', `doc_field`='@doc_field', `words_num`=@words_num, `price`=@price, `ord_stat`='@ord_stat', `ord_finish_time`='@ord_finish_time', `ord_owner`='@ord_owner', `ord_worker`='@ord_worker', `ord_score`='@ord_score', `ord_remark`='@ord_remark', `ord_type`='@ord_type' WHERE `ord_id`=@hidden_id"; 
        $sql = str_replace("@hidden_id", $_POST["hidden_id"], $sql);
    } else { //add
        $sql = "INSERT INTO @table (`ord_user`, `src_lang`, `dst_lang`, `doc_type`, `doc_title`, `doc_field`, `words_num`, `price`, `ord_stat`, `ord_finish_time`, `ord_owner`, `ord_worker`, `ord_score`, `ord_remark`, `ord_type`) VALUES ('@ord_user', '@src_lang', '@dst_lang', '@doc_type', '@doc_title', '@doc_field', @words_num, @price, '@ord_stat', '@ord_finish_time', '@ord_owner', '@ord_worker', '@ord_score', '@ord_remark', '@ord_type')"; 
    }
    $sql = str_replace("@table", $tbl, $sql);
    $sql = str_replace("@ord_user", $_POST["ord_user"], $sql);
    $sql = str_replace("@src_lang", $_POST["src_lang"], $sql);
    $sql = str_replace("@dst_lang", $_POST["dst_lang"], $sql);
    $sql = str_replace("@doc_type", $_POST["doc_type"], $sql);
    $sql = str_replace("@doc_title", $_POST["doc_title"], $sql);
    $sql = str_replace("@doc_field", $_POST["doc_field"], $sql);
    $sql = str_replace("@words_num", $_POST["words_num"], $sql);
    $sql = str_replace("@price", $_POST["price"], $sql);
    $sql = str_replace("@ord_stat", $_POST["ord_stat"], $sql);
    $sql = str_replace("@ord_finish_time", $_POST["ord_finish_time"], $sql);
    $sql = str_replace("@ord_owner", $_POST["ord_owner"], $sql);
    $sql = str_replace("@ord_worker", $_POST["ord_worker"], $sql);
    $sql = str_replace("@ord_score", $_POST["ord_score"], $sql);
    $sql = str_replace("@ord_remark", $_POST["ord_remark"], $sql);
    $sql = str_replace("@ord_type", $_POST["ord_type"], $sql);
    $db->query($sql);  
    echo "<script>alert('操作成功');location.href='order.php?ord_type=".$ord_type."&doc_type=".$doc_type."'</script>";
} else if($_GET['c'] == "upd") { // 修改
    $qsql = "select * from ".$tbl." where `ord_id` = ".$ord_id;
    $row=$db->query($qsql)->fetch_array();
    $ord_id = $row['ord_id'];
    $ord_user = $row['ord_user'];
    $src_lang = $row['src_lang'];
    $dst_lang = $row['dst_lang'];
    $doc_title = $row['doc_title'];
    $doc_field = $row['doc_field'];
    $words_num = $row['words_num'];
    $price = $row['price'];
    $ord_stat = $row['ord_stat'];
    $ord_finish_time = $row['ord_finish_time'];
    $ord_owner = $row['ord_owner'];
    $ord_worker = $row['ord_worker'];
    $ord_score = $row['ord_score'];
    $ord_remark = $row['ord_remark'];
    $ord_type = $row['ord_type'];
} else if($_GET['c'] == 'add') { // 增加
    $ord_id = '';
    $ord_user = '';
    $src_lang = '';
    $dst_lang = '';
    $doc_title = '';
    $doc_field = '';
    $words_num = '0';
    $price = '0';
    $ord_stat = '';
    $ord_finish_time = '';
    $ord_owner = '';
    $ord_worker = '';
    $ord_score = '';
    $ord_remark = '';
    $ord_type = '';
}
?>
<link href="images/skin.css" rel="stylesheet" show="text/css" />
<link href="css/main.css" rel="stylesheet" show="text/css" />
<script src="js/jquery.js"></script>
<body style="font-size:9px">
<form action="?c=ins" method="post"  enctype="multipart/form-data">
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="17" valign="top" background="images/mail_leftbg.gif">
        <img src="images/left-top-right.gif" width="17" height="29" /></td>
    <td valign="top" background="images/content-bg.gif">
        <table width="100%" height="31" border="0" cellpadding="0" cellspacing="0" class="left_topbg" id="table2">
        <tr>
            <td height="31">
                <div class="titlebt"><?php if($_GET['c']=="upd") {echo "修改订单";}else{echo "添加订单";}?></div></td>
        </tr>
        </table>
    </td>
    <td width="16" valign="top" background="images/mail_rightbg.gif">
	<img src="images/nav-right-bg.gif" width="16" height="29"/></td>
  </tr>
  <tr>
    <td valign="middle" background="images/mail_leftbg.gif">&nbsp;</td>
    <td valign="top" bgcolor="#F7F8F9">
        <table width="98%" border="0" align="center" cellpadding="0" cellspacing="0">
            <tr>
                <td colspan="1" valign="top">&nbsp;</td>
                <td colspan="1" valign="top">&nbsp;</td>
                <td colspan="1" valign="top">&nbsp;</td>
            </tr>
            <tr>
                <td colspan="1">
                    <table cellspacing="0" cellpadding="0" width="100%" id="tableID">
                        <input type="hidden" value="<?php echo $ord_id ?>" name="hidden_id"/>
			<tr><td width="10%">下单用户:</td><td>
				<input type="text" size="50" value="<?php echo $ord_user  ?>" name="ord_user" id="ord_userID"/>*
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">源语言:</td><td>
				<input type="text" size="50" value="<?php echo $src_lang ?>" name="src_lang" id="src_langID"/>*
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">目的语言:</td><td>
				<input type="text" size="50" value="<?php echo $dst_lang ?>" name="dst_lang" id="dst_langID"/>*
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">文档类型:</td><td>
              			<select name="doc_type">
				<?php
				$rs=$db->query("select distinct(`doc_type`) from `doc_type_tbl`");
				$num = $rs == '' ? 0 : $rs->num_rows;
				for ($i = 0; $i < $num; $i ++) {
					$tmp = $rs->fetch_assoc();
					$manu = $tmp["doc_type"];
					if($manu == $doc_type) {
						echo "<option value='".$manu."' selected='selected'>".$manu."</option>";
					} else {
						echo "<option value='".$manu."'>$manu</option>";
					}
				}
				?>
				</select>
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">文档标题:</td><td>
				<input type="text" size="50" value="<?php echo $doc_title ?>" name="doc_title"/>
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">文档领域:</td><td>
				<select name="doc_field">
				<?php
				$rs=$db->query("select distinct(`doc_field`) from `doc_field_tbl`");
				$num = $rs == '' ? 0 : $rs->num_rows;
				for ($i = 0; $i < $num; $i ++) {
					$tmp = $rs->fetch_assoc();
					$manu = $tmp["doc_field"];
					if($manu == $doc_field) {
						echo "<option value='".$manu."' selected='selected'>".$manu."</option>";
					} else {
						echo "<option value='".$manu."'>$manu</option>";
					}
				}
				?>
				</select>
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">字数:</td><td>
				<input type="text" size="50" value="<?php echo $words_num ?>" name="words_num"/>
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">价格:</td><td>
				<input type="text" size="50" value="<?php echo $price ?>" name="price"/>
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">订单状态:</td><td>
				<select name="ord_stat">
				<?php
				$rs=$db->query("select distinct(`ord_stat`) from `ord_stat_tbl`");
				$num = $rs == '' ? 0 : $rs->num_rows;
				for ($i = 0; $i < $num; $i ++) {
					$tmp = $rs->fetch_assoc();
					$manu = $tmp["ord_stat"];
					if($manu == $ord_stat) {
						echo "<option value='".$manu."' selected='selected'>".$manu."</option>";
					} else {
						echo "<option value='".$manu."'>$manu</option>";
					}
				}
				?>
				</select>*
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">完成时间(YYYY-MM-DD):</td><td>
				<input type="text" size="50" value="<?php echo $ord_finish_time ?>" name="ord_finish_time"/>
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">客户经理:</td><td>
				<select name="ord_owner">
				<?php
				$rs=$db->query("select distinct(`name`) from `admin_tbl` where `role` = 'manager'");
				$num = $rs == '' ? 0 : $rs->num_rows;
				for ($i = 0; $i < $num; $i ++) {
					$tmp = $rs->fetch_assoc();
					$manu = $tmp["name"];
					if($manu == $ord_owner) {
						echo "<option value='".$manu."' selected='selected'>".$manu."</option>";
					} else {
						echo "<option value='".$manu."'>$manu</option>";
					}
				}
				?>
				</select>*
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">译员:</td><td>
				<select name="ord_worker">
				<?php
				$rs=$db->query("select distinct(`name`) from `translater_tbl`");
				$num = $rs == '' ? 0 : $rs->num_rows;
				for ($i = 0; $i < $num; $i ++) {
					$tmp = $rs->fetch_assoc();
					$manu = $tmp["name"];
					if($manu == $ord_worker) {
						echo "<option value='".$manu."' selected='selected'>".$manu."</option>";
					} else {
						echo "<option value='".$manu."'>$manu</option>";
					}
				}
				?>
				</select>*
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">评价:</td><td>
				<input type="text" size="50" value="<?php echo $ord_score ?>" name="ord_score"/>
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">备注:</td><td>
				<input type="text" size="50" value="<?php echo $ord_remark ?>" name="ord_remark"/>
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">订单类型:</td><td>
				<select name="ord_type">
				<?php
				if($ord_type == "2") {
					echo "<option value='1'>正常</option>";
					echo "<option value='2' selected='selected'>异常</option>";
				} else {
					echo "<option value='1' selected='selected'>正常</option>";
					echo "<option value='2'>异常</option>";
				}
				?>
				</select>
			</td></tr> 
                    <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
		    <tr><td colspan="2">
		    <input id="addID" type="submit" value="提交"/></td></tr>
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
</form>
</body>
<script>
    var addMemberBtn = document.getElementById("addID");
    addMemberBtn.onclick=function(e) {
        var ord_user = document.getElementById("ord_userID").value;
        var src_lang = document.getElementById("src_langID").value;
        var dst_lang = document.getElementById("dst_langID").value;
        if(!ord_user) {
            alert("下单用户不能为空")
            e.preventDefault();
	} else if(!src_lang) {
            alert("源语言不能为空")
            e.preventDefault();
	} else if(!dst_lang) {
            alert("目的语言不能为空")
            e.preventDefault();
	}
    }
</script>

