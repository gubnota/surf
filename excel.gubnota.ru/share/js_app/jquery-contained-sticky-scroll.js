/*!
 * Contained Sticky Scroll v1.1
 * http://blog.echoenduring.com/2010/11/15/freebie-contained-sticky-scroll-jquery-plugin/
 *
 * Copyright 2010, Matt Ward
*/
  $.fn.containedStickyScroll = function( options ) {
  
	var defaults = {  
		unstick : true,
		easing: 'linear',
		duration: 0,
		queue: false,
		closeChar: ' ',
		closeTop: 0,
		closeRight: 0,
		fromtop: 0 /* если сверху есть ещё что-нибудь пристикенное */
	}  
                  
	var options =  $.extend(defaults, options);
    var $getObject = $(this).selector;
    var sticked = true;
    
	if(options.unstick == true){  
		this.css('position','relative');
		this.append('<a class="scrollfix">' + options.closeChar + '</a>');
		jQuery($getObject + ' .scrollfix').css('position','absolute');
		jQuery($getObject + ' .scrollfix').css('top',options.closeTop + 'px');
		jQuery($getObject + ' .scrollfix').css('right',options.closeTop + 'px');
		jQuery($getObject + ' .scrollfix').css('cursor','pointer');
		jQuery($getObject + ' .scrollfix').click(function() { return;
			jQuery($getObject).animate({ top: "0px" },
				{ queue: options.queue, easing: options.easing, duration: options.duration });
			jQuery(window).unbind();
			jQuery('.scrollfix').html('<');
			sticked = false;
//			jQuery('.scrollFixIt').remove();
		});
	} 
  	jQuery(window).scroll(function() {
        if(jQuery(window).scrollTop() > (jQuery($getObject).parent().offset().top-options.fromtop) &&
           (jQuery($getObject).parent().height() + jQuery($getObject).parent().position().top - 30) > (jQuery(window).scrollTop() + jQuery($getObject).height())){
        	jQuery($getObject).animate({ top: (jQuery(window).scrollTop() - jQuery($getObject).parent().offset().top+options.fromtop) + "px" }, 
            { queue: options.queue, easing: options.easing, duration: options.duration });
        }
        else if(jQuery(window).scrollTop() < (jQuery($getObject).parent().offset().top)){
        	jQuery($getObject).animate({ top: "0px" },
            { queue: options.queue, easing: options.easing, duration: options.duration });
        }
	});

  };
