<?php
require_once('head.php');
$tbl = "focus_tbl";
if($_GET['c']=="ins") { // 提交修改/增加
    if($_POST['hidden_title'] != '') { // update
        $sql = "UPDATE @tbl SET `title`='@title', `modify_people`='@modify_people', `article`='@article' WHERE `title`='@hidden_title'"; 
        $sql = str_replace("@hidden_title", $_POST["hidden_title"], $sql);
    } else { //add
        $sql = "INSERT INTO @tbl (`title`, `modify_people`, `article`) VALUES ('@title', '@modify_people', '@article')";
        $sql = str_replace("@title", $_POST["title"], $sql);}
    	$sql = str_replace("@tbl", $tbl, $sql);
    	$sql = str_replace("@title", $_POST["title"], $sql);
    	$sql = str_replace("@modify_people", 'admin', $sql);
    	$sql = str_replace("@article", $_POST["article"], $sql);
    	$db->query($sql);  
    	echo "<script>alert('操作成功');location.href='focus_news.php'</script>";
} else if($_GET['c']=="upd") {
	$row=$db->query("select * from `focus_tbl` where title ='".$_GET['title']."'")->fetch_array();
	$title = $row["title"];
	$article = $row["article"];
} else if($_GET['c'] == 'add') {
	$title = "";
	$article = "";
}
?>
<link href="images/skin.css" rel="stylesheet" show="text/css" />
<link href="css/main.css" rel="stylesheet" show="text/css" />
<script src="js/jquery.js"></script>
<script src="xheditor/xheditor-1.1.14-zh-cn.min.js"></script>
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
                <div class="titlebt"><?php if($_GET['c']=="upd") {echo "修改公告";}else{echo "添加公告";}?></div></td>
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
                        <input type="hidden" value="<?php echo $title?>" name="hidden_title"/>
                        <tr><td width="10%">标题:</td>
                            <td>
                                 <input id="titleID" type="text" size="50" value="<?php echo $title?>" name="title"/>*</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
			<tr><td colspan="1" valign="top">&nbsp;</td></tr> 
		 	<tr><td width="10%">正文:</td>
			<td><textarea id="elm1" name="article"><?=$article?></textarea>
			</td></tr> 
			<tr><td colspan="2"><input id="addID" type="submit" value="提交"/></td></tr>
		   </table>
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
</form>
</body>
<script>
    var addMemberBtn = document.getElementById("addID");
    addMemberBtn.onclick=function(e) {
        var title = document.getElementById("titleID").value;
        //var content = $('#elm1');
        if(!title) {
            alert("标题不能为空")
            e.preventDefault();
        } 
    }
</script>
<script type="text/javascript">
    $('#elm1').xheditor({tools:'full',skin:'default',showBlocktag:true,internalScript:false,internalStyle:false,width:800,height:400,fullscreen:false,sourceMode:false,forcePtag:true, upImgUrl:"../upload_img.php",upImgExt:"jpg,jpeg,gif,png"});
</script>
