<?php
require('./mysql_db.class.php');
$db=new db();
session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>管理页面</title>

<script src="js/prototype.lite.js" type="text/javascript"></script>
<script src="js/moo.fx.js" type="text/javascript"></script>
<script src="js/moo.fx.pack.js" type="text/javascript"></script>
<style>
body {
	font:12px Arial, Helvetica, sans-serif;
	color: #000;
	background-color: #EEF2FB;
	margin: 0px;
}
#container {
	width: 182px;
}
H1 {
	font-size: 12px;
	margin: 0px;
	width: 182px;
	cursor: pointer;
	height: 30px;
	line-height: 20px;	
}
H1 a {
	display: block;
	width: 182px;
	color: #000;
	height: 30px;
	text-decoration: none;
	moz-outline-style: none;
	background-repeat: no-repeat;
	line-height: 30px;
	text-align: center;
	margin: 0px;
	padding: 0px;
}
.content{
	width: 182px;
	height: 26px;
	
}
.MM ul {
	list-style-type: none;
	margin: 0px;
	padding: 0px;
	display: block;
}
.MM li {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	line-height: 26px;
	color: #333333;
	list-style-type: none;
	display: block;
	text-decoration: none;
	height: 26px;
	width: 182px;
	padding-left: 0px;
}
.MM {
	width: 182px;
	margin: 0px;
	padding: 0px;
	left: 0px;
	top: 0px;
	right: 0px;
	bottom: 0px;
	clip: rect(0px,0px,0px,0px);
}
.MM a:link {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	line-height: 26px;
	color: #333333;
	background-image: url(images/menu_bg1.gif);
	background-repeat: no-repeat;
	height: 26px;
	width: 182px;
	display: block;
	text-align: center;
	margin: 0px;
	padding: 0px;
	overflow: hidden;
	text-decoration: none;
}
.MM a:visited {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	line-height: 26px;
	color: #333333;
	background-image: url(images/menu_bg1.gif);
	background-repeat: no-repeat;
	display: block;
	text-align: center;
	margin: 0px;
	padding: 0px;
	height: 26px;
	width: 182px;
	text-decoration: none;
}
.MM a:active {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	line-height: 26px;
	color: #333333;
	background-image: url(images/menu_bg1.gif);
	background-repeat: no-repeat;
	height: 26px;
	width: 182px;
	display: block;
	text-align: center;
	margin: 0px;
	padding: 0px;
	overflow: hidden;
	text-decoration: none;
}
.MM a:hover {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	line-height: 26px;
	font-weight: bold;
	color: #006600;
	background-image: url(images/menu_bg2.gif);
	background-repeat: no-repeat;
	text-align: center;
	display: block;
	margin: 0px;
	padding: 0px;
	height: 26px;
	width: 182px;
	text-decoration: none;
}
</style>
</head>

<body>
<table width="100%" height="280" border="0" cellpadding="0" cellspacing="0" bgcolor="#EEF2FB">
  <tr>
    <td width="182" valign="top">
    <div id="container">
    <?php
	$user = $_SESSION['admin_usr'];
	$sql_role = "select * from `admin_tbl` where name = '".$user."'";
	$rs = $db->query($sql_role);
	if($rs == '') {
		exit('请联系管理员申请权限');
	}
	$tmp = $rs->fetch_assoc();
	$role = $tmp['role'];
	$business = $tmp['business'];
	$sql = "SELECT * FROM `manager_nav` WHERE `type_` = 1";
	if($role == 'manager') {
		$sql .= " and (`title` = '正常订单'";
		$sql .= " or `title` = '异常订单'";
		$sql .= " or `title` = '个人信息')";
	} else if($role == 'sales') {
		$sql .= " and `title` = '个人信息'";
	}
        $rs=$db->query($sql);
	if($rs) {
		while($row=$rs->fetch_array()) {
			$sql = "SELECT * FROM `manager_nav` WHERE `type_` = 2 and classify='".$row['title']."'";
			/*
			if($role == 'manager') {
				$sql .= " and title = '".$business."'";
			}
			 */
			$re=$db->query($sql);
	?>
      <h1 class="type">
        <hr style="FILTER: alpha(opacity=50,finishopacity=50,style=2)" width="100%" color=rgb(28,53,72) SIZE=2>
        <a href="javascript:void(0)"><?php echo $row['title']?></a>
      </h1>
      <div class="content">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
        </table>
        <ul class="MM">
           <?php
	            while($rows=$re->fetch_array()) {
		   ?>
          <li><a href="<?php echo $rows['href']?>" target="main"><?php echo $rows['title']?>
        </a></li>
            <?php
		        }
	        ?>
        </ul>
      </div>
     <?php
		 }
        }
	 ?>
      </div>
        <script type="text/javascript">
		var contents = document.getElementsByClassName('content');
		var toggles = document.getElementsByClassName('type');
		var myAccordion = new fx.Accordion(
			toggles, contents, {opacity: true, duration: 400}
		);
		myAccordion.showThisHideOpen(contents[0]);
	</script>
        </td>
  </tr>
</table>
</body>
</html>
