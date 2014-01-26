<?php
header("Content-type:text/html;charset=utf-8"); 
require_once('./mysql_db.class.php');
require_once("page_class.php"); 
$db=new db();
$tbl = "user_tbl";
if($_GET['c']=="ins") { // 提交修改/增加
    if($_POST['hidden_name'] != '') { // update
        $sql = "UPDATE @table SET `name`='@name', `mail_addr`='@email', `phone`='@phone', `qq`='@qq`, user_type`='@user_type', `money`=@money, `channel_area`='@channel_area', `channel_city`='@channel_city', `channel_university`='@channel_university' WHERE `name`='@hidden_name'"; 
        $sql = str_replace("@hidden_name", $_POST["hidden_name"], $sql);
    } else { //add
        $sql = "INSERT INTO @table (`name`, `password`, `mail_addr`, `phone`, `qq`, `user_type`, `money`, `channel_area`, `channel_city`, `channel_university`) VALUES ('@name', '@password', '@email', '@phone', '@qq', '@user_type', @money, '@channel_area', '@channel_city', '@channel_university')"; 
    }
    $sql = str_replace("@table", $tbl, $sql);
    $sql = str_replace("@name", $_POST["user_name"], $sql);
    $sql = str_replace("@password", "7110eda4d09e062aa5e4a390b0a572ac0d2c0220", $sql);
    $sql = str_replace("@email", $_POST["email"] == "" ? 'null' : $_POST["email"], $sql);
    $sql = str_replace("@phone", $_POST["phone"] == "" ? 'null' : $_POST["phone"], $sql);
    $sql = str_replace("@qq", $_POST["qq"] == "" ? 'null' : $_POST["qq"], $sql);
    $sql = str_replace("@user_type", $_POST["usertype"] == "" ? '2' : $_POST["usertype"], $sql);
    $sql = str_replace("@money", $_POST["money"] == "" ? '0' : $_POST["money"], $sql);
    $sql = str_replace("@channel_area", $_POST["classify"] == "" ? 'null' : $_POST["classify"], $sql);
    $sql = str_replace("@channel_city", $_POST["subclassify"] == "" ? 'null' : $_POST["subclassify"], $sql);
    $sql = str_replace("@channel_university", $_POST["channel_university"] == "" ? 'null' : $_POST["channel_university"], $sql);
    $db->query($sql);  
    echo "<script>alert('操作成功');location.href='user.php'</script>";
} else if($_GET['c'] == "upd") { // 修改
    $qsql = "select * from ".$tbl." where name = '".$_GET['name']."'";
    $row=$db->query($qsql)->fetch_array();
    $user_name = $row['name'];
    $email = $row['mail_addr'];
    $phone = $row['phone'];
    $qq = $row['qq'];
    $user_type = $row['user_type'];
    $money = $row['money'];
    $channel_area = $row['channel_area'];
    $channel_city = $row['channel_city'];
    $channel_university = $row['channel_university'];
} else if($_GET['c'] == 'add') { // 增加
    $user_name = '';
    $email = '';
    $phone = '';
    $qq = '';
    $user_type = '';
    $money = '';
    $channel_area = '';
    $channel_city = '';
    $channel_university = '';
}
?>
<script>
          function checkSub(val) {
              var old_subSel = document.getElementById("subclassifyID");
              var sel = document.getElementById("classifyID");
              var dad = old_subSel.parentNode;
              dad.removeChild(old_subSel);
              var subSel = null;
              try {
                subSel = document.createElement('<select name="subclassify">'); // for IE
              } catch(e) {
                  subSel = document.createElement("select");
                  subSel.setAttribute('name', 'subclassify');
                  subSel.name = 'subclassify'; // for IE
              }
              subSel.setAttribute('id', 'subclassifyID');
              subSel.id = 'subclassifyID'; // for IE
              var xhr;
              if(window.ActiveXObject) {
                  try {
                      xhr = new ActiveXObject("Microsoft.XMLHTTP");
                  } catch (e) {
                      xhr = new ActiveXOjbect("Msxml2.XMLHTTP");
                  }
              } else if(window.XMLHttpRequest) {
                  xhr = new XMLHttpRequest();
              } else {
                  alert('对不起，当前浏览器不支持ajax，建议使用，chrome，firefox，ie等的最新版');
                  return;
              }
              var father = val;
              arg = "?channel_area=" + father;
              arg = encodeURI(arg);
              xhr.open("get", "get_channel_city.php" + arg, false);
              xhr.send(null);
              var res = xhr.responseText;
              var arr = res.split('_fuck_ie');
	      arr.pop();
	      if(val == "") {
		      arr[0] = '无';
	      }
              for(var i in arr) {
                  var ele = arr[i];
                  opt = document.createElement("option");
                  opt.text = ele;
                  opt.value = ele;
                  subSel.add(opt);
              }
              dad.insertBefore(subSel, sel.nextSibling);
          }
