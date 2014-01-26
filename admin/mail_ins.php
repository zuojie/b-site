<?php
header("Content-type:text/html;charset=utf-8"); 


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
        <td height="31"><div class="titlebt">欢迎界面</div></td>
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
          <form action="sendmail.php?c=ins" method="post"  enctype="multipart/form-data">
          <input type="hidden" value="<?php echo $row['id']?>" name="hidden_id"/>
            <tr><td width="10%">标题:</td><td><input type="text" size="50"  name="title"/></td></tr> 
            <!--<tr><td width="10%">发布于:</td><td><input type="text"   name="time"/>小时后</td></tr> -->
         
            <tr><td>内容:</td><td>
          <?php
		 include("fckeditor/fckeditor.php") ;
		 $oFCKeditor = new FCKeditor('content') ; // 创建FCKeditor实例   
		
		$oFCKeditor->BasePath = './fckeditor/'; // 设置FCKeditor目录地址   
		
		$oFCKeditor->Width='80%'; //设置显示宽度   
		
		$oFCKeditor->Value=$row['content']; //默认值   
		
		$oFCKeditor->Height='400px'; //设置显示高度的高度   
		
		$oFCKeditor->Create() ; // 创建编辑器    
        ?>
            </td></tr> 
            <tr><td colspan="2"><input type="submit" value="提交"/></td></tr>
            </form>
         </table>
        </td>
        
      </tr>
      <tr>
        <td width="2%">&nbsp;</td>
        <td width="51%" class="left_txt"><img src="images/icon-mail2.gif" width="16" height="11"> 客户服务邮箱：*****************<br>
          <img src="images/icon-phone.gif" width="17" height="14"> 官方网站:*****************</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
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
