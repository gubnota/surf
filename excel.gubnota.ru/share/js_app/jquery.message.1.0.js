/*
 * jQuery message plug-in 1.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-message/
 *
 * Copyright (c) 2009 Jörn Zaefferer
 *
 * $Id: jquery.message.js 6407 2009-06-19 09:07:26Z joern.zaefferer $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($) {
	var helper,
		visible,
		timeout1,
		timeout2;
	
	$.fn.message = function(message,params) {
		message = $.trim(message || this.text());
		if (!message) {
			return;
		}
		clearTimeout(timeout1);
		clearTimeout(timeout2);
		
		initHelper(params);
		helper.find("span").html(message);
helper.show().animate({ opacity: $.message.defaults.opacity}, $.message.defaults.fadeInDuration);
		visible = true;
		active = false;
		timeout1 = setTimeout(function() {
			visible = false;
		}, $.message.defaults.minDuration + $.message.defaults.displayDurationPerCharacter * Math.sqrt(message.length));
		timeout2 = setTimeout(fadeOutHelper,$.message.defaults.totalTimeout);
	};
	
	function initHelper(params) {
		if (!helper) {
		$.message.defaults.cl = params.cl;
			helper = $($.message.defaults.template).appendTo(document.body);
			$(window).bind("mousemove click keypress", fadeOutHelper);
			$('div#growl-message').bind("mousemove click keypress", function(){$(this).hide();} );/* чтобы прятать при наведении */
		}
		$('div#growl-message').removeClass();
		if (typeof params.cl == 'string') {$('div#growl-message').addClass(params.cl);}
	}
	
	function fadeOutHelper() {
		if (helper.is(":visible") && !helper.is(":animated") && !visible) {
			helper.animate({ opacity: 0 }, $.message.defaults.fadeOutDuration, function() { $(this).hide() })
		}
	}
	
	$.message = {};
	$.message.defaults = {
		opacity: 1,
		fadeOutDuration: 500,
		fadeInDuration: 200,
		displayDurationPerCharacter: 125,
		minDuration: 2500,
		totalTimeout: 6000,
		cl:'',
		template: '<div id="growl-message"><div><span></span></div></div>'
	}
})(jQuery);
