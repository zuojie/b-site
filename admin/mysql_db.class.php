<?php
/*
数据库的连接信息
1 create db d1904

2 create a web user
insert into mysql.user(Host,User,Password,ssl_cipher,x509_issuer,x509_subject) values("10.1.152.119","6nfund",password("123"),'','','');

3 grant privileges to web user 
grant all privileges on d1904.* to '6nfund'@'%' identified by '123';

4 connect it from web
*/
//define("USERNAME","arvinpeng");
define("USERNAME","phpuser");
define("PASSWORD","1234");
define("HOST","localhost");
define("DBNAME","yuanpei");

class db{
	private $host = HOST;
	private $user = USERNAME;
	private $password = PASSWORD;
	private $database = '';
	
	private $mysql;
	public  $insert_id = 0;
	public  $affected_rows = 0;
	//private $result;


	public function __construct($database=DBNAME){
		$this->database=$database;	
		$this->mysql = new mysqli($this->host,$this->user,$this->password,$this->database);
		$this->mysql->query('set names utf8');
		
		$this->database=$database;
		
		$this->insert_id=0;
	}
	
	public function __destruct(){ 
		$this->mysql->close();
  	} 
	
	public function query($sql){
	
		if(!$this->mysql->ping())
		{
		//	echo('error');
			$this->mysql->close();
			$this->__construct($this->database);
		}
	
		$this->affected_rows=$this->insert_id=0;
		
		$this->result = $this->mysql->query($sql);
		if($this->mysql->error){
			return $this->mysql->error;
		}
		if($this->mysql->insert_id){
			$this->insert_id=$this->mysql->insert_id;
		}else{
			$this->affected_rows=$this->mysql->affected_rows;
		}
		return $this->result;				 
	}

	public function select_db($db){
	    $this->database=$db;
		$this->mysql->select_db($this->database);
  	} 
	
	public function set_charset($cSet='utf8'){ 
		return false;
  	} 
	
	
	public function fillToAry($obj){
		$tmp=array();
		while($row = $obj->fetch_array()){
			$tmp[]=$row;
		}
		return $tmp;	
	}
}


?>
