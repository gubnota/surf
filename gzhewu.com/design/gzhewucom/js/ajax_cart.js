// update captcha image on click
+ (function() {
    var t = setInterval(function() {
        if (!window.jQuery) return;

// Аяксовая корзина
$('form.variants').live('submit', function(e) {
	e.preventDefault();
	button = $(this).find('input[type="submit"]');
	if($(this).find('input[name=variant]:checked').size()>0)
		variant = $(this).find('input[name=variant]:checked').val();
	if($(this).find('select[name=variant]').size()>0)
		variant = $(this).find('select').val();
	$.ajax({
		url: "ajax/cart.php",
		data: {variant: variant},
		dataType: 'json',
		success: function(data){
			$('#cart_informer').html(data);
			if(button.attr('data-result-text'))
				button.val(button.attr('data-result-text'));
		}
	});
	var o1 = $(this).offset();
	var o2 = $('#cart_informer').offset();
	var dx = o1.left - o2.left;
	var dy = o1.top - o2.top;
	var distance = Math.sqrt(dx * dx + dy * dy);
	$(this).closest('.product').find('.image img').effect("transfer", { to: $("#cart_informer"), className: "transfer_class" }, distance);	
	$('.transfer_class').html($(this).closest('.product').find('.image').html());
	$('.transfer_class').find('img').css('height', '100%');
	return false;
});

/*
 * Change language by name = id
 */
var change_lang = function(lang,reload){
var l = (lang || window.navigator.language || 'en');
	if (reload){
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET","/ajax/lang.php?lang="+lang+"&t=" + Math.random(), false);//synchronous
	xmlhttp.send();
	window.location.pathname = window.location.pathname.replace(/^\/(ru|zh|en)/,lang);
	// window.location.reload(true);
	setTimeout(function() {document.getElementById('changelangform').submit();},1000);
	}
}
window.onload=function(){
		var el = document.getElementById('comment_captcha')||'';// input[name=captcha_code]
		if (typeof el != 'string') el.setAttribute('name','shiffre_code');
		$(".captcha>img").on('click touchstart', function (e){
			var s = e.target.src;
			s = s.substr(0,s.indexOf('?'));
			if (s.length>0) {s =s+"?"+Math.random();e.target.src = s;}
		});
var mail = document.getElementsByClassName('mail') || [];var dd = 'aw-hk.com';//document.domain
for(var i = 0; i<mail.length; i++){mail[i].innerHTML = '<a href="mailto:admin@'+dd+'">admin@'+dd+'</a>';}
}

$(document).ready(function(){

+(function(w){
var timer = setInterval(function(){
	if (w.SDMenu){
		var myMenu = new SDMenu("side_cat_menu"); // ID of the menu element
		myMenu.oneSmOnly = 1;
		myMenu.init();
		clearInterval(timer);
	}
},0);
})(window);


// scroll to top
//////////////////////
// Плагин scroll-to-top
//////////////////////
    $.fn.scrollToTop = function() {
	$(this).hide().removeAttr("href");
	if ($(window).scrollTop() != "0") {
	    $(this).fadeIn("slow")
	}
	var scrollDiv = $(this);
	$(window).scroll(function() {
	    if ($(window).scrollTop() < 400) {
		$(scrollDiv).fadeOut("slow")
	    } else {
		$(scrollDiv).fadeIn("slow")
	    }
	});
	$(this).click(function() {
	    $("html, body").animate({
		scrollTop: 0
	    }, "slow")
	})
    };
///////////////////
// Scroll to top Инициализация только однократно
///////////////////
$("#scroll-to-top").scrollToTop();

change_lang();
document.getElementById('selectField').onchange = function(e) {
  var target = e && e.target || window.event.srcElement;
  change_lang(target.value,true);
};
});
        clearInterval(t);
    }, 0);
})();

