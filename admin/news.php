<?php
header("Content-type:text/html;charset=utf-8"); 
require('./mysql_db.class.php');
require("page_class.php");   
$db=new db();
$_GET['p']= ($_GET['p']>0?$_GET['p']:1);
//每页显示的条数   
$page_size=20;   
//每次显示的页数   
$sub_pages=10;   
//得到当前是第几页   
$pageCurrent=$_GET["p"];   
//if(!$pageCurrent) $pageCurrent=1;
//当前条数   
$pag=($_GET['p']-1)*$page_size;
if($_GET['c']=="del") {
    $db->query("delete from `news` where id=".$_GET['id']);
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
        <td height="31"><div class="titlebt">新闻管理</div></td>
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
         标题：<input type="text" name="title" value="<?php echo $_GET['title']?>"/>
             <select name="classify"  id="classifyID" onchange="checkSub(this.value)">
                <option value="" selected="selected">所有栏目</option>
               <?php
                   $rs=$db->query("select `type_name` from `manuscript` where `father_manuscript`=`type_name`");
                   $num = $rs == '' ? 0 : $rs->num_rows;
                   for ($i = 0; $i < $num; $i ++, $top++) {
                       $tmp = $rs->fetch_assoc();
                       $manu = $tmp["type_name"];
                       echo "<option value='".$manu."'>$manu</option>";
                   }
                ?>
              </select>
              <select name="subclassify" id="subclassifyID">
                <option value="">所有子栏目</option>
              </select>
            <input type="submit" value="搜索" id='searchID'/>
            <input type="button" value="添加" onClick="location.href='news_ins.php'"/>
        </form>
         <table width="100%" border="1">
          <tr>
           <th width="10%">ID</th>
           <th width="40%">标题</th>
           <th width="20%">类别</th>
           <th width="10%">作者</th>
           <th width="20%">最近修改时间</th>
           <th width="20%">操作</th>
          </tr>
          <?php
		    $where[]="1=1";
            if($_GET['title'] != "") {
                $where[]=" title like '%".$_GET['title']."%'";
            }
            if($_GET['classify'] != "") {
                $where[]=" classify like '%".$_GET['classify']."%'";
            }
            if($_GET['subclassify'] != "") {
                $where[]=" subclassify like '%".$_GET['subclassify']."%'";
            }
            $rs=$db->query("select * from `news` where ".implode(' and ',$where)." order by id desc limit ".$pag.",".$page_size);
		    $coun=$db->query("select count(*) from `news` where ".implode(' and ',$where)." order by id desc")->fetch_Array();
            if($coun[0] == 0) {
                $db->query("alter table news auto_increment=1"); 
            }
		    $j = 0;
            while($row=$rs->fetch_array()) {
                $j++;
        ?>
            <tr align="center">
            <td><?php echo $j;?>&nbsp;</td>
            <td><?php echo $row['title'];?>&nbsp;</td>
            <td><?php echo $row['classify']."/".$row['subclassify'];?>&nbsp;</td>
            <td><?php echo $row['author'];?>&nbsp;</td>
            <td><?php echo $row['up_time'];?>&nbsp;</td>
            <td>
                <input type="button" value="修改" onClick="location.href='news_ins.php?c=upd&id=<?php echo $row['id']?>'"/>
                <input type="button" value="删除" onClick="if(confirm('确定删除？'))location.href='news.php?c=del&id=<?php echo $row['id']?>'"/>
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
          $subPages=new SubPages($page_size, $nums, $pageCurrent, $sub_pages,"news.php?contact_id=".$_GET['contact_id']."&title=".$_GET['title']."&p=",2);   
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
<script>
          function checkSub(val) {
              var old_subSel = document.getElementById("subclassifyID");
              var sel = document.getElementById("classifyID");
              var search = document.getElementById("searchID");
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
              //subSel.innerHTML = xhr.responseText;
              //dad.insertAfter(subSel, (dad.hasChildNodes()) ? sel : null);
              //dad.insertBefore(subSel, (dad.hasChildNodes()) ? sel.nextSibling : null);
              dad.insertBefore(subSel, sel.nextSibling);
          }
</script>
