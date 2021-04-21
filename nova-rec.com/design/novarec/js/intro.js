/*
 * Change language by name = id
 */
var change_lang = function(lang){
var initial = (!lang) ? 1 : 0;
var l = (lang||window.navigator.language || 'EN').toUpperCase();
var match = document.cookie.match(new RegExp('lang=([^;]+)'));
if (!lang && match && match[1] != undefined) {l = match[1].toUpperCase();}
var el = document.getElementById(l);
if (el != null) {
	var box = document.getElementsByClassName('box');

	for(var i = 0; i< box.length; i++){
		box[i].style.display="none";
	}

	el.style.display="block";
	document.title = el.children[0].innerHTML;
	var sel = document.getElementById('selectField');

	for(var i = 0; i< sel.length; i++){
		if(sel[i].value==l) sel.selectedIndex = i;
	}
	
	}
else if(!initial) {
	window.location.pathname='/'+l.toLowerCase();
}
}

window.onload=function(){
document.getElementById('selectField').onchange = function(e) {
  var target = e && e.target || window.event.srcElement;
  change_lang(target.value);
};
change_lang();
}