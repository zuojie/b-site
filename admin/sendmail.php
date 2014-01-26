<?php
header("Content-type: text/html; charset=utf-8"); 
/** 
 * @desc  发送邮件	
 * @param string $to 目标地址
 * @param string $title 标题
 * @param string $body 邮件内容
 * @return bool
 2816235438
*/
  require('mysql_db.class.php'); 
  $db=new db();

     	set_time_limit(0);
     include './phpmailer.php';
     $mail = new PHPMailer();

        $mail->IsSMTP(); 
        $mail->Host = 'smtp.163.com';
        $mail->SMTPAuth = true; 
        $mail->Username = '305721480@163.com';
 	$mail->Password = '1593578246';
 
 	$mail->From = '305721480@163.com';
        $mail->FromName = '六宝邮件订阅';
        
        $mail->IsHTML(true); 
        
        $mail->AltBody = "www.qiuyi.cn";
  


  $rs=$db->query("select content from send_mail where 1");
   while($row=$rs->fetch_array())
    {
		$title=$_POST['title']."aaa";
		$body=$_POST['content']."bbb";
		$to=$row['content'];
	$mail->Subject = $title;
    $mail->Body = $body;
	$mail->AddAddress($to);
	 if ($mail->Send())
        {
           echo 'success';
        }
        else
        {	
           echo $mail->ErrorInfo;
        }
		}
		//echo "<script>alert('发送成功，我们会尽快审核与您联系');location.href='rczp.php'"
?>