<?php
header("Content-type:text/html;charset=utf-8"); 
require('./mysql_db.class.php');
require("page_class.php");   
require("file_upload.php");   
require("common.php");   
$db=new db();
    //每页显示的条数   
	  $page_size=10;   
	//每次显示的页数   
	  $sub_pages=10;   
	//得到当前是第几页   
	  $pageCurrent=$_GET["p"];   
	  //if(!$pageCurrent) $pageCurrent=1;   
if($_GET['c']=="del")
{
    $res = $db->query("select title from `resource` where id=".$_GET['id']);
    if($res) {
        $file = $res->fetch_assoc();
        delete_file($file["title"], "upload_res/");
    }
    $db->query("delete from `resource` where id=".$_GET['id']);
}
?>
<link href="images/skin.css" rel="stylesheet" show="text/css" />
<script src="js/jquery.js"></script>
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
        <td height="31"><div class="titlebt">资源管理</div></td>
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
       <form method="post" action="?c=so">
         标题：<input type="text" name="title" value="<?php echo $_POST['title']?>"/>
         <select name="res_type">
            <option value="">资源类别</option>
              <?php
                $rs=$db->query("select * from `resource_type`");
                while($num=$rs->fetch_array()) {
                    echo '<option value="'.$num["type_name"].'">'.$num["type_name"].'</option>';
                }
            ?>
         </select>
         <select name="res_dep">
            <option value="">归属部门</option>
              <?php
                $rs=$db->query("select * from `dep_type`");
                while($num=$rs->fetch_array()) {
                    echo '<option value="'.$num["type_name"].'">'.$num["type_name"].'</option>';
                }
            ?>
         </select>
            <input type="submit" value="搜索"/>
            <input type="button" value="添加" onClick="location.href='resource_ins.php'"/>
        </form>
         <table width="100%" border="1">
          <tr>
           <th width="10%">ID</th>
           <th width="20%">资源名称</th>
           <th width="20%">资源描述</th>
           <th width="10%">资源隶属</th>
           <th width="10%">资源类别</th>
           <th width="10%">最低访问权限</th>
           <th width="10%">最近修改人</th>
           <th width="10%">最近修改时间</th>
           <th width="10%">文件大小</th>
           <th width="20%">操作</th>
          </tr>
          <?php
		        $pag=($_GET['p']==1?0:$_GET['p'])*10;
                $where[]="1=1";
                if($_POST['title']!=""){
                    $where[]=" title like '%".$_POST['title']."%'";
                }
                if($_POST['res_type'] != ""){
                    $where[]=" type like '%".$_POST['res_type']."%'";
                }
                if($_POST['res_dep'] != ""){
                    $where[]=" subordinate like '%".$_POST['res_dep']."%'";
                }
                $rs=$db->query("select * from `resource` where ".implode(' and ', $where)." order by id desc limit ".$pag.",".$page_size);
		        $coun=$db->query("select count(*) from `resource` where ".implode(' and ',$where)." order by id desc")->fetch_Array();
                if($coun[0] == 0) {
                    $db->query("alter table resource auto_increment=1"); 
                }
		        $i = 0;
		        while($row=$rs->fetch_array()) {
			        $i++;
	     ?>
            <tr align="center">
            <td><?php echo $i;?></td>
            <td><?php echo $row['title'];?>&nbsp;</td>
            <td><?php echo $row['content'];?>&nbsp;</td>
            <td><?php echo $row['subordinate'];?>&nbsp;</td>
            <td><?php echo $row['type'];?>&nbsp;</td>
            <td><?php echo $row['authority'];?>&nbsp;</td>
            <td><?php echo $row['author'];?>&nbsp;</td>
            <td><?php echo $row['up_time'];?>&nbsp;</td>
            <?php
                $siz = round($row['res_size'] / 1024);
                if($siz > 0) {
                    echo '<td style="font-weight:bold; color:rgb(41,70,94);">'.$siz.' kb</td>';
                } else {
                    echo '<td style="font-weight:bold; color:rgb(41,70,94);">'.$row["res_size"].' bytes</td>';
                }
            ?>
            <td>
                <input type="button" value="修改" onClick="location.href='resource_ins.php?c=upd&id=<?php echo $row['id']?>'"/>
                <input type="button" value="删除" onClick="if(confirm('确定删除？'))location.href='resource.php?c=del&id=<?php echo $row['id']?>'"/></td></tr>
             <?php
			}
		  ?>
              <tr><td colspan="5">
                <?php
                    $nums=$coun[0]; 
                    $subPages=new SubPages($page_size,$nums,$pageCurrent,$sub_pages,"resource.php?p=",2);   
                ?>
            </td></Tr>
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
