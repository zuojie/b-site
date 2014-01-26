<?php
require("head.php");
$tbl = "focus_tbl";
?>
<link href="images/skin.css" rel="stylesheet" show="text/css" />
<script src="js/jquery.js"></script>
</style>
<body style="font-size:9px">
<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="17" valign="top" background="images/mail_leftbg.gif"><img src="images/left-top-right.gif" width="17" height="29" /></td>
    <td valign="top" background="images/content-bg.gif"><table width="100%" height="31" border="0" cellpadding="0" cellspacing="0" class="left_topbg" id="table2">
      <tr>
        <td height="31"><div class="titlebt">公告管理</div></td>
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
        <form method="get" action="?c=so">
         文章标题：<input type="text" name="title" value="<?php if(isset($_GET['title'])) {echo $_GET['title'];} else {echo '';}?>"/>
            <input type="submit" value="搜索" id='searchID'/>
            <input type="button" value="添加" onClick="location.href='focus_news_ins.php?c=add'"/>
        </form>
         <table width="100%" border="1">
          <tr>
           <th width="10%">标题</th>
	   <th width="20%">最后修改时间</th>
           <th width="20%">操作</th>
          </tr>
	<?php
	   $where[]="1=1";
            if(isset($_GET['title']) && $_GET['title'] != "") {
                $where[]=" title like '%".$_GET['title']."%'";
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
            <td><a href="preview.php"><?php echo $row['title'];?></a>&nbsp;</td>
            <td><?php echo $row['up_time'];?>&nbsp;</td>
            <td>
            <input type="button" value="更新" onClick="location.href='focus_news_ins.php?c=upd&title=<?php echo $row['title']?>'"/>
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
	    if(!isset($_GET['title'])) {
		$_GET['title'] = '';
	    }
	    $subPages=new SubPages($page_size, $nums, $pageCurrent, $sub_pages, "focus_news.php?title=".$_GET['title']."&p=", 2);
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
