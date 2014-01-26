<?php
header("Content-type:text/html;charset=utf-8"); 
require_once('common.php');
require_once('./mysql_db.class.php');
require_once("file_upload.php");   
$db=new db();
if($_GET['c'] == "ins")
{
    $filename = $_FILES['attach']['name'];
    if($filename == '' && $_POST['hidden_id'] == '') { // add
        echo "<script>alert('请选择上传的文件');history.back()</script>"; 
        exit;
    } else if(mb_strlen($_POST["content"], 'utf8') > 20) {
        echo "<script>alert('描述超过20个字符，请修改重试');history.back()</script>"; 
        exit;
    }
    if($_POST['hidden_id'] != '') {// update 
        if($filename != '') {
            echo "<script>alert('更新操作不支持重新上传文件，请先执行资源删除操作，本次文件将不被上传');history.back()</script>"; 
        }
        $sql = "update @table set `type`='@type', `content`='@content', `subordinate`='@subordinate', `authority`='@authority', `author`='@author' WHERE `id`='@id'"; 
        $sql = str_replace("@table", "resource", $sql);
        $sql = str_replace("@type", $_POST["classify"], $sql);
        $sql = str_replace("@content", $_POST["content"], $sql);
        $sql = str_replace("@subordinate", $_POST["subordinate"], $sql);
        $sql = str_replace("@authority", $_POST["class"], $sql);
        $sql = str_replace("@author", "超级管理员", $sql);
        $sql = str_replace("@id", $_POST['hidden_id'], $sql);
    } else { // add 
        upload_file("attach", "upload_res/");
        $sql = "INSERT INTO @table (`type`, `title`, `content`, `subordinate`, `authority`, `author`, `res_size`) VALUES ('@type', '@title', '@content', '@subordinate', '@authority', '@author', '@res_size')";
        $sql = str_replace("@table", "resource", $sql);
        $sql = str_replace("@type", $_POST["classify"], $sql);
        $sql = str_replace("@title", $filename, $sql);
        $sql = str_replace("@content", $_POST["content"], $sql);
        $sql = str_replace("@subordinate", $_POST["subordinate"], $sql);
        $sql = str_replace("@authority", $_POST["class"], $sql);
        $sql = str_replace("@author", "超级管理员", $sql);
        $sql = str_replace("@res_size", $_FILES["attach"]["size"], $sql);
    }
    $db->query($sql);
    echo "<script>alert('操作成功');location.href='resource.php'</script>";
}
if($_GET['c']=="upd")
{
	$row=$db->query("select * from `resource` where id =".$_GET['id'])->fetch_array();
}
?>
<link href="images/skin.css" rel="stylesheet" show="text/css" />
<script src="js/jquery.js"></script>
<link href="./css/main.css" rel="stylesheet">
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
      <td height="31"><div class="titlebt"><?php if($_GET['c']=="upd") {echo "更新资源";} else {echo "新增资源";}?></div></td>
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
        
         <table width="100%">
          <form action="?c=ins" method="post"  enctype="multipart/form-data">
          <input type="hidden" value="<?php echo $row['id']?>" name="hidden_id"/>
            <tr>
                <td width="10%">资源(5M以内):</td>
                <td>
                    <input type="hidden" name="max_file_size" value="5120000"> 
                    <input type="file" size="50" name="attach"/></td></tr> 
            <tr>
                <td width="10%">隶属:</td> <td>
                    <select name="subordinate" id="subordinateID">
                    <?php
                          $rs=$db->query("select * from `dep_type`");
                          while($num=$rs->fetch_array()) {
                                if($num["type_name"] == $row["subordinate"]) {
                                    echo '<option value="'.$num["type_name"].'" selected="selected">'.$num["type_name"].'</option>';
                                } else {
                                    echo '<option value="'.$num["type_name"].'">'.$num["type_name"].'</option>';
                                }
                          }
                    ?>
                    </select>*</td></tr> 
            <tr><td>类别:</td><td>
              <select name="classify" id="classifyID">
              <?php
                    $rs=$db->query("select * from `resource_type`");
			        while($num=$rs->fetch_array()) {
                        if($num["type_name"] == $row["type"]) {
					        echo '<option value="'.$num["type_name"].'" selected="selected">'.$num["type_name"].'</option>';
                        } else {
					        echo '<option value="'.$num["type_name"].'">'.$num["type_name"].'</option>';
                        }
				    }
			  ?>
              </select>*</td></tr>
            <tr><td>可见人:</td><td>
            <select name="class">
            <?php
                    $init = "员工";
                    //echo "<script>alert('".$row['authority']."')</script>";
                    if($row["authority"]) {
                        $init = $row["authority"];
                    }
                    $rs=$db->query("select * from `user_type");
                    $num = $rs == '' ? 0 : $rs->num_rows;
                    for ($i = 0; $i < $num; $i ++, $top++) {
                        $tmp = $rs->fetch_assoc();
                        $manu = $tmp["type_name"];
                        if($manu == $init) {
                            if($manu == "超级管理员") {
                                echo "<option value='".$manu."' selected='selected'>".$manu."</option>";
                            } else {
                                echo "<option value='".$manu."' selected='selected'>".$manu."及以上</option>";
                            }
                        } else if($manu == "超级管理员"){
                            echo "<option value='".$manu."'>".$manu."</option>";
                        } else {
                            echo "<option value='".$manu."'>".$manu."及以上</option>";
                        }
                    }
            ?>
            </select>
            </td></tr>
            <tr><td>描述(20个字以内):</td><td>
                <textarea placeholder="限制字数在20个以内" name="content" rows="3" cols="20" style="height:91px; width:380px;"><?=$row['content']?></textarea>
            </td></tr> 
            <tr><td colspan="2">
                <input type="submit" value="提交"/></td></tr>
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
               function updateDepartment() {
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
                   var table = "department";
                   var column = "name";
                   var new_lab = document.getElementById("new_label").value;
                   arg = "table=" + table + "&field=" + column + "&newlab=" + new_lab;
                   // update web
                   var select = document.getElementById("subordinateID");
                   lastIdx = select.selectedIndex;
                   var lastVal = select.options[lastIdx].value;
                   var lastTxt = select.options[lastIdx].text;
                   select.options[lastIdx].value = new_lab;
                   select.options[lastIdx].text = new_lab;
                   var newOpt = document.createElement("option");
                   newOpt.text = lastTxt;
                   newOpt.value = lastVal;
                   select.add(newOpt);

                   // update database 
                   xhr.open("get", "updateDB.php?" + arg, false);
                   xhr.send(null);
               }

               function tp(cid){
                   if(document.getElementById(cid).checked==true)
                        $(".tp"+cid).attr("checked",true);
	                else {
		                $(".tp"+cid).attr("checked",false);
	                }
                }
</script>
