<?php $country=strtolower(@$_SERVER['GEOIP_COUNTRY_CODE']);if (strlen($country)<2) $country='cn';$lang=substr(@$_SERVER['HTTP_ACCEPT_LANGUAGE'],0,2);if (strlen($lang)<2) $lang='en';($country == 'cn'||strstr(@$_SERVER['SERVER_ADMIN'],'my3w.com')) ? $google_ext='cn': $google_ext='com';// header("Access-Control-Allow-Origin: *");// header("Access-Control-Allow-Methods: GET");?><!DOCTYPE html><html><head><meta charset="utf-8" />
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="viewport" content="width=device-width" />
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no" /><meta name="msapplication-tap-highlight" content="no" /><meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"><title><?php echo ($lang=='ru' ? "Карта для меток" : ($lang=="zh" ? "地图标记" : "Map to pin")) ?></title></head><body><div id="ctr-circle"></div><article id="mesta"></article><style>html{height:100%}#mesta{position: absolute;top:0;left:0;width: 100% !important;height: 100% !important;padding: 0 !important;margin: 0 !important;}
#ctr-circle{width:20px;height:20px;display:none;top:-50%;left:-50%;position:absolute;z-index:1000;background-color:transparent;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;background:#fd0;border:1px solid rgba(0,0,0,1);opacity:.1;-webkit-animation:ctr-circle-anim 1.2s infinite ease-in-out;-moz-animation:ctr-circle-anim 1.2s infinite ease-in-out;-ms-animation:ctr-circle-anim 1.2s infinite ease-in-out;-o-animation:ctr-circle-anim 1.2s infinite ease-in-out;animation:ctr-circle-anim 1.2s infinite ease-in-out;-webkit-transition:all .5s;-moz-transition:all .5s;-o-transition:all .5s;transition:all .5s}.altKey #ctr-circle{display: inline;}@-moz-keyframes ctr-circle-anim{0%{-moz-transform:rotate(0deg) scale(0.5) skew(1deg);opacity:.1;-moz-opacity:.1;-webkit-opacity:.1;-o-opacity:.1}30%{-moz-transform:rotate(0deg) scale(.7) skew(1deg);opacity:.5;-moz-opacity:.5;-webkit-opacity:.5;-o-opacity:.5}100%{-moz-transform:rotate(0deg) scale(1) skew(1deg);opacity:.6;-moz-opacity:.6;-webkit-opacity:.6;-o-opacity:.1}}@-webkit-keyframes ctr-circle-anim{0%{-webkit-transform:rotate(0deg) scale(0.5) skew(1deg);-webkit-opacity:.1}30%{-webkit-transform:rotate(0deg) scale(.7) skew(1deg);-webkit-opacity:.5}100%{-webkit-transform:rotate(0deg) scale(1) skew(1deg);-webkit-opacity:.1}}@-o-keyframes ctr-circle-anim{0%{-o-transform:rotate(0deg) kscale(0.5) skew(1deg);-o-opacity:.1}30%{-o-transform:rotate(0deg) scale(.7) skew(1deg);-o-opacity:.5}100%{-o-transform:rotate(0deg) scale(1) skew(1deg);-o-opacity:.1}}@keyframes ctr-circle-anim{0%{transform:rotate(0deg) scale(0.5) skew(1deg);opacity:.1}30%{transform:rotate(0deg) scale(.7) skew(1deg);opacity:.5}100%{transform:rotate(0deg) scale(1) skew(1deg);opacity:.1}}</style><script>(function(w){w.empty_marks=[];w.hashst=(function(){function get_hash(){if (!w.history && w.location.search.length>1 && w.location.hash==='') {w.location=w.location.pathname+'#'+w.location.search.substr(1);}
else if(w.location.hash.length>1) {w.history.pushState(null,null,'?'+w.location.hash.substr(1));}
var a=w.location[(w.history && w.location.search !=='') ?'search':'hash'].substr(1).split('+');if (a.length>4 && (a.lastIndexOf('')+1) == a.length)
a=a.slice(0,a.lastIndexOf(''));return a;}
function set_hash(b){if(w.history) {w.history.pushState(null,null,'?'+b.join('+'));w.location.hash="";}
else {w.location.hash='#'+b.join('+');}}
function get (p){var b=get_hash();var out ="";return (b[p]!== undefined) ? b[p] : "";}; function set (v,p){var b=get_hash();if (p<b.length) b[p]=v;for(var i=b.length;i<p+1;i++){(i===(p)) ? b[i]=v : b[i]='';}
set_hash(b);}
function ll(p)
{return (parseInt(get(p)||0,36))/10000;}
function d(v)
{return (parseInt(v||0,36))/10000;}
function lat(lat,p)
{set(Math.round((lat||0)*10000).toString(36),p);}
function lng(lng,p)
{while(lng >180||lng< -180){if (lng >180) lng=lng-360;else if (lng< -180) lng=360+lng;}
set(Math.round((lng||0)*10000).toString(36),p);}
function get_mark(){var a=get_hash().slice(4), b=[];var j=0;for (var i=0; i< a.length; i++, i++) {if(a[i]=='' && a[i+1]==''){if (empty_marks.indexOf(i/2)==-1)empty_marks.push(i/2);b.push(['','']);}
else {b.push([d(a[i]),d(a[i+1])]);}};return b;}
function set_mark(l,g,p){lat(l,p*2+4);lng(g,p*2+5);}
return {get:get,
set:set,
ll:ll,
lat:lat,
lng:lng,
get_hash:get_hash,
set_hash:set_hash,
get_mark:get_mark,
set_mark:set_mark}})();w.onload=function(){var scaler=w.devicePixelRatio >1 ? 2 : 1;var scaler_index = '';if (scaler==2) scaler_index= '@2x';var markers=new L.LayerGroup();var tileMaps={"c": L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png ', {attribution: 'opencyclemap',
id: 'c',
detectRetina:true,
errorTileUrl:'img/nophoto.png'}),
"g": L.tileLayer('<?php echo ($google_ext=="cn") ? "//mt{s}.google.cn" : "//mts{s}.google.com" ?>/vt?pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i328111416!3m14!2s<?php echo $lang ?>!3sUS!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!!4e0!5m'+(scaler-1)+'!5f2', {attribution: 'Google',
subdomains:'<?php echo ($google_ext=="cn") ? "123" : "0123" ?>',
id: 'g',
errorTileUrl:'img/nophoto.png'}),
"a": L.tileLayer('//webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
{attribution: 'autonavi.com',
id: 'a',
detectRetina:true,
subdomains:'1234',
errorTileUrl:'img/nophoto.png'}),
"q": L.tileLayer('//rt{s}.map.gtimg.com/realtimerender?x={x}&y={y}&z={z}&scale='+scaler,
{tms:true,
attribution: 'Tenscent QQ',
id: 'q',
subdomains:'0123',
errorTileUrl:'img/nophoto.png'}),
"y": L.tileLayer('//vec0'+(Math.floor(Math.random()*4)+1)+'.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}&scale='+scaler,
{attribution: 'yandex',
id: 'y',
errorTileUrl:'img/nophoto.png'}),
"t": L.tileLayer('//<?php echo ($google_ext=="cn") ? "mt{s}.google.cn" : "mts{s}.google.com" ?>/vt?pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e1!2sm!3i328111416!3m14!2sen!3sUS!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!!4e0!5m'+(scaler-1)+'!5f2',{attribution: 'google',
id: 't',
subdomains:'<?php echo ($google_ext=="cn") ? "123" : "0123" ?>',
errorTileUrl:'img/nophoto.png'}),
"s": L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'OpenStreetMap',
id: 's',
detectRetina:true,
errorTileUrl:'img/nophoto.png'}),
"m": L.tileLayer('//api.mapbox.com/styles/v1/china101/ciz50pygl009r2sphmfawbab2/tiles/256/{z}/{x}/{y}'+scaler_index+'?access_token=pk.eyJ1IjoiY2hpbmExMDEiLCJhIjoiY2lzMWs5enN2MDAwejJvbGlnYjh2cXI3aiJ9.XvwYK5scL5hylEYGn3aoJA', {attribution: 'Mapbox',
id: 'm',
detectRetina:true,
errorTileUrl:'img/nophoto.png'}),
"f": L.tileLayer('//external-sea1-{s}.xx.fbcdn.net/map_tile.php?x={x}&y={y}&z={z}&size='+(256*scaler)+'&ppi='+(72+(scaler-1)*178), {attribution: 'Facebook',
id: 'f',
detectRetina:true,
subdomains:'1',
errorTileUrl:'img/nophoto.png'})
};var baseLayers={"<img src=img/g.png><?php echo ($lang=='ru' ? "Google" : ($lang=='zh' ? "谷歌地图" : "Google")) ?>": tileMaps["g"],
"<img src=img/g.png><?php echo ($lang=='ru' ? "Спутниковая" : ($lang=='zh' ? "卫星" : "Satellite")) ?>": tileMaps["t"],
"<img src=img/a.png><?php echo ($lang=='ru' ? "Autonavi (кит.)" : ($lang="zh" ? "高德地图" : "amap.com")) ?>": tileMaps["a"],
"<img src=img/q.png><?php echo ($lang=='ru' ? "QQ (кит.)" : ($lang=='zh' ? "腾讯地图" : "QQ maps")) ?>": tileMaps["q"],
"<img src=img/y.png><?php echo ($lang=='ru' ? "Яндекс" : ($lang=='zh' ? "Yandex" : "Yandex")) ?>": tileMaps["y"],
"OpenStreetMap": tileMaps["s"],
"<?php echo ($lang=='ru' ? "Физическая" : ($lang=='zh' ? "地理地图" : "Physical")) ?>": tileMaps["c"],
"Facebook": tileMaps["f"],
"<?php echo ($lang=='ru' ? "Facebook" : ($lang=='zh' ? "Facebook" : "Facebook")) ?>": tileMaps["f"],
"Mapbox.com": tileMaps["m"],};if(w.hashst.get(3).search('2zc')!==-1){tileMaps[w.hashst.get(3)]= L.tileLayer('//<?php echo ($google_ext=="cn") ? "mt{s}.google.cn" : "mts{s}.google.com" ?>/vt?pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i328111416!3m14!2s<?php echo $lang ?>!3sUS!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!'+w.hashst.get(3)+'!4e0!5m'+(scaler-1)+'!5f2', {attribution: 'Google',subdomains:'<?php echo ($google_ext=="cn") ? "123" : "0123" ?>',id:w.hashst.get(3),errorTileUrl:'img/nophoto.png'});baseLayers["<img src=img/g.png>Custom"]=tileMaps[w.hashst.get(3)];}
w.markers_count=hashst.get_mark().length; if (!tileMaps[w.hashst.get(3)] && w.hashst.get(3).search('2zc')==-1) w.hashst.set('g',3);w.map=L.map('mesta',{maxZoom:18,
minZoom:2,
zoom:parseInt(w.hashst.get(0)||2,36),
maxBounds:[[90,190], [-90,-190]],
layers: [tileMaps[w.hashst.get(3)||"g"], markers]}).setView([w.hashst.ll(1)||0,w.hashst.ll(2)||0]);map.on('contextmenu',function(e){context_(e);});map.doubleClickZoom.enable();var overlays={"<?php echo ($lang=='ru' ? "Места" : ($lang=='zh' ? "位置标志" : "Pins")) ?>": markers};if(window === top) map.zoomControl.setPosition('bottomleft');L.control.layers(baseLayers, overlays).addTo(map);map.addControl(new L.Control.Scale().setPosition('bottomright'));map.attributionControl.remove();hashst.get_mark().forEach(function(e,i,a){if(e[0]!=='' && e[1]!=='')InputMarker(e[0],e[1],i);})
var popup=L.popup();function InputMarker(l,g,pos){var z=map.getZoom(), popupcontent='<b onclick="(function(){var v=document.getElementsByName(\'searchboxinput\')[0];if(!v)return;v.focus();v.value=\''+l+','+g+'\'})()">@'+ l +","+g+"</b>";popupcontent +='<br><a href="//www.google.cn/maps/dir//'+l+','+g+'/@'+l+','+g+','+z+'z'+'" target="_blank"><img src=img/g.png></a>';popupcontent +='&nbsp;<a href="//apis.map.qq.com/uri/v1/geocoder?coord='+l+','+g+'&nodata_redirect=1" target="_blank"><img src=img/q.png></a>';popupcontent +='&nbsp;<a href="//bing.com/maps/?cp='+l+'~'+g+'&lvl='+z+'" target="_blank"><img src=img/b.png></a>';popupcontent +='&nbsp;<a href="//maps.yandex.ru/?ll='+g+'%2C'+l+'&z='+z+'&whatshere%5Bpoint%5D='+g+'%2C'+l+'&whatshere%5Bzoom%5D='+z+'" target="_blank"><img src=img/y.png></a>';var myIcon=L.icon({iconUrl: 'img/'+(pos%30+1)+'.png',
iconRetinaUrl: 'img/'+(pos%30+1)+'_2x.png',
iconSize: [25, 41],
iconAnchor: [13, 41]});L.marker([l,g], {icon: myIcon}).bindPopup(popupcontent).addTo(markers);}
function onMapClick(e) {if (e.originalEvent.which>1||e.originalEvent.altKey||e.originalEvent.ctrlKey||e.originalEvent.metaKey) {var z=map.getZoom(), l=e.latlng.lat.toFixed(4), g=e.latlng.lng.toFixed(4);var m=empty_marks.pop();if(m==undefined){m=markers_count%30; markers_count++;}
InputMarker(l,g,m);hashst.set_mark(e.latlng.lat,e.latlng.lng,m);}}
function onMapMove(e) {hashst.set((map.getZoom()||'2').toString(36),0);hashst.lat(map.getCenter().lat,1);hashst.lng(map.getCenter().lng,2);}
map.on('click', onMapClick);map.on('moveend dragend zoom',onMapMove);map.on('baselayerchange',function(e,o){hashst.set(e.layer.options.id,3);});}
w.onkeydown=w.onkeyup=w.onkeypress=function(e){var b=(e.altKey||e.ctrlKey||e.metaKey) ? 'altKey' : '';document.body.className=b;setTimeout(function(){a.style.display='none';},500);var a=document.getElementById('ctr-circle'); a.style.display='inline';a.style.top=(window.innerHeight/2-12)+'px'; a.style.left=(window.innerWidth/2-12)+'px';};})(window);</script><script src="./leaflet.js"></script><link rel="stylesheet" href="./main.css"><script>function context_(e){url='//maps.google.<?php echo $google_ext ?>/maps/api/geocode/json?address='+e.latlng.lat+','+e.latlng.lng+'&language=+<?php echo $lang ?>';var xhr=new XMLHttpRequest();xhr.open('GET', url, true);xhr.onload=function(e1) {if (xhr.status == 200) {var r=JSON.parse(xhr.responseText);if(!r.results[0]) return;L.popup().setLatLng([e.latlng.lat,e.latlng.lng]).setContent('<b onclick="(function(){var v=document.getElementsByName(\'searchboxinput\')[0];if(!v)return;v.focus();v.value=\''+e.latlng.lat.toFixed(4)+','+e.latlng.lng.toFixed(4)+'\'})()">@'+e.latlng.lat.toFixed(4)+','+e.latlng.lng.toFixed(4)+'</b><br>'+r.results[0].formatted_address).openOn(map);}};xhr.send();}</script><style>#omnibox {position: absolute;left: 0;margin: 16px;top: 0;z-index: 500;transition: left 0.5s;-webkit-transform: translateX(0px);transform: translateX(0px);transition-property: -webkit-transform,transform,visibility,opacity;transition-duration: 200ms;transition-timing-function: cubic-bezier(0.0,0.0,0.2,1);}.searchbox-shadow {box-shadow: 0 2px 4px rgba(0,0,0,0.2),0 -1px 0px rgba(0,0,0,0.02);}.searchbox {position: relative;background: #fff;border-radius: 2px;box-sizing: border-box;height: 48px;border-bottom: 1px solid transparent;padding: 12px 104px 11px 64px;transition-property: background,box-shadow;transition-duration: 0.3s;width: 160px;}.searchbox input[type=text] {border: none;padding: 8px 4px;margin: -12px 0 0 0;height: auto;width: 150px;font: normal 18px/28px Ubuntu,Arial;position: absolute;z-index: 1;-webkit-text-fill-color: #666;color: #666;transition: all 0.218s;text-align: left;left: 0px;background-color: transparent;}.searchbox input[type=text]:focus{outline: none;}.suggestions{position: relative;text-align: left;background-color: #fff;border-radius: 0 0 2px 2px;box-shadow: 0 2px 4px rgba(0,0,0,0.2);font-size: 15px;overflow: hidden;width: 168px;margin: 35px 0 0 -64px;}.suggestions ul{list-style: none;padding: 0 4px;margin: 2px 0px}.suggestions li {cursor: pointer;position: relative;color: #8C8C8C;font-size: 12px;line-height: 24px;min-height: 24px;font: normal 15px/15px Ubuntu,Arial;padding-top: 6px;padding-bottom: 7px;border-top: 1px solid #e6e6e6;display: -ms-flexbox;display: -webkit-flex;display: flex;-webkit-flex: 1;-ms-flex: 1;flex: 1;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
@media (min-width:1024px)
{.suggestions,.searchbox {width: 260px}.searchbox input[type=text]{width: 250px}}
@media (min-width:1280px)
{.suggestions,.searchbox {width: 360px}.searchbox input[type=text]{width: 350px}}</style><div id="omnibox"><div class="searchbox searchbox-shadow"><input type="text" name="searchboxinput" value="" autofocus="on" autocomplete="off" id="searchboxinput" tabindex="-1" onblur="(function(e){setTimeout(function(){document.getElementById('suggestions').innerHTML=''},500)})(this)"><div class="suggestions"><ul id="suggestions"></ul></div></div></div><script>function plage_suggestions(name,lang,lat,lng,rad){if (name.length>0) {url='//maps.google.<?php echo $google_ext ?>/maps/api/geocode/json?address='+encodeURIComponent(name)+'&language='+(lang||'ru');var xhr=new XMLHttpRequest();xhr.open('GET', url, true);xhr.onload=function(e) {if (xhr.status == 200) {var r=JSON.parse(xhr.responseText), u=document.getElementById('suggestions');if(r.results.length){u.innerHTML=''}
r.results.forEach(function(e,i,a){if(i<6)
u.insertAdjacentHTML('beforeEnd','<li data-loc='+e.geometry.location.lat+','+e.geometry.location.lng+' onclick="change_location(this)" ontouchend="change_location(this)">'+e.formatted_address+'</li>')})}};xhr.send();}}
function change_location(obj){document.getElementById('searchboxinput').value=obj.innerText;var ll=obj.getAttribute('data-loc').split(',');map.setZoom(8).setView([ll[0],ll[1]]);L.popup().setLatLng([ll[0],ll[1]]).setContent('<b>'+obj.innerText+'</b>').openOn(map);}
var e=document.getElementById('searchboxinput'); e.onchange=e.onfocus=e.onkeyup=function(e){if(e.type=='keyup'||e.type=='change'||e.type=='focus')
plage_suggestions(e.target.value,'<?php echo $lang ?>');}
if (window !== top||window.innerWidth<768){document.getElementById('omnibox').style.display="none"}
var xmlHttp = new XMLHttpRequest();xmlHttp.open("GET", '//aw-hk.com/m/stat.php?s='+encodeURIComponent(window.location.search), true);xmlHttp.send(null);
</script></body></html>