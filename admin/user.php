<?php
require_once("head.php");
$tbl = "user_tbl";

if(isset($_GET['c']) && $_GET['c']=="del") {
    $db->query("delete from `news` where id=".$_GET['id']);
}
?>
<link href="images/skin.css" rel="stylesheet" show="text/css" />
<script src="js/jquery.js"></script>
</style>
<script>
	function resetPasswd(name) {
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
		arg = "?name=" + name;
		arg = encodeURI(arg);
		xhr.open("get", "reset_password.php" + arg, false);
		xhr.send(null);
              	var res = xhr.responseText;
		if(res == "true") {
			alert('重置成功');
		} else {
			alert('重置失败，请重试');
		}
	}
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
              for(var i in arr) {
                  var ele = arr[i];
                  opt = document.createElement("option");
                  opt.text = ele;
		  if(val == "") {
                  	opt.value = "";
		  }
                  subSel.add(opt);
              }
              //subSel.innerHTML = xhr.responseText;
              //dad.insertAfter(subSel, (dad.hasChildNodes()) ? sel : null);
              //dad.insertBefore(subSel, (dad.hasChildNodes()) ? sel.nextSibling : null);
              dad.insertBefore(subSel, sel.nextSibling);
          }
</script>
<body style="font-size:9px">
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="17" valign="top" background="images/mail_leftbg.gif"><img src="images/left-top-right.gif" width="17" height="29" /></td>
    <td valign="top" background="images/content-bg.gif"><table width="100%" height="31" border="0" cellpadding="0" cellspacing="0" class="left_topbg" id="table2">
      <tr>
        <td height="31"><div class="titlebt">用户管理</div></td>
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
      <?php
		$default_user_name = isset($_GET['user_name']) ? $_GET['user_name'] : '';
		$default_classify_value = isset($_GET['classify']) ? $_GET['classify'] : '';
		$default_classify_name = isset($_GET['classify']) && $_GET['classify'] != "" ? $_GET['classify'] : '所有渠道(大区)';
		$default_subclassify_value = isset($_GET['subclassify']) ? $_GET['subclassify'] : '';
		$default_subclassify_name = isset($_GET['subclassify']) && $_GET['subclassify'] != ""  ? $_GET['subclassify'] : '所有渠道(城市)';
		$default_usertype_value = isset($_GET['usertype']) ? $_GET['usertype'] : '';
		$default_usertype_name = isset($_GET['usertype']) && $_GET['usertype'] != ""  ? $_GET['usertype'] : '所有类型';
      ?>
      <tr>
        <td colspan="4">   
        <form method="get" action="?c=so">
         用户名：<input type="text" name="user_name" value="<?php echo $default_usertype_name ?>"/>
             <select name="classify"  id="classifyID" onchange="checkSub(this.value)">
	     <option value="<?php echo $default_classify_value;?>" selected="selected">
		<?php echo $default_classify_name;?>
	     </option>
               <?php
		if($default_classify_value != '') {
			echo "<option value=''>所有渠道(大区)</option>";
		}
		$rs=$db->query("select distinct(`channel_area`) from `channel_tbl`");
		$num = $rs == '' ? 0 : $rs->num_rows;
		for ($i = 0; $i < $num; $i ++, $top++) {
			$tmp = $rs->fetch_assoc();
			$manu = $tmp["channel_area"];
			if($manu == $default_classify_value) {
				continue;
			}
			echo "<option value='".$manu."'>$manu</option>";
	       	}
                ?>
              </select>
              <select name="subclassify" id="subclassifyID">
	      <option value="<?php echo $default_subclassify_value;?>" selected="selected">
		<?php echo $default_subclassify_name;?>
	      </option>
		<?php
		if($default_subclassify_value != '') {
			echo "<option value=''>所有渠道(城市)</option>";
		}
		$qsql = "select distinct(`channel_city`) from `channel_tbl` where channel_area = @area";
		$qsql = str_replace("@area", $default_classify_value, $qsql);
		$rs=$db->query($qsql);
		$num = $rs == '' ? 0 : $rs->num_rows;
		for ($i = 0; $i < $num; $i ++, $top++) {
			$tmp = $rs->fetch_assoc();
			$manu = $tmp["channel_city"];
			if($manu == $default_subclassify_value) {
				continue;
			}
			echo "<option value='".$manu."'>$manu</option>";
	       	}
                ?>
              </select>
              <select name="usertype" id="usertypeID">
		<?php 
		echo "<option value = '".$default_usertype_value."'selected='selected'>".$default_usertype_name."</option>";
		if($default_usertype_name != '所有类型') {
			echo "<option value = ''>所有类型</option>";
			if($default_usertype_value == '1') {
				echo "<option value = '2'>2</option>";
			} else {
				echo "<option value = '1'>1</option>";
			}
		} else {
			echo "<option value = '1'>1</option>";
			echo "<option value = '2'>2</option>";
		}
		?>
              </select>
            <input type="submit" value="搜索" id='searchID'/>
            <input type="button" value="添加" onClick="location.href='user_ins_.php?c=add'"/>
        </form>
         <table width="100%" border="1">
          <tr>
           <th width="10%">用户名</th>
	   <th width="20%">邮箱</th>
           <th width="20%">电话</th>
           <th width="20%">QQ</th>
           <th width="20%">用户类型(1:企业/2:个人)</th>
           <th width="10%">账户积分</th>
           <th width="20%">渠道(区域/城市/学校)</th>
           <th width="20%">操作</th>
          </tr>
	<?php
	   $where[]="1=1";
            if(isset($_GET['user_name']) && $_GET['user_name'] != "") {
                $where[]=" name like '%".$_GET['user_name']."%'";
            }
            if(isset($_GET['classify']) && $_GET['classify'] != "") {
                $where[]=" channel_area like '%".$_GET['classify']."%'";
            }
            if(isset($_GET['subclassify']) && $_GET['subclassify'] != "") {
                $where[]=" channel_city like '%".$_GET['subclassify']."%'";
            }
            if(isset($_GET['usertype']) && $_GET['usertype'] != "") {
                $where[]=" user_type = '".$_GET['usertype']."'";
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
            <td><?php echo $row['mail_addr'];?>&nbsp;</td>
            <td><?php echo $row['phone'];?>&nbsp;</td>
            <td><?php echo $row['qq'];?>&nbsp;</td>
            <td><?php echo $row['user_type'];?>&nbsp;</td>
            <td><?php echo $row['money'];?>&nbsp;</td>
            <td><?php echo $row['channel_area']." / ".$row["channel_city"]." / ".$row["channel_university"];?>&nbsp;</td>
            <td>
            <input type="button" value="修改" onClick="location.href='user_ins_.php?c=upd&name=<?php echo $row['name']?>'"/>
            <input type="button" value="重置密码" onClick="if(confirm('确定重置？'))resetPasswd('<?php echo $row['name']?>')"/>
            <!--<input type="button" value="删除" onClick="if(confirm('确定删除？'))location.href='news.php?c=del&id=<?php echo $row['id']?>'"/>
-->
            </td>
            </tr>
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
	    if(!isset($_GET['user_name'])) {
		$_GET['user_name'] = '';
	    }
	    if(!isset($_GET['classify'])) {
		$_GET['classify'] = '';
	    }
	    if(!isset($_GET['subclassify'])) {
		$_GET['subclassify'] = '';
	    }
	    if(!isset($_GET['usertype'])) {
		$_GET['usertype'] = '';
	    }
	    $subPages=new SubPages($page_size, $nums, $pageCurrent, $sub_pages, "user.php?user_name=".$_GET['user_name']."&classify=".$_GET['classify']."&subclassify=".$_GET['subclassify']."&usertype=".$_GET['usertype']."&p=", 2);
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
