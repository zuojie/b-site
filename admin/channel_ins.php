<?php
header("Content-type:text/html;charset=utf-8"); 
require_once('./mysql_db.class.php');
require_once("page_class.php"); 
$db=new db();
$tbl = "channel_tbl";
if(isset($_GET["area"])) {
	$area = $_GET["area"];
} else {
	$area = $_POST["area"];
}
if($_GET['c']=="ins") { // 提交修改/增加
    if($_POST['hidden_city'] != '') { // update
        $sql = "UPDATE @table SET `channel_city`='@channel_city', `channel_university`='@channel_university', `channel_manager`='@channel_manager' WHERE `channel_area`='@channel_area' and `channel_city`='@hidden_city' and `channel_university`='@hidden_university'"; 
        $sql = str_replace("@hidden_city", $_POST["hidden_city"], $sql);
        $sql = str_replace("@hidden_university", $_POST["hidden_university"], $sql);
    } else { //add
        $sql = "INSERT INTO @table (`channel_area`, `channel_city`, `channel_university`, `channel_manager`) VALUES ('@channel_area', '@channel_city', '@channel_university', '@channel_manager')"; 
    }
    $sql = str_replace("@table", $tbl, $sql);
    $sql = str_replace("@channel_area", $area == "" ? 'null' : $area, $sql);
    $sql = str_replace("@channel_city", $_POST["city"] == "" ? 'null' : $_POST["city"], $sql);
    $sql = str_replace("@channel_university", $_POST["university"] == "" ? 'null' : $_POST["university"], $sql);
    $sql = str_replace("@channel_manager", $_POST["manager"] == "" ? 'null' : $_POST["manager"], $sql);
    $db->query($sql);  
    echo "<script>alert('操作成功');location.href='channel.php?area=".$area."'</script>";
} else if($_GET['c'] == "upd") { // 修改
    //$qsql = "select * from ".$tbl." where channel_area = '".$area."' and channel_city = '".$_GET["city"]."' and channel_university = '".$_GET["university"];
    //$row=$db->query($qsql)->fetch_array();
    $channel_area = $area;
    $channel_city = $_GET['city'];
    $channel_university = $_GET['university'];
    $channel_manager = $_GET['manager'];
} else if($_GET['c'] == 'add') { // 增加
    $channel_area = '';
    $channel_city = '';
    $channel_university = '';
    $channel_manager= '';
}
?>
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
                <div class="titlebt"><?php if($_GET['c']=="upd") {echo "修改渠道";}else{echo "添加渠道";}?></div></td>
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
                        <input type="hidden" value="<?php echo $area ?>" name="area"/>
                        <input type="hidden" value="<?php echo $channel_city ?>" name="hidden_city"/>
                        <input type="hidden" value="<?php echo $channel_university ?>" name="hidden_university"/>
                        <tr><td width="10%">城市:</td><td>
				<input id="cityID" type="text" size="50" value="<?php echo $channel_city ?>" name="city"/>*
			</td></tr> 
                        <tr><td colspan="1" valign="top">&nbsp;</td></tr> 
                        <tr><td width="10%">学校:</td><td>
				<input id="universityID" type="text" size="50" value="<?php echo $channel_university ?>" name="university"/>
			</td></tr> 
                        <tr><td width="10%">渠道经理:</td><td>
				<input id="managerID" type="text" size="50" value="<?php echo $channel_manager ?>" name="manager"/>
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
        var val = document.getElementById("cityID").value;
        if(!val) {
            alert("城市名不能为空")
            e.preventDefault();
        } 
    }
</script>

