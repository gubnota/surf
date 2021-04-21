<?php
/*
var t = $('#clbh_today').html()||"today",
    h = $('#clbh_night_hour').val()||"11",
    p = $('#clbh_phone').val()||"undefined",
    m = ($('#clbh_night_minute').val()||"0").length==2? $('#clbh_night_minute').val()||"00" : "0"+($('#clbh_night_minute').val()||"0"),
    w = $('#clbh_send').html()||"Waiting for call!",
    g = $('#clbh_tomorrow_text').html()||" (GMT+8)",
    i = options.id;
*/
$in = ["t"=>$_GET['t'],
"hour"=>$_GET['h'],
"minute"=>$_GET['m'],
"phone"=>$_GET['p'],
"w"=>$_GET['w'],
"element_id"=>$_GET['i'],
"url_path"=>$_GET['l'],
"domain"=>$_GET['d'],
"today"=>$_GET['t'],
"message"=>$_GET['w'],
"g"=>$_GET['g']];
$out = ['msg':'Received','status':'200'];
echo json_decode($out);
// {t:t,h:h,p:p,m:m,w:w,g:g,i:i,l:window.location.pathname||"неизвестно",d:window.location.hostname,r:r,lang:options.lang}

?>