</script>
<script type="text/javascript">
    $('#elm1').xheditor({tools:'full',skin:'default',showBlocktag:true,internalScript:false,internalStyle:false,width:800,height:400,fullscreen:false,sourceMode:false,forcePtag:true, upImgUrl:"../upload_img.php",upImgExt:"jpg,jpeg,gif,png"});
</script>
<link href="images/skin.css" rel="stylesheet" show="text/css" />
<link href="css/main.css" rel="stylesheet" show="text/css" />
<script src="js/jquery.js"></script>
<script src="xheditor/xheditor-1.1.14-zh-cn.min.js"></script>
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
<form action="?c=ins" method="post"  enctype="multipart/form-data">
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="17" valign="top" background="images/mail_leftbg.gif">
        <img src="images/left-top-right.gif" width="17" height="29" /></td>
    <td valign="top" background="images/content-bg.gif">
        <table width="100%" height="31" border="0" cellpadding="0" cellspacing="0" class="left_topbg" id="table2">
        <tr>
            <td height="31">
                <div class="titlebt"><?php if($_GET['c']=="upd") {echo "修改用户";}else{echo "添加用户";}?></div></td>
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
                        <input type="hidden" value="<?php echo $user_name ?>" name="hidden_name"/>
                        <tr><td width="10%">用户名:</td><td>
				<input id="user_nameID" type="text" size="50" value="<?php echo $user_name ?>" name="user_name"/>*
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">邮箱地址:</td><td>
				<input id="emailID" type="text" size="50" value="<?php echo $email ?>" name="email"/>
			</td></tr> 
                        <tr><td width="10%">电话:</td><td>
				<input id="phoneID" type="text" size="50" value="<?php echo $phone ?>" name="phone"/>
			</td></tr> 
                        <tr><td width="10%">QQ:</td><td>
				<input id="qqID" type="text" size="50" value="<?php echo $qq ?>" name="qq"/>
			</td></tr> 
                        <tr><td width="10%">用户类型:</td><td>
              			<select name="usertype" id="usertypeID">
				<option value = '1'>企业</option>
				<option value = '2' selected='selected'>个人</option>
			</td></tr> 
                        <tr><td width="10%">积分:</td><td>
				<input id="moneyID" type="text" size="50" value="<?php echo $money ?>" name="money"/>
			</td></tr> 
                        <tr> <td width="10%">来源渠道:</td>
                            <td id = "channelTdID" style="width:100px">
			  	<select name="classify"  id="classifyID" onchange="checkSub(this.value)">
				<?php
				if($channel_area != "") {
					echo "<option value=''>无</option>";
				}
				?>
	     			<option value="<?php echo $channel_area;?>" selected="selected">
					<?php echo $channel_area == "" ? '无' : $channel_area ;?>
	     			</option>
               			<?php
				$rs=$db->query("select distinct(`channel_area`) from `channel_tbl`");
				$num = $rs == '' ? 0 : $rs->num_rows;
				for ($i = 0; $i < $num; $i ++, $top++) {
					$tmp = $rs->fetch_assoc();
					$manu = $tmp["channel_area"];
					if($manu == $channel_area) {
						continue;
					}
					echo "<option value='".$manu."'>$manu</option>";
				}
				?>
			      </select>
			      <select name="subclassify" id="subclassifyID">
			      <option value="<?php echo $channel_city;?>" selected="selected">
				<?php echo $channel_city == "" ? '无' : $channel_city;?>
			      </option>
				<?php
				$qsql = "select distinct(`channel_city`) from `channel_tbl` where channel_area = @area";
				$qsql = str_replace("@area", $default_classify_value, $qsql);
				$rs=$db->query($qsql);
				$num = $rs == '' ? 0 : $rs->num_rows;
				for ($i = 0; $i < $num; $i ++, $top++) {
					$tmp = $rs->fetch_assoc();
					$manu = $tmp["channel_city"];
					if($manu == $channel_city) {
						continue;
					}
					echo "<option value='".$manu."'>$manu</option>";
				}
				?>
			      </select>
                              <tr><td width="10%">来源学校:</td><td>
			      <input id="channel_universityID" type="text" size="50" 
				value="<?php echo $channel_university ?>" name="channel_university"/>
			      </td></tr>
                            </td>
                    </tr>
                    <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
		    <tr><td colspan="2">
		    <input id="addUserID" type="submit" value="提交"/></td></tr>
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
    var addMemberBtn = document.getElementById("addUserID");
    addMemberBtn.onclick=function(e) {
        var user_name = document.getElementById("user_nameID").value;
        if(!user_name) {
            alert("用户名不能为空")
            e.preventDefault();
        } 
    }
</script>

