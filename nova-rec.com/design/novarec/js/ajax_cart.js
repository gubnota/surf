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

// update captcha image on click
+ (function() {
    var t = setInterval(function() {
        if (!window.jQuery) return;
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
}

$(document).ready(function(){
change_lang();
document.getElementById('selectField').onchange = function(e) {
  var target = e && e.target || window.event.srcElement;
  change_lang(target.value,true);
};
});
        clearInterval(t);
    }, 0);
})();