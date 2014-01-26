<?php
header("Content-type:text/html;charset=utf-8"); 
require_once('./mysql_db.class.php');
require_once("page_class.php"); 
//require("file_upload.php");   
$db=new db();
if($_GET['c']=="ins")
{
    if($_POST['hidden_id'] != '') { // update
        $sql = "update @table set `title`='@title', `content`='@content', `image`='@image', `classify`='@classify', `subclassify` = '@subclassify', `author`='@author' WHERE `id`='@id'"; 
        $sql = str_replace("@table", "news", $sql);
        $sql = str_replace("@title", $_POST["title"], $sql);
        $sql = str_replace("@content", $_POST["content"], $sql);
        $sql = str_replace("@classify", $_POST["classify"], $sql);
        $sql = str_replace("@subclassify", $_POST["subclassify"], $sql);
        $sql = str_replace("@author", "超级管理员", $sql);
        $sql = str_replace("@id", $_POST['hidden_id'], $sql);
    } else { //add
        $sql = "INSERT INTO @table (`title`, `content`, `image`, `classify`, `subclassify`, `author`) VALUES ('@title', '@content', '@image', '@classify', '@subclassify', '@author')";
        $sql = str_replace("@table", "news", $sql);
        $sql = str_replace("@title", $_POST["title"], $sql);
        $sql = str_replace("@content", $_POST["content"], $sql);
        $sql = str_replace("@classify", $_POST["classify"], $sql);
        $sql = str_replace("@subclassify", $_POST["subclassify"], $sql);
        $sql = str_replace("@author", "超级管理员", $sql);
    }
    $db->query($sql);  
    echo "<script>alert('操作成功');location.href='news.php'</script>";
}
if($_GET['c']=="upd")
{
    $row=$db->query("select * from `news` where id =".$_GET['id'])->fetch_array();
}

?>
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
                <div class="titlebt"><?php if($_GET['c']=="upd") {echo "修改新闻";}else{echo "添加新闻";}?></div></td>
        </tr>
        </table>
    </td>
    <td width="16" valign="top" background="images/mail_rightbg.gif"><img src="images/nav-right-bg.gif" width="16" height="29"/></td>
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
                        <input type="hidden" value="<?php echo $row['id']?>" name="hidden_id"/>
                        <tr><td width="10%">标题:</td>
                            <td>
                                    <input id="titleID" type="text" size="50" value="<?php echo $row['title']?>" name="title"/>*</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr>
                            <td width="10%">类别:</td>
                            <td id = "classifyTdID" style="width:100px">
                                <select name="classify"  id="classifyID" onchange="checkSub(this.value)">
                                <?php
                                    $rs=$db->query("select `type_name` from `manuscript` where `father_manuscript`=`type_name`");
                                    $num = $rs == '' ? 0 : $rs->num_rows;
                                    $init_class = "资讯中心";
                                    if ($_GET["c"] == "upd" and $row["classify"] != '') {
                                        $init_class = $row["classify"]; 
                                    }
                                    for ($i = 0; $i < $num; $i ++, $top++) {
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
                                <select name="subclassify" id="subclassifyID">
                                <?php
                                    $rs=$db->query("select `type_name` from `manuscript` where `father_manuscript`='".$init_class."'");
                                    $num = $rs == '' ? 0 : $rs->num_rows;
                                    echo $num;
                                    echo $init_class;
                                    for ($i = 0; $i < $num; $i ++, $top++) {
                                        $tmp = $rs->fetch_assoc();
                                        $manu = $tmp["type_name"];
                                        if($manu == $init_class) {
                                            continue;
                                        }
                                        if($manu == $row["subclassify"]) {
                                            echo "<option value='".$manu."' selected='selected'>$manu</option>";
                                        } else {
                                            echo "<option value='".$manu."'>$manu</option>";
                                        }
                                    }
                                ?>
                                </select>
                            </td>
                    </tr>
                    <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                    <tr><td width="10%">正文:</td>
                        <td>
                            <textarea id="elm1" name="content"><?=$row['content']?>
                            </textarea>
                        </td></tr> 
                    <tr><td colspan="2"><input id="addNewsID" type="submit" value="提交"/></td></tr>
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
    var addMemberBtn = document.getElementById("addNewsID");
    addMemberBtn.onclick=function(e) {
        var title = document.getElementById("titleID").value;
        //var content = $('#elm1');
        if(!title) {
            alert("标题不能为空")
            e.preventDefault();
        } 
    }
</script>
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
              arg = "?father_manuscript=" + father;
              arg = encodeURI(arg);
              xhr.open("get", "get_sub_manuscript.php" + arg, false);
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
              dad.insertBefore(subSel, sel.nextSibling);
          }
</script>
<script type="text/javascript">
    $('#elm1').xheditor({tools:'full',skin:'default',showBlocktag:true,internalScript:false,internalStyle:false,width:800,height:400,fullscreen:false,sourceMode:false,forcePtag:true, upImgUrl:"../upload_img.php",upImgExt:"jpg,jpeg,gif,png"});
</script>
