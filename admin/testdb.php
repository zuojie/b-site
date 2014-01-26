<?php
    require("mysql_db.class.php");
    $db = new db();
    $mysql = new mysqli("10.1.152.119", "arvinpeng", "123", "d1904");
    if (mysqli_connect_error()) {
        echo "error";
    }
    $sql = "select * from user";
    $query_res = $mysql->query($sql);
    echo "done";

?>
