<?php
$QR_LIB_DIR = dirname(__FILE__).DIRECTORY_SEPARATOR."libs".DIRECTORY_SEPARATOR."phpqrcode".DIRECTORY_SEPARATOR;
require_once($QR_LIB_DIR."qrlib.php"); 
function GetQRCode($data) {
	//set it to writable location, a place for temp generated PNG files
	$errorCorrectionLevel="L";
	$matrixPointSize="8";
	//html PNG location prefix
	$QR_WEB_DIR = 'qrcode/';
	//ofcourse we need rights to create temp dir
	if (!file_exists($QR_WEB_DIR)) {
		mkdir($QR_WEB_DIR);
	}
	$filename = $QR_WEB_DIR.md5($data).'.png';
	if (!file_exists($filename)) {
		QRcode::png($data, $filename, $errorCorrectionLevel, $matrixPointSize, 2);
	}
	return $filename;
}
//echo GetQRCode("北京");
?>
