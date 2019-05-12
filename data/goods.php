<?php

    $link = @mysql_connect("localhost:3306","root","123456");
    if(!$link){
        echo '{"code":0,"errorMsg":"'.mysql_error().'"}';
    }

    $db = @mysql_select_db("test1902");
    if(!$db){
        echo '{"code":0,"errorMsg":"'.mysql_error().'"}';
    }

    $utf = @mysql_query("set names utf8");
    if(!$utf){
        echo '{"code":0,"errorMsg":"'.mysql_error().'"}';
    }

    $q = @mysql_query('SELECT * FROM goods');
    if($q){
        $str = "";
        while($arr = mysql_fetch_assoc($q)){
            $str = $str.json_encode($arr).",";
        }
        echo "[".substr($str,0,-1)."]";
    }else{
        echo '{"code":0,"errorMsg":"'.mysql_error().'"}';
    }

?>