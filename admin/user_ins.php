<?php
header("Content-type:text/html;charset=utf-8"); 
require_once('./mysql_db.class.php');
require_once('common.php');
session_start();
$db=new db();
if($_GET['c']=="ins") {
    if($_POST['user_level'] == '管理员') {
        $rs = $db->query("SELECT count(*) FROM user WHERE user_level = '管理员'")->fetch_array();
        if($rs[0] > 0) {
            if($_POST['hidden_id']) {
                $sql = "SELECT id FROM user WHERE user_level = '管理员'";
                $rs2 = $db->query($sql)->fetch_array();
                if($rs2['id'] != $_POST['hidden_id']) {
                    echo "<script>alert('管理员已经存在，请先执行删除操作');history.back()</script>";
                    exit;
                }
            } else {
                echo "<script>alert('管理员已经存在，请先执行删除操作');history.back()</script>";
                exit();
            }
        }
    } else if($_POST['user_level'] == '发言人') {
        $rs = $db->query("SELECT `id` FROM user WHERE `dep` = '".$_POST['dep']."' and `user_level` = '发言人'")->fetch_array();
        if($rs['id']) {
            if($rs['id'] != $_POST['hidden_id']) {
                echo "<script>alert('本部门发言人已经存在，请先执行删除操作');history.back()</script>";
                exit;
            }
        }
        $sql = "UPDATE @table SET `spokesman`='@spokesman' WHERE `type_name`='@type_name'"; 
        $sql = str_replace("@table", "dep_type", $sql);
        $sql = str_replace("@spokesman", $_POST["name"], $sql);
        $sql = str_replace("@type_name", $_POST["dep"], $sql);
        $db->query($sql);
    } else if($_POST['user_level'] == '超级管理员') {
        if($_SESSION['admin_usr'] != 'sadmin') {
            echo "<script>alert('禁止添加超级管理员');history.back()</script>";
            exit();
        }
        $rs = $db->query("SELECT count(*) FROM user WHERE user_level = '超级管理员'")->fetch_array();
        if($rs[0] > 0) {
            if($_POST['hidden_id']) {
                $sql = "SELECT id FROM user WHERE user_level = '超级管理员'";
                $rs2 = $db->query($sql)->fetch_array();
                if($rs2['id'] != $_POST['hidden_id']) {
                    echo "<script>alert('禁止添加超级管理员');history.back()</script>";
                    exit;
                } 
            } else {
                echo "<script>alert('禁止添加超级管理员');history.back()</script>";
                exit();
            }
        }
    }
      
    if($_POST['hidden_id'] != '') { // update
        $sql = "UPDATE @table SET `name`='@name', `real_name`='@real_name', `dep`='@dep', `addr`='@addr', `user_level`='@user_level', `user_type`='@user_type', `mail`='@mail', `tel`='@tel', `position`='@position', `join_time`='@join_time', `state`='@state' WHERE `id`='@id'"; 
        $sql = str_replace("@id", $_POST["hidden_id"], $sql);
    } else { // add
        $sql = "INSERT INTO @table (`name`, `real_name`, `dep`, `addr`, `password`, `user_level`, `user_type`, `position`, `join_time`, `mail`, `tel`, `state`) VALUES ('@name', '@real_name', '@dep', '@addr', '@password', '@user_level', '@user_type', '@position', '@join_time', '@mail', '@tel', '@state')";
    }
    if($_POST["user_type"] == "公司内部") {
        $sql = str_replace("@position", $_POST["position"], $sql);
        $sql = str_replace("@join_time", $_POST["join_time"], $sql);
    } else {
        $sql = str_replace("@position", '', $sql);
        $sql = str_replace("@join_time", '', $sql);
    }
    $sql = str_replace("@table", "user", $sql);
    $sql = str_replace("@name", $_POST["name"], $sql);
    $sql = str_replace("@real_name", $_POST["real_name"], $sql);
    $sql = str_replace("@dep", $_POST["dep"], $sql);
    $sql = str_replace("@addr", $_POST["addr"], $sql);
    $sql = str_replace("@password", md5($_POST["password"]), $sql);
    $sql = str_replace("@user_level", $_POST["user_level"], $sql);
    $sql = str_replace("@user_type", $_POST["user_type"], $sql);
    $sql = str_replace("@mail", $_POST["mail"], $sql);
    $sql = str_replace("@tel", $_POST["tel"], $sql);
    $sql = str_replace("@state", $_POST["state"], $sql);
    $db->query($sql);
    echo "<script>alert('操作成功');location.href='user.php'</script>";
} else if($_GET['c'] == "upd") {
    $row=$db->query("select * from `user` where id =".$_GET['id'])->fetch_array();
}
?>
<link href="images/skin.css" rel="stylesheet" show="text/css" />
<script src="js/jquery.js"></script>
<meta http-equiv="Content-show" content="text/html; charset=utf-8" />
<style show="text/css">
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
      <td height="31"><div class="titlebt"><?php if($_GET['c']=="upd") {echo "更新用户";}else{echo "添加用户";}?></div></td>
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
         <table width="100%" >
          <form action="?c=ins" method="post"  enctype="multipart/form-data">
          <input type="hidden" value="<?php echo $row['id']?>" name="hidden_id"/>
            <tr><td width="10%">用户名:</td><td>
                <input id="nameID" type="text" value="<?php echo $row['name']?>" name="name"/>*</td></tr> 
            <?php
            if($_GET["c"] != "upd") {
                echo '<tr><td width="10%">密  码:</td><td>';
                echo '<input id="passwordID" type="password" name="password"/>*</td></tr>'; 
            }
            ?>
            <tr><td width="10%">真实姓名:</td><td> 
                <input type="text"  value="<?php echo $row['real_name']?>" name="real_name"/></td></tr> 
            <tr><td width="10%">部 门:</td><td> 
                <select name="dep" id="depID">
                <?php
                      $rs=$db->query("select * from `dep_type`");
                      $num = $rs == '' ? 0 : $rs->num_rows;
                      $init_val = "其他部门";
                      if($row["dep"]) {
                        $init_val = $row["dep"];
                      }
                      for($i = 0; $i < $num; $i ++) {
                          $tmp = $rs->fetch_assoc();
                          $manu = $tmp["type_name"];
                          if($manu == $init_val) {
                              echo "<option value=$manu selected='selected'>$manu</option>";
                          } else {
                              echo "<option value=$manu>$manu</option>";
                          }
                      }
                ?>
            </select>客户选填</td></tr> 
            <tr><td width="10%">所在地:</td><td> 
                <input type="text"  value="<?php echo $row['addr']?>" name="addr"/></td></tr> 
            <tr><td width="10%">邮  箱:</td><td> 
                <input type="text"  value="<?php echo $row['mail']?>" name="mail" id="mailID"/>*</td></tr> 
            <tr><td width="10%">电 话：</td><td>
                <input type="text"  value="<?php echo $row['tel']?>" name="tel"/></td></tr> 
             <tr><td width="10%">用户等级：</td><td>
              <select name="user_type" id="user_typeID" onchange="checkSub(this.value)">
              <?php
                  $rs=$db->query("select * from `user_type` where `type_name`=`subordinate`");
                  $num = $rs == '' ? 0 : $rs->num_rows;
                  $init_class = "公司内部";
                  if ($_GET["c"] == "upd" and $row["user_type"] != '') {
                      $init_class = $row["user_type"]; 
                  }
                  print_r($init_class);
                  for ($i = 0; $i < $num; $i ++) {
                      $tmp = $rs->fetch_assoc();
                      $manu = $tmp["type_name"];
                      if($manu == $init_class) {
                          echo "<option value='".$manu."' selected='selected'>$manu</option>";
                      } else {
                          echo "<option value='".$manu."'>$manu</option>";
                      }
                  }
              ?>
              </select>
              <select name="user_level" id="user_levelID">
                <?php
                  $rs=$db->query("select `type_name` from `user_type` where `subordinate`='".$init_class."'");
                  $num = $rs == '' ? 0 : $rs->num_rows;
                  for ($i = 0; $i < $num; $i ++, $top++) {
                      $tmp = $rs->fetch_assoc();
                      $manu = $tmp["type_name"];
                      if($manu == $init_class && $manu != '超级管理员') {
                          continue;
                      }
                      if($manu == $row["user_level"]) {
                          echo "<option value='".$manu."' selected='selected'>$manu</option>";
                      } else {
                          echo "<option value='".$manu."'>$manu</option>";
                      }
                  }
                ?>
             </select>*</td></tr> 
            <tr><td width="10%">用户状态：</td><td>
                <input type="hidden"  value="<?php echo $row['state']?>" name="state1" id="state1ID"/>
                <select name="state" id="stateID">
                <?php 
                    if($row["state"] == "冻结") {
                        echo '<option value="冻结" selected="selected">冻结</option>';
                        echo '<option value="激活">激活</option>';
                    } else if($row["state"] == "激活") {
                        echo '<option value="冻结">冻结</option>';
                        echo '<option value="激活" selected="selected">激活</option>';
                    } else {
                        echo '<option value="冻结">冻结</option>';
                        echo '<option value="激活">激活</option>';
                    }
                ?>
                </select>*
                </td></tr> 
             <tr><td width="10%">入职时间：</td><td>
                <input type="text"
            <?php
                  $val = $row['join_time'];
                  if(!$val) {
                      $val = "格式:2010-03-06";
                  }
                  echo " value=$val onfocus=\"if(value=='$val'){value=''}\" onblur=\"if(value==''){value='$val'}\"";
                  echo " name='join_time'/>客户选填</td></tr>";
            ?>
             <tr><td width="10%">职位：</td><td>
                <select name="position" id="positionID">
            <?php
                  $init_val = "员工";
                  if($row["position"]) {
                    $init_val = $row["position"];
                  }
                  for($i = 0; $i < count($position); $i ++) {
                      if($position[$i] == $init_val) {
                          echo "<option value=$position[$i] selected='selected'>$position[$i]</option>";
                      } else {
                          echo "<option value=$position[$i]>$position[$i]</option>";
                      }
                  }
            ?>
                </select>客户选填</td></tr> 
             <tr><td colspan="2"><input id="addMemberID" type="submit" value="提交"/></td></tr>
            </form>
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
</body>
<script>
    function checkSub(val) {
       var old_subSel = document.getElementById("user_levelID");
       var pre_sel = document.getElementById("user_typeID");
       var dad = old_subSel.parentNode;
       dad.removeChild(old_subSel);
       var subSel = null;
       try {
           subSel = document.createElement('<select name="user_level">'); // for IE
       } catch(e) {
           subSel = document.createElement("select");
           subSel.setAttribute('name', 'user_level');
           subSel.name = 'user_level'; // for IE
       }
       subSel.setAttribute('id', 'user_levelID');
       subSel.id = 'user_levelID'; // for IE
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
       arg = "?subordinate=" + father;
       arg = encodeURI(arg);
       xhr.open("get", "get_sub_user_type.php" + arg, false);
       xhr.send(null);
       var res = xhr.responseText;
       var arr = res.split('_fuck_ie');
       for(var i in arr) {
           var ele = arr[i];
           opt = document.createElement("option");
           opt.text = ele;
           opt.value = ele;
           subSel.add(opt);
       }
       dad.insertBefore(subSel, pre_sel.nextSibling);
    }
    var addMemberBtn = document.getElementById("addMemberID");
    addMemberBtn.onclick=function(e) {
        var name = document.getElementById("nameID").value;
        var passwd = document.getElementById("passwordID").value;
        var email = document.getElementById("mailID").value;
        if(!name) {
            alert("用户名不能为空")
            e.preventDefault();
        } else if(!passwd) {
            alert("密码不能为空")
            e.preventDefault();
        } else if(!email || email == '') {
            alert("邮箱不能为空")
            e.preventDefault();
        }
    }
    $(document).ready(function(){
        $("#admin").val($("#admin1").val()).attr("selected",true);
	})
</script>
