<?php
    $table = $_GET["table"];
    switch($table) {
    case "manuscript":
        $father = $_GET["father"];
        $classify = "news";// 默认是新闻稿
        if (strstr($father, "news")) {
            $classify = "news";
        } else if (strstr($father, "invest")) {
            $classify = "invest"; 
        } else if (strstr($father, "fund")) {
            $classify = "fund";
        }
        $sub = $_GET["sub"];
        $sql = "INSERT INTO @table (`sub_manuscript`, `father_manuscript`, `classify`) VALUES ($sub, $father, $classify)";
        // 添加子稿分类
        break;
    case "x":
        break;
    default:
        break;
    }
?>
