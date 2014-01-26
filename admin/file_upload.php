<?php  
// permission denied?, check this:
//http://stackoverflow.com/questions/8103860/move-uploaded-file-gives-failed-to-open-stream-permission-denied-error-after
function upload_file($file_name, $destination_folder){
    $err = $_FILES[$file_name]["error"];
    if ($err == 1 or $err == 2) {
        echo "<script>alert('文件大小超出限制');history.back()</script>";  
        exit();
    } else if($err == 3) {
        echo "<script>alert('文件上传不完整，请重试');history.back()</script>";  
        exit();
    } else if($err == 4) {
        echo "<script>alert('没有选择文件');history.back()</script>";  
        exit();
    }
    $kb = 1024;
    $max_file_size = 5000 * $kb;     //上传文件大小限制, 单位BYTE  
    $destination_folder = $destination_folder; //上传文件路径   
    // ref: http://php.net/manual/en/function.is-uploaded-file.php
    if (!is_uploaded_file($_FILES[$file_name][tmp_name])) {  
        echo "<script>alert('文件通过非法方式上传, 请重试');history.back()</script>";  
        exit();  
    } 
    $file = $_FILES[$file_name];  
    $filename=$file["tmp_name"];  
    $pinfo=pathinfo($file["name"]);  
    $ftype=$pinfo['extension'];  
    if($max_file_size < $file["size"]) {  
        echo "<script>alert('文件大小超出限制');history.back()</script>";  
        exit();  
    } 
    if(!is_allow_type($file["type"], $ftype))  
    {  
        echo "文件类型不符!".$file["type"];  
        echo "<script>alert('文件类型非法');history.back()</script>";  
        exit();  
    } 
    if(!file_exists($destination_folder))  
    {  
        mkdir($destination_folder);  
    } 
  
    //$destination = $destination_folder.time().".".$ftype;  
    $destination = $destination_folder.$file["name"];  
    if (file_exists($destination) && $overwrite != true) {  
        echo "<script>alert('同名文件已存在');history.back()</script>";  
        exit();  
    } 
    if(!move_uploaded_file($filename, $destination)) {  
        echo "<script>alert('移动文件出错');history.back()</script>";  
        exit();  
    } 
    chmod($destination, 0666);
	return $destination;
}  

function is_allow_type($type, $ext) {
    switch($type) {
    case "application/pdf": 
    case "image/pjpeg":
    case "image/jpeg":
    case "image/bmp":
    case "image/png":
    case "image/x-png":
    case "text/plain":
        return true;
    case "application/octet-stream":
        //$suf = explode('.', $name);
        //$suffix = $suf[sizeof($suf) - 1];
        switch($ext) {
        case "pptx": 
        case "doc":
        case "docx":
        case "xls":
        case "xlsx":
        case "rar":
        case "zip":
            return true;
        default:
            return false;
        }
    default:
        return false;
    }
}

function delete_file($file_name, $destination_folder) {
    $file = $destination_folder.$file_name;
    if (file_exists($file)) {
        echo unlink($file);
    } else {
        echo "文件不存在: ";
        echo $file;
    }
}
?> 