function SDMenu(id){if(!document.getElementById||!document.getElementsByTagName)
return false;this.menu=document.getElementById(id);if(!this.menu)return;this.submenus=this.menu.getElementsByTagName("div")||[];this.subsubmenus=this.menu.getElementsByTagName("p")||[];this.remember=true;this.speed=5;this.markCurrent=true;this.oneSmOnly=false;this.supportsTouch=('ontouchstart'in document.documentElement)}
SDMenu.prototype.init=function(){var mainInstance=this;if(!mainInstance.menu)return;var a=mainInstance.menu.getElementsByTagName('a')||{};for(var i=0;i<a.length;i++){a[i].onclick=function(e){mainInstance.changeActiveLink(e,a);}
if(this.supportsTouch)a[i].ontouchstart=function(e){mainInstance.changeActiveLink(e,a);}}
for(var i=0;i<this.submenus.length;i++){this.submenus[i].getElementsByTagName("span")[0].onclick=function(e){mainInstance.toggleMenu(this.parentNode,e);};if(this.supportsTouch)this.submenus[i].getElementsByTagName("span")[0].ontouchstart=function(){mainInstance.toggleMenu(this.parentNode,e);}};for(var i=0;i<this.subsubmenus.length;i++){if(this.subsubmenus[i].getElementsByTagName("span")[0]){this.subsubmenus[i].getElementsByTagName("span")[0].onclick=function(e){mainInstance.toggleMenu(this.parentNode,e);};if(this.supportsTouch)this.submenus[i].getElementsByTagName("span")[0].ontouchstart=function(){mainInstance.toggleMenu(this.parentNode,e);}};};if(this.markCurrent){var links=this.menu.getElementsByTagName("a");for(var i=0;i<links.length;i++)
if(links[i].href==document.location.href){links[i].className="current";break;}}
if(this.remember&&window.localStorage){var i=window.localStorage.getItem('sdmenu');if(!i)return;var v=i.split(",");if(v.length===3&&encodeURIComponent(this.menu.id)===v[0]){var states=v[1].split("");var ptates=v[2].split("");for(var i=0;i<states.length;i++)
this.submenus[i].className=(states[i]==0?"collapsed":"");if(this.subsubmenus){for(var i=0;i<ptates.length;i++)
this.subsubmenus[i].className=(ptates[i]==0?"collapsed":"");}}}};SDMenu.prototype.changeActiveLink=function(e,a){if(typeof a=='undefined')return;for(var j=0;j<a.length;j++){if(e.target&&e.target!=a[j]){a[j].removeAttribute('class');}
else{a[j].setAttribute('class','current');}}};SDMenu.prototype.toggleMenu=function(submenu,e){if(submenu.className=="collapsed")
this.expandMenu(submenu,e);else
this.collapseMenu(submenu,e);};SDMenu.prototype.expandMenu=function(submenu,e){var fullHeight=submenu.getElementsByTagName("span")[0].offsetHeight;var links=submenu.getElementsByTagName("a");for(var i=0;i<links.length;i++)
fullHeight+=links[i].offsetHeight;var moveBy=Math.round(this.speed*links.length);var mainInstance=this;var intId=setInterval(function(){var curHeight=submenu.offsetHeight;var newHeight=curHeight+moveBy;if(newHeight<fullHeight)
submenu.style.height=newHeight+"px";else{clearInterval(intId);submenu.style.height="";submenu.className="";mainInstance.memorize();}},30);this.collapseOthers(submenu,e);};SDMenu.prototype.collapseMenu=function(submenu,e){if(e.target.nodeName=="A")return;var minHeight=submenu.getElementsByTagName("span")[0].offsetHeight;var moveBy=Math.round(this.speed*submenu.getElementsByTagName("a").length);var mainInstance=this;var intId=setInterval(function(){var curHeight=submenu.offsetHeight;var newHeight=curHeight-moveBy;if(newHeight>minHeight)
submenu.style.height=newHeight+"px";else{clearInterval(intId);submenu.style.height="";submenu.className="collapsed";mainInstance.memorize();}},30);};SDMenu.prototype.collapseOthers=function(submenu,e){if(this.oneSmOnly){if(submenu.nodeName=="P"){var submenus=this.subsubmenus;}
else{var submenus=this.submenus;}
for(var i=0;i<submenus.length;i++)
if(submenus[i]!=submenu&&submenus[i].className!="collapsed")
this.collapseMenu(submenus[i],e);}};SDMenu.prototype.expandAll=function(){var oldOneSmOnly=this.oneSmOnly;this.oneSmOnly=false;for(var i=0;i<this.submenus.length;i++)
if(this.submenus[i].className=="collapsed")
this.expandMenu(this.submenus[i],e);this.oneSmOnly=oldOneSmOnly;};SDMenu.prototype.collapseAll=function(){for(var i=0;i<this.submenus.length;i++)
if(this.submenus[i].className!="collapsed")
this.collapseMenu(this.submenus[i],e);};SDMenu.prototype.memorize=function(){if(this.remember&&window.localStorage){var states=[],ptates=[];for(var i=0;i<this.submenus.length;i++)
states.push(this.submenus[i].className=="collapsed"?0:1);for(var i=0;i<this.subsubmenus.length;i++)
ptates.push(this.subsubmenus[i].className=="collapsed"?0:1);window.localStorage.setItem('sdmenu',[encodeURIComponent(this.menu.id),states.join(""),ptates.join("")].join(","));}};