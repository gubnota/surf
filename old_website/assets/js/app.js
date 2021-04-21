
var elem = document.getElementById('footer-right');
var line=elem.innerHTML;

function footer_right(msg,ctrlwidth)
{
  msg = "    "+msg
  newmsg = msg
  while (newmsg.length < ctrlwidth) {newmsg += msg}
  prokrutka();
}
function prokrutka()
{
  NowMsg=elem.innerHTML;
  NowMsg=NowMsg.substring(1,NowMsg.length)+NowMsg.substring(0,1);
  elem.innerHTML = NowMsg;
  bannerid=setTimeout("prokrutka()",200);
}

footer_right(elem.innerHTML,200);
document.oncopy = function(){var b_element = document.getElementsByTagName('body')[0];
var selection_txt = window.getSelection();
var to_string = window.getSelection().toString();
var sel_count = to_string.length;
var pagelink = document.location.href;
var copytext = pagelink;
var newdiv = document.createElement('div');
newdiv.style.position = 'absolute';
newdiv.style.left = '-99999px';
b_element.appendChild(newdiv);
newdiv.innerHTML = copytext;
selection_txt.selectAllChildren(newdiv);
window.setTimeout( function() {
b_element.removeChild(newdiv);
}, 0);};

