<?php //stat.php
//var xmlHttp = new XMLHttpRequest();
//xmlHttp.open("GET", '//aw-hk.com/m/stat.php?'+encodeURIComponent(navigator.userAgent), true); // true for asynchronous
//xmlHttp.send(null);
$t = time();
$txt = $time.' '.$_SERVER['REMOTE_ADDR']." ".$_SERVER['HTTP_USER_AGENT']." ".$_GET['s'].' '.$_SERVER["HTTP_ACCEPT_LANGUAGE"];
$myfile = file_put_contents(__DIR__.'/stat.txt', $txt.PHP_EOL , FILE_APPEND | LOCK_EX);
?>